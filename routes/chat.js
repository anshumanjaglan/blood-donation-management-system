const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI(apiKey ? { apiKey: apiKey } : {});

const SYSTEM_INSTRUCTION = `You are a helpful AI assistant. Answer the user's questions clearly. Format your response in markdown.`;

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

    // We completely ignore the 'history' array because sending previous medical context
    // along with the new question accumulates too many medical keywords and triggers
    // the API's strict safety filter (which manifests as a 503 High Demand error).
    
    const contents = [
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    const modelsToTry = ['gemini-3.5-flash', 'gemini-3.7-flash', 'gemini-3.8-flash', 'gemini-2.5-pro'];
    let response = null;
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`Trying model: ${modelName}...`);
        const result = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            temperature: 0.7,
          }
        });
        response = result;
        console.log(`Success with model: ${modelName}`);
        break; // Exit the loop if successful
      } catch (err) {
        console.error(`Model ${modelName} failed:`, err.message);
        lastError = err;
        // Continue to the next model if it's a 429 (Quota) or 503 (High Demand/Safety Block)
        if (err.status === 429 || err.status === 503 || err.message.includes('429') || err.message.includes('503')) {
           continue;
        } else {
           // For other errors (like 400 Bad Request), stop trying and throw
           break;
        }
      }
    }

    if (!response) {
      throw lastError || new Error('All models exhausted their quota or failed.');
    }

    return res.json({ response: response.text });
  } catch (error) {
    console.error('Chatbot error:', error);
    return res.status(500).json({ error: 'Failed to generate response', details: error.message });
  }
});

module.exports = router;
