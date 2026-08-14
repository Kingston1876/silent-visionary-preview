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
  const faqChips = document.getElementById('faq-chips');

  if (faqLauncher && faqPanel && faqThread) {
    const FAQ_DATA = [
      {
        q: 'What products does Silent Visionary offer?',
        keywords: /product|forensics|sentinel|redact|compliance|fraudshield|five capabilit/i,
        a: 'Silent Visionary unifies five capabilities under one platform: <b>Forensics</b> (digital forensics investigations), <b>Sentinel</b> (behavioral threat detection), <b>Redact</b> (automated sensitive-data redaction), <b>Compliance</b> (audit-ready compliance workflows), and <b>FraudShield</b> (fraud detection) — sharing one login, one evidence model, and one case timeline.',
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
        a: 'The Silent Visionary Intelligence Cloud (SVIC) is the shared core all five products read and write to — so a Sentinel detection automatically appears as evidence in a Forensics investigation, with no export or re-upload.',
      },
      {
        q: 'How do I contact you?',
        keywords: /contact|talk to|sales|support|reach|email/i,
        a: 'Head to the <a href="contact.html">Contact</a> page, or email <a href="mailto:info@silentvisionary.com">info@silentvisionary.com</a>.',
      },
    ];

    const FAQ_STARTERS = FAQ_DATA.map(function (item) { return item.q; });

    function faqOpen() {
      faqPanel.classList.add('faq-widget__panel--open');
      faqLauncher.setAttribute('aria-expanded', 'true');
      faqLauncher.classList.add('faq-widget__launcher--open');
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

      faqThread.scrollTop = faqThread.scrollHeight;
    }

    faqRenderChips();

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && faqPanel.classList.contains('faq-widget__panel--open')) {
        faqClose();
      }
    });
  }

  // ---------- Homepage live split feed (cyber + street) ----------

  const splitCyberList = document.getElementById('split-feed-cyber');
  const splitStreetList = document.getElementById('split-feed-street');

  if (splitCyberList && splitStreetList) {
    const SPLIT_CYBER_EVENTS = [
      'Badge access — Door D-12, Contractor-019',
      'Outbound connection flagged — 185.212.44.6',
      'Encoded PowerShell process detected',
      'Credential reuse attempt — RMS admin account',
      'Lateral movement — SCADA-APP-02 → RMS-DB-01',
      'Query blocked — insufficient clearance',
      'Network scan detected — records subnet',
      'Session terminated by SOC',
    ];
    const SPLIT_STREET_EVENTS = [
      '911 call received — armed robbery in progress',
      'ALPR hit — suspect vehicle, 5th & Main',
      'Street camera — suspect flees toward I-40',
      'Transit tap correlation — Riverside Station',
      'Witness statement recorded — store clerk',
      'Cell tower ping — suspect phone, Sector 4',
      'Perimeter fence sensor triggered',
      'Public camera sighting — Bridge St.',
    ];
    const SPLIT_MAX_ITEMS = 5;

    function splitNowLabel() {
      const d = new Date();
      const pad = (n) => (n < 10 ? '0' + n : '' + n);
      return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    }

    function splitFeedTick(list, events, indexRef) {
      const text = events[indexRef.i % events.length];
      indexRef.i++;
      const li = document.createElement('li');
      const t = document.createElement('span');
      t.className = 't';
      t.textContent = splitNowLabel();
      li.appendChild(t);
      li.appendChild(document.createTextNode(text));
      list.insertBefore(li, list.firstChild);
      while (list.children.length > SPLIT_MAX_ITEMS) {
        list.removeChild(list.lastChild);
      }
    }

    const cyberRef = { i: 0 };
    const streetRef = { i: 0 };

    splitFeedTick(splitCyberList, SPLIT_CYBER_EVENTS, cyberRef);
    splitFeedTick(splitStreetList, SPLIT_STREET_EVENTS, streetRef);

    window.setInterval(() => splitFeedTick(splitCyberList, SPLIT_CYBER_EVENTS, cyberRef), 2600);
    window.setInterval(() => splitFeedTick(splitStreetList, SPLIT_STREET_EVENTS, streetRef), 3100);
  }

  // ---------- Forensics: live chain-of-custody demo ----------

  const custodyInput = document.getElementById('custody-input');
  const custodyBtn = document.getElementById('custody-seal-btn');
  const custodyHashRow = document.getElementById('custody-hash-row');
  const custodyHashValue = document.getElementById('custody-hash-value');
  const custodyLedger = document.getElementById('custody-ledger');

  if (custodyInput && custodyBtn && custodyHashRow && custodyHashValue && custodyLedger) {
    let custodySeq = 0;

    async function sealEvidence() {
      const text = custodyInput.value;
      if (!text.trim()) {
        custodyInput.focus();
        return;
      }
      if (!window.crypto || !window.crypto.subtle) {
        custodyHashValue.textContent = 'Web Crypto API not available in this browser.';
        custodyHashRow.hidden = false;
        return;
      }

      custodyBtn.disabled = true;
      const originalLabel = custodyBtn.textContent;
      custodyBtn.textContent = 'Hashing…';

      try {
        const enc = new TextEncoder().encode(text);
        const digest = await window.crypto.subtle.digest('SHA-256', enc);
        const hex = Array.from(new Uint8Array(digest))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');

        custodyHashValue.textContent = hex;
        custodyHashRow.hidden = false;

        custodySeq++;
        const now = new Date();
        const pad = (n) => (n < 10 ? '0' + n : '' + n);
        const stamp = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
        const id = 'EVID-DEMO-' + String(custodySeq).padStart(3, '0');

        const row = document.createElement('div');
        row.className = 'custody-demo__entry';
        const idSpan = document.createElement('span');
        idSpan.className = 'custody-demo__entry-id';
        idSpan.textContent = id;
        const hashSpan = document.createElement('span');
        hashSpan.className = 'custody-demo__entry-hash';
        hashSpan.textContent = hex.slice(0, 16) + '…';
        const statusSpan = document.createElement('span');
        statusSpan.className = 'custody-demo__entry-status';
        statusSpan.textContent = 'Verified';
        const timeSpan = document.createElement('span');
        timeSpan.className = 'custody-demo__entry-time';
        timeSpan.textContent = stamp;
        row.appendChild(idSpan);
        row.appendChild(hashSpan);
        row.appendChild(statusSpan);
        row.appendChild(timeSpan);
        custodyLedger.insertBefore(row, custodyLedger.firstChild);
      } finally {
        custodyBtn.disabled = false;
        custodyBtn.textContent = originalLabel;
      }
    }

    custodyBtn.addEventListener('click', sealEvidence);
    custodyInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sealEvidence();
      }
    });
  }
})();
