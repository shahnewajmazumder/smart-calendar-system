// AI Assistant functionality
document.addEventListener("DOMContentLoaded", function() {
    const aiToggle = document.getElementById("aiToggle");
    const aiChatContainer = document.getElementById("aiChatContainer");
    const closeAi = document.querySelector(".close-ai");
    const aiSendBtn = document.getElementById("aiSendBtn");
    const aiChatInput = document.getElementById("aiChatInput");

    if (aiToggle) {
        aiToggle.addEventListener("click", toggleAIChat);
    }

    if (closeAi) {
        closeAi.addEventListener("click", toggleAIChat);
    }

    if (aiSendBtn) {
        aiSendBtn.addEventListener("click", sendAIMessage);
    }

    if (aiChatInput) {
        aiChatInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                sendAIMessage();
            }
        });
    }
});

function toggleAIChat() {
    const aiChatContainer = document.getElementById("aiChatContainer");
    aiChatContainer.classList.toggle("active");
}

function sendAIMessage() {
    const input = document.getElementById("aiChatInput");
    const message = input.value.trim();
    
    if (message) {
        addAIMessage(message, 'user');
        input.value = '';
        
        // Simulate AI thinking
        setTimeout(() => {
            const aiResponse = generateAIResponse(message);
            addAIMessage(aiResponse, 'bot');
        }, 1000);
    }
}

function addAIMessage(message, sender) {
    const messagesContainer = document.getElementById("aiChatMessages");
    const messageElement = document.createElement("div");
    messageElement.classList.add("ai-message", `ai-message-${sender}`);
    messageElement.innerHTML = `<p>${message}</p>`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Event planning responses
    if (lowerMessage.includes('event') || lowerMessage.includes('schedule') || lowerMessage.includes('plan')) {
        const eventResponses = [
            "I can help you plan your events! Try adding events with specific dates and categories for better organization.",
            "For event planning, consider setting reminders a few days before important events. You can also categorize events by type (festival, personal, etc.).",
            "When planning events, think about the duration, location, and priority. High-priority events will stand out in your calendar.",
            "You can use the calendar view to see all your events at a glance. Try different views (month, week) for better planning."
        ];
        return eventResponses[Math.floor(Math.random() * eventResponses.length)];
    }
    
    // Calendar related responses
    if (lowerMessage.includes('calendar') || lowerMessage.includes('view') || lowerMessage.includes('month')) {
        const calendarResponses = [
            "The calendar shows all your events and Indian holidays. You can click on any day to add events or view existing ones.",
            "Try using the different calendar views - Month view gives you an overview, while Week view shows more detail for each day.",
            "You can navigate through months using the previous/next buttons, or click 'Today' to quickly return to the current date."
        ];
        return calendarResponses[Math.floor(Math.random() * calendarResponses.length)];
    }
    
    // Holiday related responses
    if (lowerMessage.includes('holiday') || lowerMessage.includes('festival') || lowerMessage.includes('diwali') || lowerMessage.includes('holi')) {
        const holidayResponses = [
            "The calendar includes major Indian festivals and holidays. You'll see Republic Day, Holi, Diwali, and other important dates.",
            "Indian holidays are automatically added to your calendar. You can also add your own personal events and celebrations.",
            "Festivals are color-coded in the calendar - look for the special badges on days with important celebrations!"
        ];
        return holidayResponses[Math.floor(Math.random() * holidayResponses.length)];
    }
    
    // General help responses
    const generalResponses = [
        "I'm here to help with your calendar and event planning needs. What would you like to know?",
        "You can ask me about event planning, calendar features, or how to use different parts of the Smart Calendar.",
        "Need help with something specific? Try asking about events, calendar views, or holiday management.",
        "I can assist you with adding events, managing your schedule, or understanding calendar features. What do you need help with?"
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}
