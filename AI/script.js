const promptInput = document.getElementById('promptInput');
const generateBtn = document.getElementById('generateBtn');
const storyOutput = document.getElementById('storyOutput');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorBox = document.getElementById('errorBox');
const errorMessage = document.getElementById('errorMessage');
const speakBtn = document.getElementById('speakBtn');
const bookContainer = document.querySelector('.book-container');
const goBackBtn = document.getElementById('goBackBtn');

generateBtn.addEventListener('click', generateStory);
speakBtn.addEventListener('click', () => {
  const story = storyOutput.textContent.trim();
  if (story && story !== 'Your enchanted story will appear here.') {
    speakStory(story);
  }
});

goBackBtn.addEventListener('click', goBackToPrompt);

async function generateStory() {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    showError('Please enter a story idea or prompt.');
    return;
  }

  hideError();
  storyOutput.textContent = '';
  loadingIndicator.classList.remove('hidden');
  generateBtn.disabled = true;
  bookContainer.classList.add('open'); // Add class to open the book on generation start
  goBackBtn.style.display = 'none'; // Hide back button while generating

  try {
    // --- IMPORTANT: REPLACE WITH YOUR ACTUAL GOOGLE AI STUDIO API KEY ---
    // Get this API key from Google AI Studio (or Google Cloud Console for Gemini API)
    const apiKey = "AIzaSyBMMBINsqheKJuryaXeynX4q5Zerr78sh8";

    // Google Gemini API endpoint for text generation
    // Using 'gemini-1.5-flash' which is generally accessible.
    // You can also try 'gemini-pro' if 'gemini-1.5-flash' is not available.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const chatHistory = [{
      role: "user",
      // For Google Gemini API, use 'parts' array with 'text' property
      parts: [{ text: `Generate a creative story based on the following prompt:\n\n"${prompt}"` }]
    }];

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: chatHistory, // Google Gemini API expects 'contents'
        generationConfig: {
          temperature: 0.7, // Optional: Adjust creativity
          maxOutputTokens: 1000, // Optional: Set max length of the response
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || response.statusText);
    }

    const data = await response.json();
    // Google Gemini API response structure: data.candidates[0].content.parts[0].text
    const story = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (story) {
      animateTypewriter(story);
      addFloatingEmojis();
      goBackBtn.style.display = 'block';
    } else {
      storyOutput.textContent = 'Could not conjure a story. Please try again.';
      goBackBtn.style.display = 'block';
    }

  } catch (error) {
    showError(`Failed to conjure story: ${error.message}`);
    storyOutput.textContent = 'An error occurred. Please try again.';
    goBackBtn.style.display = 'block';
  } finally {
    loadingIndicator.classList.add('hidden');
    generateBtn.disabled = false;
  }
}

function animateTypewriter(text) {
  storyOutput.innerHTML = '';
  let i = 0;
  function typeNext() {
    if (i < text.length) {
      storyOutput.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeNext, 15);
    }
  }
  typeNext();
}

function goBackToPrompt() {
  bookContainer.classList.remove('open'); // "Close" the book
  storyOutput.textContent = 'Your enchanted story will appear here.'; // Reset story output
  goBackBtn.style.display = 'none'; // Hide the back button again
  promptInput.value = ''; // Clear the prompt
  hideError(); // Clear any previous errors
}

function showError(message) {
  errorMessage.textContent = message;
  errorBox.classList.remove('hidden');
}
function hideError() {
  errorBox.classList.add('hidden');
  errorMessage.textContent = '';
}
function speakStory(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 1;
  synth.speak(utterance);
}
function addFloatingEmojis() {
  for (let i = 0; i < 12; i++) {
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.style.left = `${50 + (Math.random() * 40 - 20)}%`;
    emoji.style.top = `${50 + (Math.random() * 40 - 20)}%`;
    emoji.textContent = ['✨','📖','🌟','🧠','🔥','💫','🎉','📜','🧚‍♀️','🔮'][Math.floor(Math.random() * 10)];
    emoji.style.animationDuration = `${4 + Math.random() * 2}s`;
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 6000);
  }
}