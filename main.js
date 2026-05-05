/* MERVIL Global — main.js */

// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile burger menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Contact form — Formspree submission
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.btn');
    const success = document.getElementById('formSuccess');
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        success.classList.add('visible');
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        alert('Something went wrong. Please try again or email us directly at info@mervilglobal.com');
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      alert('Something went wrong. Please try again or email us directly at info@mervilglobal.com');
    }
  });
}

// Fade-in on scroll (simple intersection observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.pillar, .stat, .value-card, .geo-item, .service-block__content, .contact-info, .contact-form-wrap').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  observer.observe(el);
});
