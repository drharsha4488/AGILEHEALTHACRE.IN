/* AgileHealthcare theme.js — UI only, drawers handled by theme.liquid inline script */
(function() {
  'use strict';

  /* Mega menu hover — desktop */
  document.querySelectorAll('.has-mega').forEach(function(item) {
    var t;
    item.addEventListener('mouseenter', function() { clearTimeout(t); item.classList.add('open'); });
    item.addEventListener('mouseleave', function() { t = setTimeout(function() { item.classList.remove('open'); }, 150); });
  });

  /* Sticky header shrink on scroll */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* Announcement bar dismiss */
  var annDismiss = document.getElementById('ann-dismiss');
  if (annDismiss) {
    annDismiss.addEventListener('click', function() {
      var bar = document.getElementById('announcement-bar');
      if (bar) bar.style.display = 'none';
      try { sessionStorage.setItem('ann_dismissed', '1'); } catch(e) {}
    });
    try {
      if (sessionStorage.getItem('ann_dismissed')) {
        var bar = document.getElementById('announcement-bar');
        if (bar) bar.style.display = 'none';
      }
    } catch(e) {}
  }

})();
