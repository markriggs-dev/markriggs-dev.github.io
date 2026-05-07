(function () {
  'use strict';

  // ── Header scroll state ──────────────────────────────────────────────────
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // ── Active nav link (Intersection Observer) ──────────────────────────────
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

  // ── Mobile nav ───────────────────────────────────────────────────────────
  const navToggle  = document.getElementById('navToggle');
  const navOverlay = document.getElementById('navOverlay');
  const navClose   = document.getElementById('navClose');

  function openNav() {
    navOverlay.classList.add('open');
    navOverlay.setAttribute('aria-hidden', 'false');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navOverlay.classList.remove('open');
    navOverlay.setAttribute('aria-hidden', 'true');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    navOverlay.classList.contains('open') ? closeNav() : openNav();
  });
  navClose.addEventListener('click', closeNav);
  document.querySelectorAll('.nav-overlay-link').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // ── Scroll-reveal fade-in ────────────────────────────────────────────────
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  // Stagger siblings within the same grid/group
  document.querySelectorAll('.fade-in').forEach((el, _, all) => {
    const siblings = Array.from(el.parentElement.querySelectorAll('.fade-in'));
    const idx = siblings.indexOf(el);
    if (idx > 0) el.style.transitionDelay = `${idx * 0.07}s`;
    fadeObserver.observe(el);
  });

  // ── Typewriter ───────────────────────────────────────────────────────────
  const typeEl = document.getElementById('typewriter');
  const text   = 'Real systems. Real tradeoffs. Shipped to production.';
  let i = 0;

  function type() {
    if (i < text.length) {
      typeEl.textContent += text[i++];
      setTimeout(type, i < 30 ? 55 : 32);
    }
  }
  setTimeout(type, 900);

  // ── Profile photo fallback ───────────────────────────────────────────────
  const avatar = document.getElementById('profileAvatar');
  if (avatar) {
    avatar.addEventListener('error', () => {
      const initials = document.createElement('div');
      initials.className = 'avatar-initials';
      initials.textContent = 'MR';
      avatar.replaceWith(initials);
    });
  }

  // ── Smooth scroll (supplement CSS for older browsers) ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

})();
