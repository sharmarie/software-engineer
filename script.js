// Night mode toggle
document.getElementById('nightToggle').addEventListener('click', () => {
  document.body.classList.toggle('night');
});

// Extended Loader (3 seconds)
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 1000);
  }, 3000); // stays visible for 3 seconds
});

// Sparkle Easter eggs
document.body.addEventListener('click', (e) => {
  const star = document.createElement('img');
  star.src = 'images/star.png';
  star.className = 'sparkle';
  star.style.left = e.pageX + 'px';
  star.style.top = e.pageY + 'px';
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 1200);
});
