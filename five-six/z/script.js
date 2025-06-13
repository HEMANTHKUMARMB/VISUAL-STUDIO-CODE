function showTime() {
  document.getElementById('currentTime').innerHTML = new Date().toUTCString();
}

showTime();
setInterval(showTime, 1000);

// Star rating emoji logic
const stars = document.querySelectorAll('.star');
const emojiResponse = document.getElementById('emojiResponse');


const emojiMap = {
  1: "😢",      // crying moji
  2: "😞",      // sad moji
  3: "🙂",      // simple moji
  4: "🙂🌼",    // medium flower moji
  5: "😄❤️"     // rainbow smile + heart moji
}

stars.forEach(star => {
  star.addEventListener('click', () => {
    const rating = star.getAttribute('data-rating');
    emojiResponse.textContent = emojiMap[rating];
  });
});

// Heart Rain Logic
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = Math.random() * 3 + 2 + 's';
  heart.textContent = '❤️';
  document.querySelector('.heart-container').appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

// Floating heart generator inside the box
function spawnHeart() {
  const container = document.getElementById("floating-hearts-container");
  let heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.innerHTML = "❤️";

  let containerWidth = container.offsetWidth;
  let xPosition = Math.random() * containerWidth;
  heart.style.left = `${xPosition}px`;
  heart.style.bottom = "0px";

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 3000);
}

// Start spawning hearts every 800ms
setInterval(spawnHeart, 800);

// Typing animation for apology text
const text = `"Hi ---------, 
I deeply regret my mistake, and it hurts me to know that I’ve hurt you.
You are the most precious part of my life, and I’ll do anything to make it right.
Please forgive me —
I cherish you more than words can say."`;

let i = 0;
function typeEffect() {
  if (i < text.length) {
    document.getElementById("apology-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 50);
  }
}

window.onload = typeEffect;
