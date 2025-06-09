// toggle hamburger
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('active');
});

// sticky nav on scroll
let lastScroll = 0;
const header = document.querySelector('.logo-container');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 100) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});
//
const stickyNav = document.getElementById('stickyNav');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 100) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});

// cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// grow cursor on link hover
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5) translate(-50%, -50%)';
    cursor.style.borderColor = '#ff5533';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1) translate(-50%, -50%)';
    cursor.style.borderColor = 'rgba(0,0,0,0.5)';
  });
});
