/* AgileHealthcare theme.js */
(function() {
  'use strict';

  var ov = document.getElementById('drawer-overlay');

  function showOverlay() {
    if (ov) ov.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function hideOverlay() {
    if (ov) ov.classList.remove('open');
    document.body.style.overflow = '';
  }

  function closeAllDrawers() {
    document.querySelectorAll('.drawer').forEach(function(d) {
      d.classList.remove('open');
    });
    hideOverlay();
  }

  function openDrawer(id) {
    closeAllDrawers();
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.add('open');
    showOverlay();
    setTimeout(function() {
      var inp = el.querySelector('input:not([type=hidden])');
      if (inp) inp.focus();
    }, 350);
  }

  /* Overlay click closes drawers */
  if (ov) ov.addEventListener('click', closeAllDrawers);

  /* ESC key */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeAllDrawers();
  });

  /* Direct listeners on ALL open/close buttons — runs at DOM ready */
  function bindButtons() {
    /* Open buttons */
    document.querySelectorAll('[data-drawer-open]').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        openDrawer(btn.getAttribute('data-drawer-open'));
      });
    });

    /* Close buttons — direct listener, most reliable */
    document.querySelectorAll('[data-drawer-close]').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        closeAllDrawers();
      });
    });
  }

  /* Also handle dynamically added buttons via delegation (fallback) */
  document.addEventListener('click', function(e) {
    var closeBtn = e.target.closest('[data-drawer-close]');
    if (closeBtn) { closeAllDrawers(); return; }
    var openBtn = e.target.closest('[data-drawer-open]');
    if (openBtn) { openDrawer(openBtn.getAttribute('data-drawer-open')); }
  });

  /* Mega menu hover — desktop */
  document.querySelectorAll('.has-mega').forEach(function(item) {
    var timer;
    item.addEventListener('mouseenter', function() { clearTimeout(timer); item.classList.add('open'); });
    item.addEventListener('mouseleave', function() { timer = setTimeout(function() { item.classList.remove('open'); }, 150); });
  });

  /* Sticky header */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* Announcement bar dismiss */
  var annBar = document.getElementById('announcement-bar');
  var annDismiss = document.getElementById('ann-dismiss');
  if (annDismiss) {
    annDismiss.addEventListener('click', function() {
      if (annBar) annBar.style.display = 'none';
      sessionStorage.setItem('ann_dismissed', '1');
    });
  }
  if (annBar && sessionStorage.getItem('ann_dismissed')) annBar.style.display = 'none';

  /* Expose globally */
  window.AH = { openDrawer: openDrawer, closeAllDrawers: closeAllDrawers };

  /* Bind on DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindButtons);
  } else {
    bindButtons();
  }

})();
