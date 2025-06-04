document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");

    chatForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const message = userInput.value.trim();
        if (!message) return;

        appendMessage("You", message, "user");

        userInput.value = "";
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        appendMessage("Bot", data.reply, "bot");
    });

    function appendMessage(sender, text, type) {
        const messageEl = document.createElement("div");
        messageEl.classList.add("message", type);

        const icon = document.createElement("div");
        icon.classList.add("bot-icon");
        icon.textContent = type === "bot" ? "🤖" : "🧑";

        const textDiv = document.createElement("div");
        textDiv.classList.add("message-text");
        textDiv.textContent = text;

        const timestamp = document.createElement("div");
        timestamp.classList.add("timestamp");
        timestamp.textContent = "Just now";

        messageEl.appendChild(icon);
        messageEl.appendChild(textDiv);
        messageEl.appendChild(timestamp);
        chatContainer.appendChild(messageEl);

        chatContainer.scrollTop = chatContainer.scrollHeight;
   

    if (type === "user") {
        messageEl.style.alignSelf = "flex-end"; 
    } else {
        messageEl.style.alignSelf = "flex-start"; 
    }

    chatContainer.appendChild(messageEl);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

    }
);
