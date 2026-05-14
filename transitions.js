/*!
 * AutoRoy AI — Page Transitions
 * Smooth curtain fade between pages
 */
(function () {
  'use strict';

  /* Create curtain overlay */
  var curtain = document.createElement('div');
  curtain.id = 'page-curtain';
  curtain.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(curtain, document.body.firstChild);

  /* Reveal on page enter — double RAF ensures first paint has happened */
  window.addEventListener('DOMContentLoaded', function () {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        curtain.classList.add('curtain-exit');
      });
    });
  });

  /* Intercept internal link clicks for smooth exit */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href) return;
    if (href.charAt(0) === '#') return;                              // anchor
    if (/^(https?:|mailto:|tel:|whatsapp:|wa\.)/i.test(href)) return; // external
    if (link.target === '_blank') return;                            // new tab
    if (link.hasAttribute('download')) return;                       // download

    e.preventDefault();

    curtain.classList.remove('curtain-exit');
    curtain.classList.add('curtain-enter');

    setTimeout(function () {
      window.location.href = href;
    }, 360);
  }, false);
})();
