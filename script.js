// Night mode toggle
const nightToggle = document.getElementById('nightToggle');
nightToggle.addEventListener('click', () => {
  document.body.classList.toggle('night');
});

// Loader fade-out
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.style.opacity = '0';
  setTimeout(() => loader.style.display = 'none', 800);
});

// Sparkle Easter eggs
document.body.addEventListener('click', (e) => {
  const star = document.createElement('img');
  star.src = 'images/star.png';
  star.className = 'sparkle';
  star.style.left = e.pageX + 'px';
  star.style.top = e.pageY + 'px';
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 1000);
});
