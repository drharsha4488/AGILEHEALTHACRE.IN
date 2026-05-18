/* AgileHealthcare quick-order.js */
(function(){
var form=document.querySelector("#quick-order-form");
if(!form)return;
var fmt=function(c){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:0}).format(c/100);};
form.addEventListener("input",function(e){
  if(!e.target.matches("[data-variant-qty]"))return;
  var total=0;
  form.querySelectorAll("[data-variant-qty]").forEach(function(i){
    var qty=parseInt(i.value)||0; var price=parseInt(i.dataset.price)||0;
    var lt=i.closest("tr")&&i.closest("tr").querySelector("[data-line-total]");
    if(lt)lt.textContent=qty>0?fmt(qty*price):"--";
    total+=qty*price;
  });
  var tel=document.querySelector("#qo-total");
  if(tel)tel.textContent=fmt(total);
});
form.addEventListener("submit",async function(e){
  e.preventDefault();
  var items=[];
  form.querySelectorAll("[data-variant-qty]").forEach(function(i){var q=parseInt(i.value)||0;if(q>0)items.push({id:i.dataset.variantId,quantity:q});});
  if(!items.length)return;
  var btn=form.querySelector("[data-quick-submit]");
  if(btn){btn.disabled=true;btn.textContent="Adding...";}
  try{
    for(var i=0;i<items.length;i++){await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify(items[i])});}
    if(window.AH_Cart)await window.AH_Cart.refresh();
    if(window.AH)window.AH.openDrawer("cart-drawer");
    form.querySelectorAll("[data-variant-qty]").forEach(function(i){i.value="";});
  }catch(err){console.error(err);}
  finally{if(btn){btn.disabled=false;btn.textContent="Add All to Cart";}}
});
})();