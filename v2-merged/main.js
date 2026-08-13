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

  // ---------- FAQ Q&A widget ----------

  const faqLauncher = document.getElementById('faq-launcher');
  const faqPanel = document.getElementById('faq-panel');
  const faqThread = document.getElementById('faq-thread');
  const faqForm = document.getElementById('faq-form');
  const faqInput = document.getElementById('faq-input');
  const faqChips = document.getElementById('faq-chips');

  if (faqLauncher && faqPanel && faqForm && faqInput && faqThread) {
    const FAQ_DATA = [
      {
        q: 'What products does Silent Visionary offer?',
        keywords: /product|forensics|sentinel|redact|compliance|fraudshield|five capabilit/i,
        a: 'Silent Visionary unifies five capabilities under one platform: <b>Forensics™</b> (digital forensics investigations), <b>Sentinel™</b> (behavioral threat detection), <b>Redact™</b> (automated sensitive-data redaction), <b>Compliance™</b> (audit-ready compliance workflows), and <b>FraudShield™</b> (fraud detection) — sharing one login, one evidence model, and one case timeline.',
      },
      {
        q: 'How much does it cost?',
        keywords: /price|pricing|cost|how much|plan/i,
        a: 'Pricing depends on deployment size and which capabilities you need. The best way to get an accurate quote is through our <a href="contact.html">Contact page</a>.',
      },
      {
        q: 'How do I request a demo?',
        keywords: /demo|trial|try it|get started|sign up/i,
        a: 'You can explore a live interactive demo right now via <a href="dashboard.html">Launch Demo</a> at the top of the site, or <a href="contact.html">contact us</a> to schedule a guided walkthrough.',
      },
      {
        q: 'Is Silent Visionary secure?',
        keywords: /secur|compliant|compliance framework|soc ?2|encrypt|safe/i,
        a: 'Security and compliance are core to the platform’s design — see the <a href="platform.html">Platform</a> and <a href="technology.html">Technology</a> pages for architecture details. For specific security questionnaires, please <a href="contact.html">contact our team</a>.',
      },
      {
        q: 'What industries do you serve?',
        keywords: /industr|government|public safety|enterprise|financial|sector/i,
        a: 'Silent Visionary serves Government & Public Safety, Enterprise Security, and other regulated industries that need unified forensic and threat intelligence. See the <a href="industries.html">Industries</a> page.',
      },
      {
        q: 'What is the Digital Twin?',
        keywords: /digital twin|twin/i,
        a: 'The Digital Twin is an interactive model of a physical environment connected to the platform’s evidence and event data, so investigators can see where an incident happened, not just when. Try it in the <a href="dashboard.html">demo dashboard</a>.',
      },
      {
        q: 'What is the Evidence Graph?',
        keywords: /evidence graph/i,
        a: 'The Evidence Graph visually links people, devices, accounts, and files connected to a case, so investigators can trace relationships instead of reading disconnected reports.',
      },
      {
        q: 'What is Attack Reconstruction?',
        keywords: /attack reconstruction|reconstruct/i,
        a: 'Attack Reconstruction walks investigators stage-by-stage through how an incident unfolded, correlating supporting evidence at each step. Try the guided walkthrough in the <a href="dashboard.html">demo dashboard</a>.',
      },
      {
        q: 'How do I log in?',
        keywords: /log ?in|sign in|dashboard|account/i,
        a: 'Use the <a href="login.html">Login</a> link at the top of the site. Just exploring? <a href="dashboard.html">Launch Demo</a> takes you straight into a live sample investigation — no account required.',
      },
      {
        q: 'What is the SVIC?',
        keywords: /svic|intelligence cloud|shared core/i,
        a: 'The Silent Visionary Intelligence Cloud (SVIC) is the shared core all five products read and write to — so a Sentinel™ detection automatically appears as evidence in a Forensics™ investigation, with no export or re-upload.',
      },
      {
        q: 'How do I contact you?',
        keywords: /contact|talk to|sales|support|reach|email/i,
        a: 'Head to the <a href="contact.html">Contact</a> page, or email <a href="mailto:info@silentvisionary.com">info@silentvisionary.com</a>.',
      },
    ];

    const FAQ_STARTERS = [FAQ_DATA[0].q, FAQ_DATA[2].q, FAQ_DATA[3].q, FAQ_DATA[10].q];

    function faqOpen() {
      faqPanel.classList.add('faq-widget__panel--open');
      faqLauncher.setAttribute('aria-expanded', 'true');
      faqLauncher.classList.add('faq-widget__launcher--open');
      window.setTimeout(function () {
        faqInput.focus();
      }, 150);
    }

    function faqClose() {
      faqPanel.classList.remove('faq-widget__panel--open');
      faqLauncher.setAttribute('aria-expanded', 'false');
      faqLauncher.classList.remove('faq-widget__launcher--open');
    }

    faqLauncher.addEventListener('click', function () {
      if (faqPanel.classList.contains('faq-widget__panel--open')) {
        faqClose();
      } else {
        faqOpen();
      }
    });

    function faqRenderChips() {
      if (!faqChips) return;
      faqChips.innerHTML = '';
      FAQ_STARTERS.forEach(function (q) {
        var chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'faq-widget__chip';
        chip.textContent = q;
        chip.addEventListener('click', function () {
          faqAsk(q);
        });
        faqChips.appendChild(chip);
      });
    }

    function faqMatch(question) {
      for (var i = 0; i < FAQ_DATA.length; i++) {
        if (FAQ_DATA[i].keywords.test(question)) return FAQ_DATA[i].a;
      }
      return 'I don’t have a canned answer for that yet — please <a href="contact.html">reach out to our team</a> and they’ll help directly.';
    }

    function faqAsk(question) {
      if (!question || !question.trim()) return;

      var userMsg = document.createElement('div');
      userMsg.className = 'faq-widget__msg faq-widget__msg--user';
      var userP = document.createElement('p');
      userP.textContent = question;
      userMsg.appendChild(userP);
      faqThread.appendChild(userMsg);

      var botMsg = document.createElement('div');
      botMsg.className = 'faq-widget__msg faq-widget__msg--bot';
      var botP = document.createElement('p');
      botP.innerHTML = faqMatch(question);
      botMsg.appendChild(botP);
      faqThread.appendChild(botMsg);

      if (faqChips) {
        faqChips.remove();
      }
      faqThread.scrollTop = faqThread.scrollHeight;
      faqInput.value = '';
    }

    faqForm.addEventListener('submit', function (e) {
      e.preventDefault();
      faqAsk(faqInput.value);
    });

    faqRenderChips();

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && faqPanel.classList.contains('faq-widget__panel--open')) {
        faqClose();
      }
    });
  }
})();
