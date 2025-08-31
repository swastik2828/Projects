// Navbar scroll effect
window.addEventListener("scroll", function() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Typing animation
const text = document.querySelector(".typing-text");
const txt = text.textContent;
text.textContent = "";
let i = 0;
function typeWriter() {
  if (i < txt.length) {
    text.textContent += txt.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}
typeWriter();

// Go to Top Button
document.getElementById('goTopBtn').onclick = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Animate credentials hover (desktop only)
// Animate credentials hover (desktop only)
if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll('.cred-tile, .service-tile, .portfolio-tile').forEach(tile => {
    tile.addEventListener('mouseenter', () => tile.classList.add('hovered'));
    tile.addEventListener('mouseleave', () => tile.classList.remove('hovered'));
  });
}


// Intersection Observer for animations
function animateOnScroll(selector, className = 'visible') {
  const elements = document.querySelectorAll(selector);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add(className));
  }
}

document.addEventListener('DOMContentLoaded', function() {
  animateOnScroll('.animate-service');
  animateOnScroll('.animate-why');
  animateOnScroll('.animate-about');
  animateOnScroll('#portfolio .portfolio-tile');
  animateOnScroll('.cred-tile');
});

// --- MOBILE FLIP LOGIC ---
// Service, Portfolio, and Credential tiles
document.querySelectorAll('.more-details-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const tile = btn.closest('.service-tile, .portfolio-tile, .cred-tile');
    tile.classList.add('flipped');
    // Remove blur if present
    tile.classList.remove('hovered');
  });
});
document.querySelectorAll('.close-details-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const tile = btn.closest('.service-tile, .portfolio-tile, .cred-tile');
    tile.classList.remove('flipped');
    // Remove blur if present
    tile.classList.remove('hovered');
  });
});
