/*!
 * AutoRoy AI — Shared Components
 * Injects Navbar, Footer, and Floating WhatsApp into every page.
 * Place <div id="site-navbar"></div> and <div id="site-footer"></div>
 * in page HTML, then load this script before script.js.
 */
(function () {
  'use strict';

  /* ---------- Config ---------- */
  var WA_URL = 'https://wa.me/972547222023?text=%D7%94%D7%99%D7%99%20%D7%A8%D7%90%D7%99%D7%AA%D7%99%20%D7%90%D7%AA%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%A9%D7%9C%20AutoRoy%20%D7%95%D7%90%D7%A0%D7%99%20%D7%A8%D7%95%D7%A6%D7%94%20%D7%9C%D7%91%D7%93%D7%95%D7%A7%20%D7%90%D7%95%D7%98%D7%95%D7%9E%D7%A6%D7%99%D7%94%20%D7%9C%D7%A2%D7%A1%D7%A7%20%D7%A9%D7%9C%D7%99';

  /* ---------- Active-page detection ---------- */
  var page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

  function navItem(href, label) {
    var active = page === href.toLowerCase();
    return '<li><a href="' + href + '" class="nav-link' +
      (active ? ' nav-link-active' : '') +
      '" ' + (active ? 'aria-current="page"' : '') + '>' + label + '</a></li>';
  }

  /* ---------- Navbar HTML ---------- */
  var navHTML =
    '<div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>' +
    '<nav class="navbar" id="navbar" role="navigation" aria-label="ניווט ראשי">' +
      '<div class="container nav-container">' +
        '<a href="index.html" class="logo" aria-label="AutoRoy AI — דף הבית">AutoRoy <span>AI</span></a>' +
        '<ul class="nav-links" id="navLinks" role="list">' +
          navItem('services.html',  'שירותים')  +
          navItem('portfolio.html', 'העבודות שלנו') +
          navItem('pricing.html',   'תמחור')    +
          navItem('blog.html',      'בלוג')     +
          navItem('contact.html',   'צור קשר')  +
        '</ul>' +
        '<div class="nav-actions">' +
          '<button class="theme-toggle" id="themeToggle" aria-label="עבור למצב בהיר" title="החלף מצב תאורה">' +
            '<span class="tt-icon"></span>' +
          '</button>' +
          '<a href="contact.html" class="btn btn-nav">התחל עכשיו</a>' +
          '<button class="hamburger" id="hamburger" aria-label="פתח תפריט" aria-expanded="false" aria-controls="navLinks">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</nav>';

  /* ---------- Footer HTML ---------- */
  var WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

  var footerHTML =
    '<footer class="footer site-footer" role="contentinfo">' +
      '<div class="footer-top">' +
        '<div class="container footer-grid">' +

          '<div class="footer-brand">' +
            '<a href="index.html" class="logo footer-logo-link" aria-label="AutoRoy AI">AutoRoy <span>AI</span></a>' +
            '<p class="footer-tagline">מכניס סדר · חוסך זמן · לא שוכח כלום</p>' +
            '<p class="footer-desc">אוטומציות חכמות לעסקים קטנים שרוצים לעבוד יותר מסודר, מהר ומקצועי — בלי להוסיף כוח אדם.</p>' +
          '</div>' +

          '<div class="footer-col">' +
            '<h4 class="footer-col-title">ניווט</h4>' +
            '<ul class="footer-nav-list">' +
              '<li><a href="index.html">דף הבית</a></li>' +
              '<li><a href="services.html">שירותים</a></li>' +
              '<li><a href="portfolio.html">העבודות שלנו</a></li>' +
              '<li><a href="pricing.html">תמחור</a></li>' +
              '<li><a href="contact.html">צור קשר</a></li>' +
              '<li><a href="privacy.html">תקנון ופרטיות</a></li>' +
            '</ul>' +
          '</div>' +

          '<div class="footer-col">' +
            '<h4 class="footer-col-title">יצירת קשר</h4>' +
            '<ul class="footer-contact-list">' +
              '<li>' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.8.68H6.72a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.8 8.91a16 16 0 0 0 7 7l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' +
                '<a href="tel:+972547222023">054-722-2023</a>' +
              '</li>' +
              '<li>' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' +
                '<a href="mailto:autoroybiz@gmail.com">autoroybiz@gmail.com</a>' +
              '</li>' +
            '</ul>' +
            '<a href="' + WA_URL + '" class="footer-wa-btn" target="_blank" rel="noopener noreferrer">' +
              WA_SVG + 'שיחה בוואטסאפ' +
            '</a>' +
          '</div>' +

        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<div class="container footer-bottom-inner">' +
          '<p>© 2026 AutoRoy AI · כל הזכויות שמורות · <a href="privacy.html" style="color:inherit;opacity:.7;text-decoration:none;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=.7">תקנון ופרטיות</a></p>' +
          '<div class="footer-social" aria-label="רשתות חברתיות">' +
            '<a href="https://www.instagram.com/autoroyai?igsh=MTZqdzVxeWFubnNuZg%3D%3D&utm_source=qr" class="fsoc-link fsoc-ig" target="_blank" rel="noopener noreferrer" aria-label="AutoRoy AI באינסטגרם">' +
              '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>' +
            '</a>' +
            '<a href="https://www.facebook.com/share/1BWhzsc9ne/?mibextid=wwXIfr" class="fsoc-link fsoc-fb" target="_blank" rel="noopener noreferrer" aria-label="AutoRoy AI בפייסבוק">' +
              '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' +
            '</a>' +
            '<a href="https://www.linkedin.com/in/roy-aharonovich-6558a9305?utm_source=share_via&utm_content=profile&utm_medium=member_ios" class="fsoc-link fsoc-li" target="_blank" rel="noopener noreferrer" aria-label="רוי אהרונוביץ בלינקדאין">' +
              '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';

  /* ---------- Floating WhatsApp ---------- */
  var floatingWA =
    '<a href="' + WA_URL + '" class="floating-wa" target="_blank" rel="noopener noreferrer" aria-label="שלח הודעה בוואטסאפ">' +
      WA_SVG +
      '<span class="floating-wa-pulse" aria-hidden="true"></span>' +
      '<span class="wa-reply-badge" aria-hidden="true">⏱ עונה תוך 3 דק\'</span>' +
      '<span class="wa-tooltip" id="waTooltip" aria-hidden="true">התחילו שיחה עכשיו — ייעוץ חינם</span>' +
    '</a>';

  /* ---------- Accessibility Widget ---------- */
  var a11yWidget =
    '<div class="a11y-widget" id="a11yWidget">' +
      '<div class="a11y-panel" id="a11yPanel" hidden role="dialog" aria-label="הגדרות נגישות">' +
        '<div class="a11y-panel-header">הגדרות נגישות</div>' +
        '<div class="a11y-row">' +
          '<span class="a11y-row-label">גודל טקסט</span>' +
          '<div class="a11y-font-btns">' +
            '<button class="a11y-btn" id="fontDecrease" aria-label="הקטן טקסט">A−</button>' +
            '<button class="a11y-btn" id="fontReset" aria-label="אפס גודל">A</button>' +
            '<button class="a11y-btn" id="fontIncrease" aria-label="הגדל טקסט">A+</button>' +
          '</div>' +
        '</div>' +
        '<div class="a11y-row">' +
          '<span class="a11y-row-label">ניגודיות גבוהה</span>' +
          '<button class="a11y-btn a11y-toggle" id="contrastToggle" aria-pressed="false">כבוי</button>' +
        '</div>' +
        '<div class="a11y-row">' +
          '<span class="a11y-row-label">עצור אנימציות</span>' +
          '<button class="a11y-btn a11y-toggle" id="animPauseToggle" aria-pressed="false">כבוי</button>' +
        '</div>' +
      '</div>' +
      '<button class="a11y-main-btn" id="a11yToggle" aria-label="הגדרות נגישות" aria-expanded="false" aria-controls="a11yPanel">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
          '<circle cx="12" cy="4" r="2"/>' +
          '<path d="M12 7c-2.7 0-4.8 1.6-5.7 3.9L5 14h2.5l1-2.5C9 10.6 10.4 9.5 12 9.5s3 1.1 3.5 2l1 2.5H19l-1.3-3.1C16.8 8.6 14.7 7 12 7z"/>' +
          '<path d="M9 14.5l-1 5.5h2l.5-3h3l.5 3h2l-1-5.5H9z"/>' +
        '</svg>' +
      '</button>' +
    '</div>';

  /* ---------- Inject ---------- */
  function inject() {
    var navEl = document.getElementById('site-navbar');
    if (navEl) navEl.innerHTML = navHTML;

    var footerEl = document.getElementById('site-footer');
    if (footerEl) footerEl.innerHTML = footerHTML;

    var waEl = document.getElementById('site-floating-wa');
    if (waEl) waEl.innerHTML = floatingWA;

    /* Inject a11y widget once (index.html may have it in-page already) */
    if (!document.getElementById('a11yWidget')) {
      var a11yEl = document.createElement('div');
      a11yEl.innerHTML = a11yWidget;
      document.body.appendChild(a11yEl.firstChild);
    }
  }

  /* Elements above the script tag are always in DOM even before DOMContentLoaded */
  if (document.getElementById('site-navbar')) {
    inject();
  } else {
    document.addEventListener('DOMContentLoaded', inject);
  }

  /* ---------- Canvas favicon (cross-browser) ---------- */
  (function () {
    try {
      var c = document.createElement('canvas');
      c.width = 32; c.height = 32;
      var ctx = c.getContext('2d');
      var g = ctx.createLinearGradient(0, 0, 32, 32);
      g.addColorStop(0, '#7c3aed');
      g.addColorStop(1, '#0891b2');
      ctx.fillStyle = g;
      /* rounded rect without roundRect() for max mobile compat */
      var r = 6;
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(32 - r, 0);
      ctx.quadraticCurveTo(32, 0, 32, r);
      ctx.lineTo(32, 32 - r);
      ctx.quadraticCurveTo(32, 32, 32 - r, 32);
      ctx.lineTo(r, 32);
      ctx.quadraticCurveTo(0, 32, 0, 32 - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.beginPath();
      ctx.moveTo(19, 3); ctx.lineTo(9, 18); ctx.lineTo(17, 18);
      ctx.lineTo(13, 29); ctx.lineTo(23, 13); ctx.lineTo(15, 13);
      ctx.closePath();
      ctx.fill();
      var link = document.querySelector('link[rel="icon"]') || document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = c.toDataURL('image/png');
      document.head.appendChild(link);
    } catch (e) {}
  })();
})();
