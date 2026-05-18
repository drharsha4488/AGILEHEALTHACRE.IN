/* AgileHealthcare — theme.js */
(function() {
  'use strict';

  // Utility
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

  // Overlay
  const overlay = () => $('#modal-overlay');
  function openOverlay() { overlay()?.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function closeOverlay() { overlay()?.classList.remove('active'); document.body.style.overflow = ''; }

  // Drawer system
  function openDrawer(id) {
    closeAllDrawers();
    const el = $(`#${id}`);
    if (el) { el.classList.add('open'); openOverlay(); }
  }
  function closeAllDrawers() {
    $$('.drawer').forEach(d => d.classList.remove('open'));
    closeOverlay();
  }

  // Overlay click closes drawers
  on(overlay(), 'click', closeAllDrawers);

  // Close buttons
  on(document, 'click', e => {
    if (e.target.closest('[data-drawer-close]')) closeAllDrawers();
    if (e.target.closest('[data-drawer-open]')) openDrawer(e.target.closest('[data-drawer-open]').dataset.drawerOpen);
  });

  // Escape key
  on(document, 'keydown', e => { if (e.key === 'Escape') closeAllDrawers(); });

  // Mobile menu toggle
  const mobileToggle = $('#mobile-menu-toggle');
  const mobileMenu = $('#mobile-menu');
  on(mobileToggle, 'click', () => {
    const open = mobileMenu?.classList.toggle('open');
    mobileToggle?.setAttribute('aria-expanded', open);
  });

  // Mega menu hover — desktop
  $$('.mega-menu-parent').forEach(item => {
    let timer;
    item.addEventListener('mouseenter', () => { clearTimeout(timer); item.classList.add('open'); });
    item.addEventListener('mouseleave', () => { timer = setTimeout(() => item.classList.remove('open'), 150); });
  });

  // Sticky header shrink
  const header = $('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // Announcement bar dismiss
  const annBar = $('#announcement-bar');
  on($('#ann-dismiss'), 'click', () => {
    annBar?.classList.add('hidden');
    sessionStorage.setItem('ann_dismissed', '1');
  });
  if (sessionStorage.getItem('ann_dismissed')) annBar?.classList.add('hidden');

  // Expose globally
  window.AH = { openDrawer, closeAllDrawers, openOverlay, closeOverlay };
})();
