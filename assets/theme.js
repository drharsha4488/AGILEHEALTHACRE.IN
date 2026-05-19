/* AgileHealthcare theme.js */
(function() {
  'use strict';

  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => [...(el || document).querySelectorAll(s)];

  /* ── Overlay ── */
  const ov = document.getElementById('drawer-overlay');
  function showOverlay() {
    if (ov) { ov.classList.add('open'); }
    document.body.style.overflow = 'hidden';
  }
  function hideOverlay() {
    if (ov) { ov.classList.remove('open'); }
    document.body.style.overflow = '';
  }

  /* ── Drawers ── */
  function openDrawer(id) {
    closeAllDrawers();
    var el = document.getElementById(id);
    if (el) {
      el.classList.add('open');
      showOverlay();
      // focus first input inside drawer
      setTimeout(function() {
        var inp = el.querySelector('input');
        if (inp) inp.focus();
      }, 350);
    }
  }

  function closeAllDrawers() {
    $$('.drawer').forEach(function(d) { d.classList.remove('open'); });
    hideOverlay();
  }

  /* ── Event delegation ── */
  document.addEventListener('click', function(e) {
    var openBtn = e.target.closest('[data-drawer-open]');
    var closeBtn = e.target.closest('[data-drawer-close]');
    if (openBtn) { e.preventDefault(); openDrawer(openBtn.dataset.drawerOpen); }
    else if (closeBtn) { closeAllDrawers(); }
  });

  if (ov) ov.addEventListener('click', closeAllDrawers);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeAllDrawers();
  });

  /* ── Mega menu (desktop hover) ── */
  $$('.has-mega').forEach(function(item) {
    var timer;
    item.addEventListener('mouseenter', function() { clearTimeout(timer); item.classList.add('open'); });
    item.addEventListener('mouseleave', function() { timer = setTimeout(function() { item.classList.remove('open'); }, 150); });
  });

  /* ── Sticky header ── */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ── Announcement bar dismiss ── */
  var annBar = document.getElementById('announcement-bar');
  var annDismiss = document.getElementById('ann-dismiss');
  if (annDismiss) {
    annDismiss.addEventListener('click', function() {
      if (annBar) annBar.style.display = 'none';
      sessionStorage.setItem('ann_dismissed', '1');
    });
  }
  if (annBar && sessionStorage.getItem('ann_dismissed')) annBar.style.display = 'none';

  /* ── Expose globally ── */
  window.AH = { openDrawer: openDrawer, closeAllDrawers: closeAllDrawers };
})();
