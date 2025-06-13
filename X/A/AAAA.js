// Floating hearts inside box
function spawnHeart() {
  const container = document.getElementById("floating-hearts-container");
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.innerHTML = "❤️";
  heart.style.left = `${Math.random() * container.offsetWidth}px`;
  heart.style.bottom = "0px";

  container.appendChild(heart);
  setTimeout(() => heart.remove(), 3000);
}

setInterval(spawnHeart, 800);

// Heart rain background
function createHeartRain() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${2 + Math.random() * 3}s`;

  document.getElementById("heart-rain").appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}

setInterval(createHeartRain, 300);

// Typing Apology Message
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

// Show time inside box
function showTime() {
  document.getElementById("currentTime").innerHTML = new Date().toLocaleString();
}
setInterval(showTime, 1000);
showTime();

// Star emoji system
function showEmoji(star) {
  const emojiMap = {
    1: "😭", // crying
    2: "😢", // sad
    3: "🙂", // simple
    4: "🙂🌼", // medium flower
    5: "😊❤️", // smile + heart
  };
  document.getElementById("emojiResponse").innerText = emojiMap[star] || "";
}

// Start everything
window.onload = () => {
  typeEffect();
};
