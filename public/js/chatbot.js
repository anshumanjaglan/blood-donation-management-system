document.addEventListener('DOMContentLoaded', () => {
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotOverlay = document.getElementById('chatbot-overlay');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatTyping = document.getElementById('chat-typing');

  let chatHistory = [];
  let isWindowOpen = false;

  // Toggle Chat Window
  chatbotToggle.addEventListener('click', () => {
    isWindowOpen = !isWindowOpen;
    if (isWindowOpen) {
      chatbotWindow.classList.add('open');
      if (chatbotOverlay) chatbotOverlay.classList.add('open');
      chatbotInput.focus();
      // Add initial greeting if empty
      if (chatHistory.length === 0) {
        appendMessage('bot', "Hello! I am your AI Health Assistant. 🩺\n\nI can help you with:\n• Symptom analysis & minor illness advice\n• Diet & Nutrition (Weight, Sugar, Cholesterol)\n• Liver (SGPT/SGOT) & Kidney management\n• Mental health & Stress relief\n\nHow can I help you today?");
      }
    } else {
      chatbotWindow.classList.remove('open');
      if (chatbotOverlay) chatbotOverlay.classList.remove('open');
    }
  });

  chatbotClose.addEventListener('click', () => {
    isWindowOpen = false;
    chatbotWindow.classList.remove('open');
    if (chatbotOverlay) chatbotOverlay.classList.remove('open');
  });
  
  if (chatbotOverlay) {
    chatbotOverlay.addEventListener('click', () => {
      isWindowOpen = false;
      chatbotWindow.classList.remove('open');
      chatbotOverlay.classList.remove('open');
    });
  }

  // Handle Send Message
  chatbotSend.addEventListener('click', sendMessage);
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  async function sendMessage() {
    const text = chatbotInput.value.trim();
    if (!text) return;

    // 1. Add user message to UI
    appendMessage('user', text);
    chatbotInput.value = '';
    
    // Hide quick actions
    const quickActions = document.getElementById('chatbot-quick-actions');
    if (quickActions) quickActions.style.display = 'none';
    
    // 2. Show typing indicator
    chatTyping.style.display = 'flex';
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    try {
      // 3. Send API Request
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text,
          history: chatHistory 
        })
      });

      const data = await response.json();
      chatTyping.style.display = 'none';

      if (data.error) {
        appendMessage('bot', "Sorry, I'm having trouble connecting right now. Please try again later.");
      } else {
        // Update history
        chatHistory.push({ role: 'user', text: text });
        chatHistory.push({ role: 'bot', text: data.response });
        
        // Add bot message to UI
        appendMessage('bot', data.response);
      }
    } catch (error) {
      chatTyping.style.display = 'none';
      appendMessage('bot', "Network error. Please check your connection.");
    }
  }

  function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${role}`;
    
    // Simple markdown to HTML parser
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/\n/g, '<br>'); // Newlines
    
    // Basic list formatting
    html = html.replace(/(?:^|<br>)(?:[*\-]|\u2022)\s(.*?)(?=<br>|$)/g, '<br><li>$1</li>');
    if (html.includes('<li>')) {
      html = html.replace(/(?:<br><li>.*?<\/li>)+/g, match => `<ul style="margin: 8px 0; padding-left: 20px;">${match.replace(/<br>/g, '')}</ul>`);
    }

    msgDiv.innerHTML = html;
    
    // Insert before typing indicator
    chatbotMessages.insertBefore(msgDiv, chatTyping);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
});
