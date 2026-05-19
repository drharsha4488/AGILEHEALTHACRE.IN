/* AgileHealthcare — product-page.js */
(function(){
  'use strict';

  // ============ Image gallery + thumbs ============
  function initGallery(){
    const thumbs = document.querySelectorAll('[data-gallery-thumb]');
    const mainImg = document.querySelector('[data-gallery-main-img]');
    const dots = document.querySelectorAll('[data-gallery-dot]');
    if(!mainImg) return;

    function activate(idx){
      thumbs.forEach((t,i)=>t.classList.toggle('active', i===idx));
      dots.forEach((d,i)=>d.classList.toggle('active', i===idx));
      const t = thumbs[idx];
      if(t){
        const src = t.dataset.fullsrc || t.querySelector('img')?.src;
        if(src) mainImg.src = src;
      }
    }
    thumbs.forEach((t,i)=>t.addEventListener('click', ()=>activate(i)));
  }

  // ============ Zoom magnifier ============
  function initZoom(){
    const container = document.querySelector('[data-zoom-container]');
    if(!container) return;
    const img = container.querySelector('.zoom-main, [data-gallery-main-img]');
    const lens = container.querySelector('.zoom-lens');
    const result = container.querySelector('.zoom-result');
    if(!img || !lens || !result) return;

    function moveLens(e){
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const lensSize = lens.offsetWidth;
      let lx = x - lensSize/2, ly = y - lensSize/2;
      lx = Math.max(0, Math.min(lx, rect.width - lensSize));
      ly = Math.max(0, Math.min(ly, rect.height - lensSize));
      lens.style.left = lx + 'px';
      lens.style.top = ly + 'px';
      const cx = result.offsetWidth / lensSize;
      const cy = result.offsetHeight / lensSize;
      result.style.backgroundImage = `url('${img.src}')`;
      result.style.backgroundSize = (rect.width * cx) + 'px ' + (rect.height * cy) + 'px';
      result.style.backgroundPosition = `-${lx*cx}px -${ly*cy}px`;
    }
    container.addEventListener('mousemove', moveLens);
  }

  // ============ Sticky cart bar ============
  function initStickyCart(){
    const target = document.querySelector('[data-add-to-cart]');
    const bar = document.querySelector('.sticky-cart-bar');
    if(!target || !bar) return;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        bar.classList.toggle('visible', !e.isIntersecting);
      });
    }, {threshold: 0});
    io.observe(target);
    // Sticky bar Add to Cart -> click main
    const stickyBtn = bar.querySelector('[data-sticky-add]');
    if(stickyBtn){
      stickyBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        target.click();
      });
    }
  }

  // ============ Scroll-spy tabs ============
  function initScrollSpy(){
    const links = document.querySelectorAll('.product-tabs-sticky-nav a[href^="#"]');
    if(!links.length) return;
    const sections = Array.from(links).map(l=>document.querySelector(l.getAttribute('href'))).filter(Boolean);

    links.forEach(l=>{
      l.addEventListener('click', (e)=>{
        e.preventDefault();
        const id = l.getAttribute('href');
        const el = document.querySelector(id);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      });
    });

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          links.forEach(l=>l.classList.toggle('active', l.getAttribute('href') === '#'+e.target.id));
        }
      });
    }, {rootMargin:'-30% 0px -60% 0px'});
    sections.forEach(s=>io.observe(s));
  }

  // ============ Wishlist ============
  function initWishlist(){
    const KEY = 'ah_wishlist';
    function read(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}}
    function write(arr){localStorage.setItem(KEY, JSON.stringify(arr))}
    document.querySelectorAll('[data-wishlist]').forEach(btn=>{
      const id = btn.dataset.productId;
      if(read().includes(id)) btn.classList.add('saved');
      btn.addEventListener('click', (e)=>{
        e.preventDefault();
        let list = read();
        if(list.includes(id)){
          list = list.filter(x=>x!==id);
          btn.classList.remove('saved');
          toast('Removed from wishlist');
        } else {
          list.push(id);
          btn.classList.add('saved');
          toast('Added to wishlist');
        }
        write(list);
      });
    });
  }

  // ============ Share ============
  function initShare(){
    document.querySelectorAll('[data-share]').forEach(btn=>{
      btn.addEventListener('click', async (e)=>{
        e.preventDefault();
        const type = btn.dataset.share;
        const url = window.location.href;
        const title = document.title;
        if(type === 'copy'){
          try { await navigator.clipboard.writeText(url); toast('Link copied!'); }
          catch(err){ toast('Could not copy'); }
        } else if(type === 'native' && navigator.share){
          try { await navigator.share({title, url}); } catch(e){}
        } else if(type === 'whatsapp'){
          window.open('https://wa.me/?text=' + encodeURIComponent(title + ' ' + url), '_blank');
        } else if(type === 'email'){
          window.location.href = 'mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(url);
        } else if(type === 'linkedin'){
          window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url), '_blank');
        }
      });
    });
  }

  // ============ Modal open/close ============
  function initModals(){
    document.querySelectorAll('[data-open-modal]').forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        e.preventDefault();
        const id = btn.dataset.openModal;
        const modal = document.getElementById(id) || document.querySelector('[data-modal="'+id+'"]');
        if(modal) modal.classList.add('open');
      });
    });
    document.querySelectorAll('.modal-overlay').forEach(overlay=>{
      overlay.addEventListener('click', (e)=>{
        if(e.target === overlay) overlay.classList.remove('open');
      });
      overlay.querySelectorAll('[data-close-modal], .modal-close').forEach(c=>{
        c.addEventListener('click', ()=>overlay.classList.remove('open'));
      });
    });
  }

  // ============ Recently viewed ============
  function pushRecentlyViewed(){
    const wrap = document.querySelector('.product-page-wrap');
    if(!wrap) return;
    const handle = wrap.dataset.productHandle;
    if(!handle) return;
    const KEY = 'ah_recently_viewed';
    let list;
    try { list = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){ list = []; }
    list = list.filter(h => h !== handle);
    list.unshift(handle);
    if(list.length > 12) list = list.slice(0,12);
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  // ============ Related products carousel ============
  function initCarousel(){
    document.querySelectorAll('.carousel').forEach(car=>{
      const track = car.querySelector('.carousel-track');
      const prev = car.querySelector('.carousel-btn.prev');
      const next = car.querySelector('.carousel-btn.next');
      if(!track) return;
      const scrollBy = () => track.clientWidth * 0.8;
      if(prev) prev.addEventListener('click', ()=>track.scrollBy({left:-scrollBy(), behavior:'smooth'}));
      if(next) next.addEventListener('click', ()=>track.scrollBy({left:scrollBy(), behavior:'smooth'}));
    });
  }

  // ============ Quantity inputs ============
  function initQty(){
    document.querySelectorAll('.qty-control').forEach(qc=>{
      const input = qc.querySelector('input');
      const dec = qc.querySelector('[data-qty-dec]');
      const inc = qc.querySelector('[data-qty-inc]');
      if(!input) return;
      function update(){
        const v = parseInt(input.value,10) || 1;
        const min = parseInt(input.min || '1', 10);
        const max = input.max ? parseInt(input.max,10) : Infinity;
        input.value = Math.max(min, Math.min(max, v));
        input.dispatchEvent(new Event('change', {bubbles:true}));
      }
      if(dec) dec.addEventListener('click', ()=>{input.value = (parseInt(input.value,10)||1)-1; update();});
      if(inc) inc.addEventListener('click', ()=>{input.value = (parseInt(input.value,10)||1)+1; update();});
      input.addEventListener('change', update);
    });
  }

  // ============ Volume pricing highlight ============
  function initVolumePricing(){
    const table = document.querySelector('.volume-pricing-table');
    const qtyInput = document.querySelector('[data-product-qty]');
    if(!table || !qtyInput) return;
    function highlight(){
      const q = parseInt(qtyInput.value, 10) || 1;
      table.querySelectorAll('tr[data-min-qty]').forEach(row=>{
        const min = parseInt(row.dataset.minQty,10);
        const max = parseInt(row.dataset.maxQty || '999999',10);
        row.classList.toggle('active', q >= min && q <= max);
      });
    }
    qtyInput.addEventListener('change', highlight);
    qtyInput.addEventListener('input', highlight);
    highlight();
  }

  // ============ Toast ============
  function toast(msg){
    let t = document.querySelector('.toast');
    if(!t){
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._tm);
    t._tm = setTimeout(()=>t.classList.remove('show'), 2400);
  }
  window.ahToast = toast;

  // ============ Variant swatch UI ============
  function initVariantSwatches(){
    document.querySelectorAll('[data-option-group]').forEach(group=>{
      const btns = group.querySelectorAll('[data-option-btn]');
      const label = group.querySelector('.selected-value');
      btns.forEach(btn=>{
        btn.addEventListener('click', (e)=>{
          e.preventDefault();
          btns.forEach(b=>b.classList.remove('selected'));
          btn.classList.add('selected');
          if(label) label.textContent = btn.dataset.value || btn.textContent.trim();
          // Trigger native variant change for product-form.js
          const radio = document.querySelector(`input[name="options[${group.dataset.optionGroup}]"][value="${btn.dataset.value}"]`);
          if(radio){ radio.checked = true; radio.dispatchEvent(new Event('change', {bubbles:true})); }
        });
      });
    });
  }

  // Init all
  document.addEventListener('DOMContentLoaded', ()=>{
    initGallery();
    initZoom();
    initStickyCart();
    initScrollSpy();
    initWishlist();
    initShare();
    initModals();
    pushRecentlyViewed();
    initCarousel();
    initQty();
    initVolumePricing();
    initVariantSwatches();
  });
})();
