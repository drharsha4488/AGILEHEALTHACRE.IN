/* AgileHealthcare cart.js - AJAX */
(function(){
var fmt=function(c){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:0}).format(c/100);};
window.AH_Cart={
  get:async function(){var r=await fetch("/cart.js",{headers:{"X-Requested-With":"XMLHttpRequest"}});return r.json();},
  change:async function(key,qty){var r=await fetch("/cart/change.js",{method:"POST",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify({id:key,quantity:qty})});return r.json();},
  refresh:async function(){var c=await this.get();this.updateCount(c.item_count);this.renderDrawer(c);},
  updateCount:function(n){document.querySelectorAll("[data-cart-count]").forEach(function(el){el.textContent=n;el.style.display=n===0?"none":"flex";});},
  renderDrawer:function(cart){
    var body=document.querySelector("#cart-drawer .drawer-body");
    var foot=document.querySelector("#cart-drawer .drawer-footer");
    if(!body)return;
    if(cart.item_count===0){body.innerHTML="<div style='text-align:center;padding:60px 20px'><p style='color:var(--color-muted);margin-bottom:24px'>Your cart is empty</p><a href='/collections/all' class='btn btn-primary'>Browse Catalog</a></div>";if(foot)foot.innerHTML="";return;}
    var html="";
    cart.items.forEach(function(item){
      html+="<div class='dci' data-key='"+item.key+"'><div class='dci-img' style='background-image:url("+(item.featured_image?item.featured_image.url:"")+")' ></div><div class='dci-info'><a class='dci-title' href='"+item.url+"'>"+item.product_title+"</a>";
      if(item.variant_title!=="Default Title")html+="<div class='dci-var'>"+item.variant_title+"</div>";
      html+="<div class='dci-price'>"+fmt(item.line_price)+"</div><div class='dci-actions'><div class='dci-qty'><button data-dqty='minus' data-key='"+item.key+"' data-cur='"+item.quantity+"'>-</button><span>"+item.quantity+"</span><button data-dqty='plus' data-key='"+item.key+"' data-cur='"+item.quantity+"'>+</button></div><button class='dci-rm' data-remove='"+item.key+"'>Remove</button></div></div></div>";
    });
    body.innerHTML=html;
    if(foot)foot.innerHTML="<div class='dci-sub'><span>Subtotal</span><strong>"+fmt(cart.total_price)+"</strong></div><p style='font-size:12px;color:var(--color-muted);margin:8px 0 14px'>GST and shipping at checkout</p><a href='/checkout' class='btn btn-primary btn-full btn-lg'>Checkout</a><a href='/cart' class='btn btn-ghost btn-full' style='margin-top:8px'>View Cart</a>";
  }
};
document.addEventListener("click",async function(e){
  var rm=e.target.closest("[data-remove]");
  var qb=e.target.closest("[data-dqty]");
  if(rm){await window.AH_Cart.change(rm.dataset.remove,0);await window.AH_Cart.refresh();}
  else if(qb){var cur=parseInt(qb.dataset.cur)||1;var nq=qb.dataset.dqty==="plus"?cur+1:Math.max(0,cur-1);await window.AH_Cart.change(qb.dataset.key,nq);await window.AH_Cart.refresh();}
});
window.AH_Cart.get().then(function(c){window.AH_Cart.updateCount(c.item_count);});
})();