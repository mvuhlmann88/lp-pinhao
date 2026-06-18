/* ============================================================
   PALMASNET — LP PINHÃO
   assets/js/main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Config ────────────────────────────────────────────── */
  const WA_NUMBER = '554692001295';
  const WA_MESSAGE = encodeURIComponent(
    'Olá! Vim pela página de Pinhão e quero contratar a internet da Palmasnet. Pode me ajudar?'
  );
  const WA_BASE = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

  /* ── Popup lead ── */
  var overlay  = document.getElementById('lead-overlay');
  var form     = document.getElementById('lead-form');
  var success  = document.getElementById('lead-success');
  var consent  = document.getElementById('lead-consent');
  var submit   = document.getElementById('lead-submit');
  var closeBtn = document.getElementById('lead-close');

  /* ── Máscara telefone ── */
  document.getElementById('lead-tel').addEventListener('input', function () {
    var v = this.value.replace(/\D/g, '').substring(0, 11);
    if (v.length > 10) {
      v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (v.length > 6) {
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {
      v = v.replace(/^(\d*)/, '($1');
    }
    this.value = v;
  });

  function openPopup() {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    form.reset();
    form.style.display = '';
    success.style.display = 'none';
    submit.disabled = true;
  }

  // Abre popup em todos os botões CTA
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openPopup();
    });
  });

  // Fecha ao clicar fora ou no X
  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closePopup();
  });

  // Fecha com ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePopup();
  });

  // Habilita botão só com checkbox marcado
  consent.addEventListener('change', function () {
    submit.disabled = !this.checked;
  });

  // Envio do formulário
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    ['lead-nome', 'lead-tel', 'lead-email'].forEach(function (id) {
      var input = document.getElementById(id);
      if (!input.value.trim()) {
        input.classList.add('error');
        ok = false;
      } else {
        input.classList.remove('error');
      }
    });
    if (!ok) return;
    form.style.display = 'none';
    success.style.display = 'block';
  });

  /* ── Sticky header ──────────────────────────────────────── */
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Scroll reveal ──────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { observer.observe(el); });
    setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add('visible'); });
    }, 800);
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Smooth scroll for anchor links ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── Stagger reveal for grid children ────────────────────── */
  document.querySelectorAll('.plans-grid, .benefits-grid, .testimonials-grid').forEach(function (grid) {
    var children = grid.querySelectorAll('.reveal');
    children.forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.1) + 's';
    });
  });

})();
