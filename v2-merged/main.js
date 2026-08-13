/**
 * Silent Visionary — Merged Platform (v2)
 * Navigation, scroll effects, reveal animation
 */

(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll(
    '.mobile-nav__link, .mobile-nav__cta'
  );
  const revealElements = document.querySelectorAll('.reveal');

  // ---------- Mobile navigation ----------

  function toggleMobileNav() {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isOpen);
    mobileNav.classList.toggle('mobile-nav--open', !isOpen);
    document.body.classList.toggle('mobile-nav-open', !isOpen);
  }

  function closeMobileNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('mobile-nav--open');
    document.body.classList.remove('mobile-nav-open');
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileNav);
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'Escape' &&
      mobileNav &&
      mobileNav.classList.contains('mobile-nav--open')
    ) {
      closeMobileNav();
    }
  });

  // ---------- Header scroll state ----------

  let ticking = false;

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    ticking = false;
  }

  if (header) {
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateHeader);
          ticking = true;
        }
      },
      { passive: true }
    );
    updateHeader();
  }

  // ---------- Scroll reveal ----------

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('visible');
      }
    });
  }

  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll, { passive: true });

  function staggerReveal() {
    const grids = document.querySelectorAll(
      '.pillars-grid, .cards-grid, .invest-row'
    );
    grids.forEach((grid) => {
      const cards = grid.querySelectorAll('.reveal');
      cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.08}s`;
      });
    });
  }
  staggerReveal();

  // ---------- Smooth scroll for in-page anchors ----------

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          16;

        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  document.body.classList.add('loaded');
})();
