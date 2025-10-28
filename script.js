// -------------------------
// NIGHT MODE TOGGLE
// -------------------------
const nightToggle = document.getElementById('nightToggle');
nightToggle.addEventListener('click', () => {
  document.body.classList.toggle('night');
});

// -------------------------
// LOADER (full-screen overlay)
// -------------------------
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  // Wait 3 seconds to simulate loading
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 1000);
  }, 3000);
});

// -------------------------
// HAMBURGER MOBILE NAV
// -------------------------
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// Close mobile menu when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('open');
  });
});

// -------------------------
// SMOOTH SCROLL FOR ANCHORS
// -------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// -------------------------
// ACTIVE NAV LINK ON SCROLL
// -------------------------
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      const id = section.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// -------------------------
// HERO FLOATING ICONS
// -------------------------
const floatingIcons = document.querySelectorAll('.floating-icon');
floatingIcons.forEach(icon => {
  const randomDelay = Math.random() * 2; // seconds
  icon.style.animationDelay = `${randomDelay}s`;
});

// -------------------------
// PARTICLES BACKGROUND
// -------------------------
const particleContainer = document.querySelector('.particles');

function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = `${Math.random() * 100}vw`;
  particle.style.fontSize = `${Math.random() * 1.2 + 0.8}rem`;
  particle.style.animationDuration = `${Math.random() * 8 + 6}s`;
  particle.innerHTML = '✨';
  particleContainer.appendChild(particle);
  setTimeout(() => particle.remove(), 14000);
}

setInterval(createParticle, 400);

// -------------------------
// SPARKLE EASTER EGGS
// -------------------------
document.body.addEventListener('click', (e) => {
  const star = document.createElement('img');
  star.src = 'images/star.png';
  star.className = 'sparkle';
  star.style.left = e.pageX + 'px';
  star.style.top = e.pageY + 'px';
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 1200);
});
