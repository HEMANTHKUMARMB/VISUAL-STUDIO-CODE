const promptInput = document.getElementById('promptInput');
const generateBtn = document.getElementById('generateBtn');
const storyOutput = document.getElementById('storyOutput');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorBox = document.getElementById('errorBox');
const errorMessage = document.getElementById('errorMessage');
const speakBtn = document.getElementById('speakBtn');

generateBtn.addEventListener('click', generateStory);

speakBtn.addEventListener('click', () => {
  const story = storyOutput.textContent.trim();
  if (story && story !== 'Your generated story will appear here.') {
    speakStory(story);
  }
});

async function generateStory() {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    showError('Please enter a story idea or prompt.');
    return;
  }

  hideError();
  storyOutput.textContent = 'Your generated story will appear here.';
  loadingIndicator.classList.remove('hidden');
  generateBtn.disabled = true;

  try {
    const chatHistory = [
      {
        role: 'user',
        parts: [
          {
            text: `Generate a creative story based on the following prompt:\n\n"${prompt}"`
          }
        ]
      }
    ];

    const payload = { contents: chatHistory };
    const apiKey = "YOUR_VALID_API_KEY_HERE"; // 🔐 Replace with your real API key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
      storyOutput.textContent = text;
      speakStory(text); // Auto speak
    } else {
      storyOutput.textContent = 'Could not generate a story. Try a different prompt.';
    }
  } catch (error) {
    console.error('Error generating story:', error);
    showError(`Failed to generate story: ${error.message}`);
    storyOutput.textContent = 'An error occurred while generating the story. Please try again.';
  } finally {
    loadingIndicator.classList.add('hidden');
    generateBtn.disabled = false;
  }
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
