// Toggle mobile menu
document.getElementById("menu-toggle").addEventListener("click", function () {
  document.querySelector("nav ul").classList.toggle("show");
});

// Fade-in sections on scroll
const faders = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));
// Simulate hover on touch for .socials a
document.querySelectorAll('.socials a').forEach(el => {
  el.addEventListener('touchstart', () => {
    el.classList.add('hovered');
  });
  el.addEventListener('touchend', () => {
    setTimeout(() => el.classList.remove('hovered'), 300);
  });
});
