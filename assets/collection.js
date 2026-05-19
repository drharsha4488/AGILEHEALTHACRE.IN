/* AgileHealthcare — collection.js */
(function(){
  'use strict';

  // ============ Filter form auto-submit ============
  function initFilters(){
    const form = document.querySelector('[data-filter-form]');
    if(!form) return;
    let t;
    form.addEventListener('change', (e)=>{
      if(e.target.matches('input[type=checkbox], input[type=radio]')){
        clearTimeout(t);
        t = setTimeout(()=>form.submit(), 300);
      }
    });
    form.addEventListener('submit', (e)=>{
      // strip empty values
      form.querySelectorAll('input[type=number]').forEach(i=>{
        if(!i.value) i.disabled = true;
      });
    });
  }

  // ============ View toggle ============
  function initViewToggle(){
    const grid = document.getElementById('product-grid');
    const btns = document.querySelectorAll('[data-view-btn]');
    if(!grid || !btns.length) return;
    const saved = localStorage.getItem('ah_view_mode') || 'grid';
    setView(saved);
    btns.forEach(b=>b.addEventListener('click', ()=>setView(b.dataset.viewBtn)));
    function setView(mode){
      grid.dataset.view = mode;
      btns.forEach(b=>b.classList.toggle('active', b.dataset.viewBtn === mode));
      localStorage.setItem('ah_view_mode', mode);
    }
  }

  // ============ Quick view modal ============
  function initQuickView(){
    document.querySelectorAll('[data-quick-view]').forEach(btn=>{
      btn.addEventListener('click', async (e)=>{
        e.preventDefault();
        const handle = btn.dataset.handle;
        const modal = document.getElementById('quick-view-modal');
        const content = document.getElementById('quick-view-content');
        if(!modal || !content) return;
        modal.classList.add('open');
        try {
          const r = await fetch('/products/' + handle + '.json');
          const data = await r.json();
          const p = data.product;
          const v = p.variants[0];
          const img = (p.images && p.images[0]) || '';
          content.innerHTML = `
            <div style="background:#f5f5f7;display:flex;align-items:center;justify-content:center;padding:24px">
              <img src="${img}" alt="${p.title}" style="max-width:100%;max-height:380px;object-fit:contain">
            </div>
            <div style="padding:32px;display:flex;flex-direction:column;gap:12px">
              <div style="font-size:11px;letter-spacing:.12em;color:#00D964;text-transform:uppercase;font-weight:700">${p.vendor||''}</div>
              <h2 style="margin:0;font-size:24px">${p.title}</h2>
              <div style="font-size:24px;font-weight:700;color:#fff">₹${parseFloat(v.price).toLocaleString('en-IN')}</div>
              <div style="color:#a1a1aa;font-size:14px;line-height:1.5;max-height:120px;overflow:auto">
                ${(p.body_html||'').replace(/<[^>]+>/g,' ').slice(0,260)}…
              </div>
              <form action="/cart/add" method="post" style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
                <input type="hidden" name="id" value="${v.id}">
                <button class="btn btn-primary btn-lg" type="submit">Add to Cart</button>
                <a href="/products/${p.handle}" class="btn btn-secondary">View Full Details</a>
              </form>
            </div>`;
        } catch(err){
          content.innerHTML = '<div style="padding:32px;text-align:center">Could not load product.</div>';
        }
      });
    });
  }

  // ============ Sort dropdown ============
  function initSort(){
    document.querySelectorAll('[data-sort-form] select').forEach(sel=>{
      sel.addEventListener('change', ()=>sel.form.submit());
    });
  }

  // ============ Mobile filter drawer ============
  function initMobileFilter(){
    const btn = document.getElementById('mobile-filter-btn');
    const sidebar = document.getElementById('collection-sidebar');
    if(!btn || !sidebar) return;
    function check(){
      if(window.innerWidth < 980){
        btn.style.display = 'inline-flex';
        sidebar.classList.add('mobile-hidden');
      } else {
        btn.style.display = 'none';
        sidebar.classList.remove('mobile-hidden','mobile-open');
      }
    }
    check();
    window.addEventListener('resize', check);
    btn.addEventListener('click', ()=>sidebar.classList.toggle('mobile-open'));
  }

  // ============ Comparison ============
  function initCompare(){
    const KEY = 'ah_compare';
    let list;
    try { list = JSON.parse(sessionStorage.getItem(KEY)||'[]'); } catch(e){ list = []; }
    const bar = document.getElementById('comparison-bar');
    const countEl = document.getElementById('compare-count');
    const thumbs = document.getElementById('compare-thumbs');

    function render(){
      if(!bar) return;
      if(!list.length){ bar.style.display='none'; return; }
      bar.style.display='block';
      countEl.textContent = list.length;
      thumbs.innerHTML = list.map(p =>
        `<div style="width:36px;height:36px;border-radius:6px;background:#fff;overflow:hidden;border:1px solid #333"><img src="${p.image}" alt="" style="width:100%;height:100%;object-fit:contain"></div>`
      ).join('');
    }

    document.querySelectorAll('[data-compare-toggle]').forEach(cb=>{
      const id = cb.dataset.productId;
      if(list.find(p=>p.id===id)) cb.checked = true;
      cb.addEventListener('change', ()=>{
        if(cb.checked){
          if(list.length >= 4){ cb.checked = false; if(window.ahToast) window.ahToast('Maximum 4 products'); return; }
          list.push({id, handle: cb.dataset.handle, title: cb.dataset.title, image: cb.dataset.image});
        } else {
          list = list.filter(p=>p.id!==id);
        }
        sessionStorage.setItem(KEY, JSON.stringify(list));
        render();
      });
    });

    const clearBtn = document.getElementById('compare-clear');
    if(clearBtn) clearBtn.addEventListener('click', ()=>{
      list = []; sessionStorage.removeItem(KEY);
      document.querySelectorAll('[data-compare-toggle]').forEach(cb=>cb.checked=false);
      render();
    });

    const compareNow = document.getElementById('compare-now');
    if(compareNow) compareNow.addEventListener('click', async ()=>{
      const modal = document.getElementById('compare-modal');
      const table = document.getElementById('compare-table');
      if(!modal || !table) return;
      modal.classList.add('open');
      table.innerHTML = '<div class="skeleton" style="height:240px"></div>';
      const data = await Promise.all(list.map(p =>
        fetch('/products/' + p.handle + '.json').then(r=>r.json())
      ));
      const rows = ['title','vendor','product_type'];
      let html = '<table style="width:100%;border-collapse:collapse"><tr>';
      html += '<th></th>' + data.map(d => `<th style="padding:12px;border-bottom:1px solid var(--border);text-align:left"><img src="${d.product.images[0]||''}" style="width:80px;height:80px;object-fit:contain;background:#f5f5f7;border-radius:6px"><br>${d.product.title}</th>`).join('');
      html += '</tr>';
      ['Vendor','Price','Type','SKU'].forEach((label,i)=>{
        const keys = ['vendor', null, 'product_type', null];
        html += `<tr><th style="padding:10px;text-align:left;font-size:12px;color:var(--text-3);text-transform:uppercase">${label}</th>`;
        html += data.map(d=>{
          const p = d.product;
          if(label==='Price') return `<td style="padding:10px;border-bottom:1px solid var(--border)">₹${p.variants[0].price}</td>`;
          if(label==='SKU') return `<td style="padding:10px;border-bottom:1px solid var(--border)">${p.variants[0].sku||'—'}</td>`;
          return `<td style="padding:10px;border-bottom:1px solid var(--border)">${p[keys[i]]||'—'}</td>`;
        }).join('');
        html += '</tr>';
      });
      html += '</table>';
      table.innerHTML = html;
    });

    render();
  }

  // ============ Add to cart from card ============
  function initCardAddToCart(){
    document.querySelectorAll('[data-card-add-to-cart]').forEach(btn=>{
      btn.addEventListener('click', async (e)=>{
        e.preventDefault();
        const id = btn.dataset.variantId;
        btn.disabled = true; btn.textContent = '…';
        try {
          await fetch('/cart/add.js', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ items: [{ id, quantity: 1 }] })
          });
          btn.textContent = '✓ Added';
          if(window.ahToast) window.ahToast('Added to cart');
          setTimeout(()=>{ btn.textContent = '+ Cart'; btn.disabled = false; }, 1500);
          // refresh cart count if header has it
          fetch('/cart.js').then(r=>r.json()).then(c=>{
            document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent = c.item_count);
          });
        } catch(err){
          btn.textContent = 'Error'; btn.disabled = false;
        }
      });
    });
  }

  // ============ Wishlist on cards ============
  function initWishlistCards(){
    const KEY = 'ah_wishlist';
    let list;
    try { list = JSON.parse(localStorage.getItem(KEY)||'[]'); } catch(e){ list = []; }
    document.querySelectorAll('[data-wishlist]').forEach(btn=>{
      const id = btn.dataset.productId;
      if(list.includes(id)) btn.classList.add('saved');
      btn.addEventListener('click', (e)=>{
        e.preventDefault(); e.stopPropagation();
        if(list.includes(id)){
          list = list.filter(x=>x!==id);
          btn.classList.remove('saved');
        } else {
          list.push(id);
          btn.classList.add('saved');
        }
        localStorage.setItem(KEY, JSON.stringify(list));
      });
    });
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    initFilters();
    initViewToggle();
    initQuickView();
    initSort();
    initMobileFilter();
    initCompare();
    initCardAddToCart();
    initWishlistCards();
  });
})();
