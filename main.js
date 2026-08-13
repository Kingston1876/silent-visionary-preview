/**
 * Silent Visionary - Main JavaScript
 * Handles navigation, animations, and interactions
 */

(function () {
  'use strict';

  // ============================================
  // DOM Elements
  // ============================================

  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll(
    '.mobile-nav__link, .mobile-nav__cta'
  );
  const revealElements = document.querySelectorAll('.reveal');

  // ============================================
  // Mobile Navigation
  // ============================================

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

  // Close mobile nav when clicking on a link
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close mobile nav on escape key
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'Escape' &&
      mobileNav.classList.contains('mobile-nav--open')
    ) {
      closeMobileNav();
    }
  });

  // ============================================
  // Header Scroll Effect
  // ============================================

  let lastScrollY = 0;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

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

  // ============================================
  // Scroll Reveal Animation
  // ============================================

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

  // Initial check for elements already in view
  revealOnScroll();

  window.addEventListener('scroll', revealOnScroll, { passive: true });

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerHeight = header.offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // ============================================
  // Staggered Animation for Grid Items
  // ============================================

  function staggerReveal() {
    const grids = document.querySelectorAll(
      '.grid, .solutions-grid, .tech-grid'
    );

    grids.forEach((grid) => {
      const cards = grid.querySelectorAll('.reveal');
      cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
      });
    });
  }

  staggerReveal();

  // ============================================
  // Initialize
  // ============================================

  // Set initial header state
  updateHeader();

  // Add loaded class to body for entrance animations
  document.body.classList.add('loaded');
})();
