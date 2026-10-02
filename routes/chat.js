const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI(apiKey ? { apiKey: apiKey } : {});

const SYSTEM_INSTRUCTION = `You are a helpful and polite health and lifestyle assistant. 
Provide general information about wellness, diet, and minor symptoms. 
Do not act as a doctor, do not diagnose conditions, and do not prescribe medications. 
Always advise the user to consult a real doctor for medical concerns. 
Keep your responses concise and well-formatted.`;

router.post('/', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      const isGreeting = message.toLowerCase().match(/^(hi|hello|hey|start)/i);
      if (isGreeting) {
         return res.json({ response: "Hello! I am your AI Health Assistant. 🩺\n\nI can help you with:\n• Symptom analysis & minor illness advice\n• Diet & Nutrition\n• Weight, Sugar, Cholesterol, SGPT/SGOT, and Kidney management\n• Mental health & Stress relief\n\n*Note: To unlock my full AI capabilities, the administrator needs to set the GEMINI_API_KEY in the server environment.*" });
      } else {
         return res.json({ response: "I'm currently in **Demo Mode** because the `GEMINI_API_KEY` is not set on the server.\n\nHowever, I am designed to analyze your symptoms, suggest lifestyle changes for sugar, liver (SGPT/SGOT), cholesterol, and provide mental health support.\n\n*Please ask the administrator to configure the API key for full AI analysis!*" });
      }
    }

    const contents = [];
    
    // Inject system instruction into the first message to avoid SDK 503 filters
    let isFirstMessage = true;

    if (history && Array.isArray(history)) {
        for (const msg of history) {
            let text = msg.text;
            if (isFirstMessage && msg.role === 'user') {
                text = `[System Instruction: ${SYSTEM_INSTRUCTION}]\n\nUser: ${text}`;
                isFirstMessage = false;
            }
            contents.push({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: text }]
            });
        }
    }
    
    let currentText = message;
    if (isFirstMessage) {
        currentText = `[System Instruction: ${SYSTEM_INSTRUCTION}]\n\nUser: ${message}`;
    }

    contents.push({
        role: 'user',
        parts: [{ text: currentText }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
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
