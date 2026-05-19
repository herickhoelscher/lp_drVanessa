// =============================================
// FAQ ACCORDION — abre um item por vez
// =============================================
document.querySelectorAll('.faq-question').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var item   = this.closest('.faq-item');
    var isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('open');
      this.setAttribute('aria-expanded', 'true');
    }
  });
});

// =============================================
// SMOOTH SCROLL com offset da barra fixa
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    var barHeight = document.getElementById('urgency-bar').offsetHeight;
    var top = target.getBoundingClientRect().top + window.pageYOffset - barHeight - 8;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
});

// =============================================
// SCROLL REVEAL — fade-up nos cards e seções
// =============================================
(function () {
  var selectors = [
    '.pain-item',
    '.module-card',
    '.testimonial-card',
    '.audience-card',
    '.seal',
    '.bonus-item',
    '.faq-item',
    '.proof-pill',
    '.cred-badge',
    '.pain-transition',
    '.offer-card',
  ];

  var elements = document.querySelectorAll(selectors.join(', '));

  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything immediately
    elements.forEach(function (el) { el.style.opacity = '1'; });
    return;
  }

  // Add stagger delays to siblings within a grid/list
  var gridParents = document.querySelectorAll(
    '.pain-grid, .modules-grid, .testimonials-grid, .audience-grid, .seals, .bonus-items, .social-proof, .credentials'
  );

  gridParents.forEach(function (parent) {
    var children = parent.children;
    for (var i = 0; i < children.length; i++) {
      if (i === 0) children[i].classList.remove('reveal-delay-1','reveal-delay-2','reveal-delay-3','reveal-delay-4','reveal-delay-5');
      var delayClass = 'reveal-delay-' + Math.min(i, 5);
      if (i > 0) children[i].classList.add(delayClass);
    }
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

  elements.forEach(function (el) {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
