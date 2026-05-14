/* ============================================================
   AutoRoy AI — script.js
   Handles: navbar, mobile menu, scroll reveal, counters,
            FAQ accordion, hero stats bar, form → WhatsApp
============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     INTRO / SPLASH SCREEN
  ---------------------------------------------------------- */
  var introScreen = document.getElementById('intro-screen');
  if (introScreen) {
    // Show for 1.9s then fade out
    setTimeout(function () {
      introScreen.classList.add('hidden');
      setTimeout(function () {
        introScreen.style.display = 'none';
      }, 850);
    }, 1900);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     NAVBAR — scroll state
  ---------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ----------------------------------------------------------
     SMOOTH SCROLLING — nav links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight + 16 : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      if (prefersReducedMotion) {
        window.scrollTo({ top: top });
      } else {
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
      // Close mobile menu if open
      closeMobileMenu();
    });
  });

  /* ----------------------------------------------------------
     MOBILE MENU
  ---------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  let menuOpen = false;

  function openMobileMenu() {
    menuOpen = true;
    if (navLinks)  navLinks.classList.add('open');
    if (hamburger) { hamburger.classList.add('open'); hamburger.setAttribute('aria-expanded', 'true'); }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    menuOpen = false;
    if (navLinks)  navLinks.classList.remove('open');
    if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (menuOpen) { closeMobileMenu(); } else { openMobileMenu(); }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) closeMobileMenu();
  });

  /* ----------------------------------------------------------
     SCROLL REVEAL — IntersectionObserver
  ---------------------------------------------------------- */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });

    document.querySelectorAll('.reveal, .reveal-left').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // If reduced motion or no support, show everything immediately
    document.querySelectorAll('.reveal, .reveal-left').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ----------------------------------------------------------
     COUNTER ANIMATION — hero stats
  ---------------------------------------------------------- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = prefersReducedMotion ? 0 : 1400;
    const start = performance.now();
    const hasPct = el.classList.contains('stat-pct');

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + (hasPct ? '%' : '');
      if (progress < 1) requestAnimationFrame(step);
    }

    if (duration === 0) {
      el.textContent = target + (hasPct ? '%' : '');
    } else {
      requestAnimationFrame(step);
    }
  }

  // Also animate the stats bar fill
  function animateStatsBar() {
    const bar = document.querySelector('.stats-bar-fill');
    if (bar) bar.style.width = '94%';
  }

  // Animate strip counters — triggered on scroll via IntersectionObserver
  var stripTriggered = false;
  var stripEl = document.querySelector('.stats-strip');
  if (stripEl && 'IntersectionObserver' in window) {
    var stripObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !stripTriggered) {
          stripTriggered = true;
          stripObserver.unobserve(entry.target);
          // Small delay so animation is visible as user scrolls in
          setTimeout(function () {
            document.querySelectorAll('.ss-counter').forEach(function (el, i) {
              var target = parseInt(el.dataset.target, 10);
              var suffix = el.dataset.suffix || '';
              var dur    = prefersReducedMotion ? 0 : 2000;
              // Stagger each counter by 120ms
              var delay  = prefersReducedMotion ? 0 : i * 120;
              setTimeout(function () {
                var t0 = performance.now();
                if (dur === 0) {
                  el.textContent = target + suffix;
                  el.style.transform = 'scale(1.12)';
                  setTimeout(function () { el.style.transform = ''; }, 200);
                  return;
                }
                (function tick(now) {
                  var p = Math.min((now - t0) / dur, 1);
                  // easeOutQuart — starts fast, slows dramatically at end
                  var ease = 1 - Math.pow(1 - p, 4);
                  el.textContent = Math.round(ease * target) + suffix;
                  if (p < 1) {
                    requestAnimationFrame(tick);
                  } else {
                    // Pop on finish
                    el.style.transition = 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)';
                    el.style.transform  = 'scale(1.15)';
                    setTimeout(function () { el.style.transform = 'scale(1)'; }, 250);
                    setTimeout(function () { el.style.transition = ''; }, 600);
                  }
                })(t0);
              }, delay);
            });
          }, 200);
        }
      });
    }, { threshold: 0.4, rootMargin: '0px 0px -30px 0px' });
    stripObserver.observe(stripEl);
  }

  // Hero stats-card counters — wait for the reveal animation to FINISH before
  // counting, because the card starts invisible (reveal-left) and the old
  // IntersectionObserver fired while the card was still transparent.
  var heroVisual   = document.querySelector('.hero-visual');
  var statsCard    = document.querySelector('.stats-card');
  var heroCountDone = false;

  function runHeroCounters() {
    if (heroCountDone) return;
    heroCountDone = true;
    // 850ms = reveal-left transition duration (0.8s) + small buffer
    var delay = prefersReducedMotion ? 0 : 850;
    setTimeout(function () {
      document.querySelectorAll('.stat-num').forEach(animateCounter);
      animateStatsBar();
    }, delay);
  }

  if (heroVisual && statsCard) {
    if (prefersReducedMotion) {
      // No transitions — just set values instantly
      runHeroCounters();
    } else if ('MutationObserver' in window) {
      // Watch for .visible being added to hero-visual by the reveal system
      var heroMO = new MutationObserver(function () {
        if (heroVisual.classList.contains('visible')) {
          runHeroCounters();
          heroMO.disconnect();
        }
      });
      heroMO.observe(heroVisual, { attributes: true, attributeFilter: ['class'] });
      // Handle case where .visible was already added before this code ran
      if (heroVisual.classList.contains('visible')) { heroMO.disconnect(); runHeroCounters(); }
    } else {
      // Fallback for old browsers
      var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { runHeroCounters(); counterObserver.unobserve(entry.target); }
        });
      }, { threshold: 0.5 });
      counterObserver.observe(statsCard);
    }
  }

  // Portfolio stats band counters — animate .sbi-num[data-count] on scroll
  var statsBand    = document.querySelector('.stats-band');
  var sbTriggered  = false;
  if (statsBand && 'IntersectionObserver' in window) {
    var sbObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !sbTriggered) {
          sbTriggered = true;
          statsBand.querySelectorAll('.sbi-num[data-count]').forEach(function (el) {
            var target   = parseInt(el.dataset.count, 10);
            var original = el.textContent.trim();
            if (/[–—\-]/.test(original)) return; // skip ranges like "3–7"
            var suffix = original.replace(/^[\d,]+/, '');
            var dur    = prefersReducedMotion ? 0 : 1500;
            var t0     = performance.now();
            if (dur === 0) {
              el.textContent = (target >= 1000 ? Math.floor(target / 1000) + ',' + String(target % 1000).padStart(3, '0') : target) + suffix;
              return;
            }
            (function tick(now) {
              var p = Math.min((now - t0) / dur, 1);
              var v = Math.round((1 - Math.pow(1 - p, 3)) * target);
              el.textContent = (v >= 1000 ? Math.floor(v / 1000) + ',' + String(v % 1000).padStart(3, '0') : v) + suffix;
              if (p < 1) requestAnimationFrame(tick);
            })(t0);
          });
          sbObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    sbObserver.observe(statsBand);
  }

  /* ----------------------------------------------------------
     PAGE HERO STATS — counter animation (.phs-num[data-count])
  ---------------------------------------------------------- */
  var phsStats = document.getElementById('svcHeroStats');
  var phsTriggered = false;
  if (phsStats && 'IntersectionObserver' in window) {
    var phsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !phsTriggered) {
          phsTriggered = true;
          phsStats.querySelectorAll('.phs-num[data-count]').forEach(function (el) {
            var target = parseInt(el.dataset.count, 10);
            var suffix = el.dataset.suffix || '';
            var dur    = prefersReducedMotion ? 0 : 2400;
            var t0     = performance.now();
            if (dur === 0) {
              el.textContent = (target >= 1000 ? Math.floor(target / 1000) + ',' + String(target % 1000).padStart(3, '0') : target) + suffix;
              return;
            }
            (function tick(now) {
              var p = Math.min((now - t0) / dur, 1);
              var v = Math.round((1 - Math.pow(1 - p, 3)) * target);
              el.textContent = (v >= 1000 ? Math.floor(v / 1000) + ',' + String(v % 1000).padStart(3, '0') : v) + suffix;
              if (p < 1) requestAnimationFrame(tick);
            })(t0);
          });
          phsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    phsObserver.observe(phsStats);
  }

  /* ----------------------------------------------------------
     FAQ ACCORDION
  ---------------------------------------------------------- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item   = this.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');

      // Close all open items
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        // Keep 'hidden' attribute removed but max-height at 0 for CSS animation
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
        answer.removeAttribute('hidden');
      } else {
        answer.setAttribute('hidden', '');
      }
    });
  });

  /* ----------------------------------------------------------
     THEME TOGGLE — light / dark mode with localStorage
  ---------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');

  // Apply saved theme before first paint flicker
  if (localStorage.getItem('autoroy-theme') === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggle) themeToggle.setAttribute('aria-label', 'עבור למצב כהה');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      // Inline transition so the switch animates even if page-load inline style is set
      document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';

      var isLight = document.body.classList.toggle('light-mode');
      localStorage.setItem('autoroy-theme', isLight ? 'light' : 'dark');
      themeToggle.setAttribute('aria-label', isLight ? 'עבור למצב כהה' : 'עבור למצב בהיר');

      // Remove inline transition after switch completes
      setTimeout(function () { document.body.style.transition = ''; }, 500);
    });
  }

  /* ----------------------------------------------------------
     SCROLL INDICATOR — hide after first scroll
  ---------------------------------------------------------- */
  var scrollInd = document.getElementById('scrollIndicator');
  if (scrollInd) {
    var indHidden = false;
    window.addEventListener('scroll', function () {
      if (!indHidden && window.scrollY > 80) {
        indHidden = true;
        scrollInd.classList.add('hidden-ind');
      }
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     TOAST NOTIFICATION — appears after 40s, once per session
  ---------------------------------------------------------- */
  var toast     = document.getElementById('toastNotif');
  var toastClose = document.getElementById('toastClose');

  if (toast && toastClose && !sessionStorage.getItem('autoroy-toast-seen')) {
    var toastTimer = setTimeout(function () {
      toast.removeAttribute('hidden');
      sessionStorage.setItem('autoroy-toast-seen', '1');
    }, 40000);

    toastClose.addEventListener('click', function () {
      toast.classList.add('hiding');
      setTimeout(function () { toast.setAttribute('hidden', ''); }, 320);
    });

    // Also dismiss if user clicks the CTA inside the toast
    var toastCta = toast.querySelector('.toast-cta');
    if (toastCta) {
      toastCta.addEventListener('click', function () {
        setTimeout(function () { toast.setAttribute('hidden', ''); }, 800);
      });
    }
  }

  /* ----------------------------------------------------------
     SCROLL PROGRESS BAR
  ---------------------------------------------------------- */
  var progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    function updateProgress() {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = 'scaleX(' + (docH > 0 ? window.scrollY / docH : 0) + ')';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ----------------------------------------------------------
     STICKY CTA BAR — appears when hero leaves viewport
  ---------------------------------------------------------- */
  var stickyCta  = document.getElementById('stickyCta');
  var heroSect   = document.getElementById('hero');
  if (stickyCta && heroSect && 'IntersectionObserver' in window) {
    var stickyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var visible = !entry.isIntersecting;
        stickyCta.classList.toggle('visible', visible);
        stickyCta.setAttribute('aria-hidden', visible ? 'false' : 'true');
      });
    }, { threshold: 0.1 });
    stickyObs.observe(heroSect);
  }

  /* ----------------------------------------------------------
     WHATSAPP TOOLTIP — appears 3s after load, fades out
  ---------------------------------------------------------- */
  var waTooltip = document.getElementById('waTooltip');
  if (waTooltip && !prefersReducedMotion) {
    setTimeout(function () {
      waTooltip.classList.add('visible');
      setTimeout(function () { waTooltip.classList.remove('visible'); }, 4500);
    }, 7000);
  }

  /* ----------------------------------------------------------
     HERO PARTICLES — floating dots in hero background
  ---------------------------------------------------------- */
  if (!prefersReducedMotion) {
    var heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      var pColors = ['var(--primary)', 'var(--purple)', 'var(--cyan)'];
      for (var pi = 0; pi < 14; pi++) {
        var pt = document.createElement('div');
        pt.className = 'hero-particle';
        pt.style.cssText =
          'left:' + (Math.random() * 100) + '%;' +
          'top:' + (Math.random() * 100) + '%;' +
          'width:' + (Math.random() * 3 + 1.5) + 'px;' +
          'height:' + (Math.random() * 3 + 1.5) + 'px;' +
          'background:' + pColors[Math.floor(Math.random() * 3)] + ';' +
          'animation-duration:' + (Math.random() * 10 + 8) + 's;' +
          'animation-delay:-' + (Math.random() * 14) + 's;';
        heroBg.appendChild(pt);
      }
    }
  }

  /* ----------------------------------------------------------
     ACCESSIBILITY WIDGET
  ---------------------------------------------------------- */
  var a11yToggle = document.getElementById('a11yToggle');
  var a11yPanel  = document.getElementById('a11yPanel');
  var a11yWidget = document.getElementById('a11yWidget');
  var a11yOpen   = false;

  // Font size (4 steps: 14 / 16 / 18 / 20px)
  var fontSizes = [14, 16, 18, 20];
  var fontIdx   = parseInt(localStorage.getItem('autoroy-font') || '1', 10);
  if (fontIdx !== 1) document.documentElement.style.fontSize = fontSizes[fontIdx] + 'px';

  function setFont(idx) {
    fontIdx = Math.max(0, Math.min(fontSizes.length - 1, idx));
    document.documentElement.style.fontSize = fontSizes[fontIdx] + 'px';
    localStorage.setItem('autoroy-font', fontIdx);
  }
  var fDec = document.getElementById('fontDecrease');
  var fRes = document.getElementById('fontReset');
  var fInc = document.getElementById('fontIncrease');
  if (fDec) fDec.addEventListener('click', function () { setFont(fontIdx - 1); });
  if (fRes) fRes.addEventListener('click', function () { setFont(1); });
  if (fInc) fInc.addEventListener('click', function () { setFont(fontIdx + 1); });

  // High contrast
  var cToggle = document.getElementById('contrastToggle');
  var hiCon   = localStorage.getItem('autoroy-contrast') === '1';
  function applyContrast(on) {
    document.body.classList.toggle('high-contrast', on);
    if (cToggle) { cToggle.textContent = on ? 'פעיל' : 'כבוי'; cToggle.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    localStorage.setItem('autoroy-contrast', on ? '1' : '0');
  }
  applyContrast(hiCon);
  if (cToggle) cToggle.addEventListener('click', function () { hiCon = !hiCon; applyContrast(hiCon); });

  // Stop animations
  var aPause  = document.getElementById('animPauseToggle');
  var animOff = localStorage.getItem('autoroy-noanim') === '1';
  function applyAnimPause(on) {
    document.body.classList.toggle('no-animations', on);
    if (aPause) { aPause.textContent = on ? 'פעיל' : 'כבוי'; aPause.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    localStorage.setItem('autoroy-noanim', on ? '1' : '0');
  }
  applyAnimPause(animOff);
  if (aPause) aPause.addEventListener('click', function () { animOff = !animOff; applyAnimPause(animOff); });

  // Panel toggle
  if (a11yToggle && a11yPanel) {
    a11yToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      a11yOpen = !a11yOpen;
      if (a11yOpen) { a11yPanel.removeAttribute('hidden'); } else { a11yPanel.setAttribute('hidden', ''); }
      a11yToggle.setAttribute('aria-expanded', a11yOpen ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (a11yOpen && a11yWidget && !a11yWidget.contains(e.target)) {
        a11yPanel.setAttribute('hidden', ''); a11yToggle.setAttribute('aria-expanded', 'false'); a11yOpen = false;
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && a11yOpen) {
        a11yPanel.setAttribute('hidden', ''); a11yToggle.setAttribute('aria-expanded', 'false');
        a11yOpen = false; a11yToggle.focus();
      }
    });
  }

  /* ----------------------------------------------------------
     ACTIVE NAV LINK — highlight based on scroll position
  ---------------------------------------------------------- */
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNav() {
    let current = '';
    const scrollY = window.scrollY + (navbar ? navbar.offsetHeight : 80) + 60;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollY) {
        current = '#' + section.id;
      }
    });

    navAnchors.forEach(function (a) {
      a.style.color = a.getAttribute('href') === current ? 'var(--text)' : '';
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ----------------------------------------------------------
     EXIT INTENT POPUP
  ---------------------------------------------------------- */
  var exitPopup     = document.getElementById('exitPopup');
  var exitClose     = document.getElementById('exitPopupClose');
  var exitBtn       = document.getElementById('exitPopupBtn');
  var exitPhoneEl   = document.getElementById('exitPhone');
  var exitTriggered = false;

  function showExitPopup() {
    if (exitTriggered || sessionStorage.getItem('autoroy-exit-seen')) return;
    exitTriggered = true;
    sessionStorage.setItem('autoroy-exit-seen', '1');
    exitPopup.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function hideExitPopup() {
    exitPopup.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  // Desktop: mouse exits toward top of viewport
  document.addEventListener('mouseleave', function (e) {
    if (e.clientY < 20) showExitPopup();
  });

  // Mobile: fast upward scroll near top of page
  var exitLastY = 0;
  window.addEventListener('scroll', function () {
    var delta = exitLastY - window.scrollY;
    if (delta > 90 && window.scrollY < 400) showExitPopup();
    exitLastY = window.scrollY;
  }, { passive: true });

  if (exitClose) exitClose.addEventListener('click', hideExitPopup);

  // Click backdrop to close
  if (exitPopup) {
    exitPopup.addEventListener('click', function (e) {
      if (e.target === exitPopup) hideExitPopup();
    });
  }

  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && exitPopup && !exitPopup.hasAttribute('hidden')) hideExitPopup();
  });

  // Send to WhatsApp with phone from input
  if (exitBtn && exitPhoneEl) {
    exitBtn.addEventListener('click', function () {
      var phone = exitPhoneEl.value.trim();
      if (!phone) {
        exitPhoneEl.classList.add('error');
        exitPhoneEl.focus();
        exitPhoneEl.addEventListener('input', function () {
          exitPhoneEl.classList.remove('error');
        }, { once: true });
        return;
      }
      var msg = encodeURIComponent(
        'היי AutoRoy, ראיתי את האתר ואשמח לשיחת ייעוץ חינם של 15 דקות.\nמספרי: ' + phone
      );
      window.open('https://wa.me/972547222023?text=' + msg, '_blank', 'noopener,noreferrer');
      hideExitPopup();
    });
  }

  /* ----------------------------------------------------------
     SPECTACULAR — Cursor Spotlight
  ---------------------------------------------------------- */
  (function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var spotlight = document.createElement('div');
    spotlight.id = 'cursor-spotlight';
    document.body.appendChild(spotlight);
    var tx = -999, ty = -999, cx = -999, cy = -999, rafId;

    document.addEventListener('mousemove', function (e) {
      tx = e.clientX;
      ty = e.clientY;
      spotlight.classList.add('active');
      if (!rafId) rafId = requestAnimationFrame(tickSpotlight);
    });
    document.addEventListener('mouseleave', function () {
      spotlight.classList.remove('active');
    });

    function tickSpotlight() {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      spotlight.style.left = Math.round(cx) + 'px';
      spotlight.style.top  = Math.round(cy) + 'px';
      rafId = requestAnimationFrame(tickSpotlight);
    }
  })();

  /* ----------------------------------------------------------
     SPECTACULAR — Magnetic Buttons (desktop only)
  ---------------------------------------------------------- */
  (function () {
    if (window.innerWidth <= 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var btns = document.querySelectorAll('.btn-primary, .cta-btn, .hero-wa-btn');
    btns.forEach(function (btn) {
      btn.classList.add('btn-magnetic');
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width  / 2);
        var dy = e.clientY - (r.top  + r.height / 2);
        btn.style.transform = 'translate(' + (dx * 0.2) + 'px,' + (dy * 0.2) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  })();

  /* ----------------------------------------------------------
     SPECTACULAR — 3D Card Tilt on Mousemove
  ---------------------------------------------------------- */
  (function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth <= 768) return;
    var cards = document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .proc-card');
    cards.forEach(function (card) {
      var maxDeg = card.classList.contains('proc-card') ? 7 : 11;
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width  - 0.5;
        var py = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = 'perspective(750px) rotateY(' + (px * maxDeg) + 'deg) rotateX(' + (-py * maxDeg) + 'deg) translateZ(8px)';
        card.style.transition = 'transform 0.08s linear';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.transition = 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s ease, border-color 0.3s ease';
      });
    });
  })();

  /* ----------------------------------------------------------
     SPECTACULAR — Parallax Orbs on Scroll
  ---------------------------------------------------------- */
  (function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var orbs = document.querySelectorAll('.orb-1, .orb-2, .orb-3');
    if (!orbs.length) return;
    var ticking = false;
    function updateOrbs() {
      var sy = window.scrollY;
      orbs[0] && (orbs[0].style.transform = 'translateY(' + (sy * 0.14) + 'px)');
      orbs[1] && (orbs[1].style.transform = 'translateY(' + (-sy * 0.09) + 'px)');
      orbs[2] && (orbs[2].style.transform = 'translateY(' + (sy * 0.11) + 'px)');
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateOrbs);
        ticking = true;
      }
    }, { passive: true });
  })();

  /* ----------------------------------------------------------
     SPECTACULAR — Number Pop when Counter Completes
  ---------------------------------------------------------- */
  (function () {
    var counters = document.querySelectorAll('.ss-counter');
    if (!counters.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var mo = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        var el = m.target.nodeType === 3 ? m.target.parentElement : m.target;
        if (!el) return;
        el.classList.remove('num-pop-anim');
        void el.offsetWidth;
        el.classList.add('num-pop-anim');
        el.addEventListener('animationend', function () {
          el.classList.remove('num-pop-anim');
        }, { once: true });
      });
    });
    counters.forEach(function (c) {
      mo.observe(c, { characterData: true, childList: true, subtree: true });
    });
  })();

})();
