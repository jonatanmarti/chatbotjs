const API_KEY = 'sk-79e2c70a-b945-45b1-8065-ab4389b3d345'; 
const AGENT_ID = 'be9eb076-8329-4596-ba8e-9595ea053ba7';
const ORG_ID = '77c1325c-ff0d-4224-a361-a8fe25d08cac';

async function sendMessage(message) {
  const response = await fetch('https://api-beta.codegpt.co/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      'CodeGPT-Org-Id': ORG_ID
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: message }],
      agentId: AGENT_ID
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

// Función para manejar el envío de mensajes y mostrar las respuestas
async function handleSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (message) {
    const response = await sendMessage(message);
    const chatLog = document.getElementById('chatLog');
    chatLog.innerHTML += `<div>You: ${message}</div>`;
    chatLog.innerHTML += `<div>Assistant: ${response}</div>`;
    input.value = '';
  }
}

// Agrega un evento de escucha al formulario
const form = document.getElementById('chatForm');
form.addEventListener('submit', handleSubmit);