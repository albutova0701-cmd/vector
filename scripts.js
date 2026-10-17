// Плавная навигация и безопасные эффекты: контент остаётся видимым даже без JavaScript.
const header = document.querySelector('.header');
if (header) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    const target = href && href.length > 1 ? document.querySelector(href) : null;
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// Анимация не скрывает содержимое, если браузер её не поддерживает.
try {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.service, .features > div, .section-head, .about-note, .contacts-card, .requisites').forEach(el => observer.observe(el));
  }
} catch (error) { /* Основной контент остаётся доступным без эффектов. */ }
