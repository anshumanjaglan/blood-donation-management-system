const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

// Check if API key is provided in environment variables
const apiKey = process.env.GEMINI_API_KEY;

// Create the Gemini AI client
// We initialize it even if apiKey is undefined; we will handle the error in the route
const ai = new GoogleGenAI(apiKey ? { apiKey: apiKey } : {});

const SYSTEM_INSTRUCTION = `You are an AI healthcare assistant integrated into the Blood Donation Management System (RaktDaan).
Your role is to provide health information based on user symptoms, predict potential diseases, suggest effective over-the-counter medicine for minor illnesses (always adding a disclaimer to consult a doctor), and provide dietary/lifestyle advice.
You must cover: weight management, sugar management, cholesterol management, SGPT/SGOT (liver) management, kidney health, stress management, depression management, mental health, and overall healthcare.
Be compassionate, concise, and helpful. Format your responses with bullet points and clear headings for readability. Use emojis where appropriate.
If the user asks about blood donation, encourage them to use the RaktDaan system.
Disclaimer: Always remind users that you are an AI and they should consult a medical professional for serious conditions.`;

router.post('/', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!apiKey) {
      // Provide a simulated fallback if no API key is provided
      const isGreeting = message.toLowerCase().match(/hi|hello|hey|help/);
      if (isGreeting) {
         return res.json({ response: "Hello! I am your AI Health Assistant. 🩺\n\nI can help you with:\n• Symptom analysis & minor illness advice\n• Diet & Nutrition\n• Weight, Sugar, Cholesterol, SGPT/SGOT, and Kidney management\n• Mental health & Stress relief\n\n*Note: To unlock my full AI capabilities, the administrator needs to set the GEMINI_API_KEY in the server environment.*" });
      } else {
         return res.json({ response: "I'm currently in **Demo Mode** because the `GEMINI_API_KEY` is not set on the server.\n\nHowever, I am designed to analyze your symptoms, suggest lifestyle changes for sugar, liver (SGPT/SGOT), cholesterol, and provide mental health support.\n\n*Please ask the administrator to configure the API key for full AI analysis!*" });
      }
    }

    // Format history for the Gemini API
    const contents = [];
    if (history && Array.isArray(history)) {
        for (const msg of history) {
            contents.push({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            });
        }
    }
    
    // Add current message
    contents.push({
        role: 'user',
        parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return res.json({ response: response.text });
  } catch (error) {
    console.error('Chatbot error:', error);
    return res.status(500).json({ error: 'Failed to generate response', details: error.message });
  }
});

module.exports = router;
