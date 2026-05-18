/* AgileHealthcare product-form.js */
(function(){
  class ProductForm {
    constructor(form){
      this.form=form;
      this.addBtn=form.querySelector("[data-add-to-cart]");
      this.init();
    }
    init(){
      this.form.addEventListener("submit",e=>this.handleSubmit(e));
      document.querySelectorAll("[data-option-btn]").forEach(btn=>{
        btn.addEventListener("click",()=>{
          btn.closest("[data-option-group]")?.querySelectorAll("[data-option-btn]").forEach(b=>b.classList.remove("selected"));
          btn.classList.add("selected");
        });
      });
    }
    async handleSubmit(e){
      e.preventDefault();
      const id=this.form.querySelector("[name=id]")?.value;
      const qty=parseInt(this.form.querySelector("[name=quantity]")?.value||1);
      if(!id)return;
      this.setLoading(true);
      try{
        const r=await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify({id,quantity:qty})});
        if(!r.ok)throw new Error("Add failed");
        await window.AH_Cart?.refresh();
        window.AH?.openDrawer("cart-drawer");
      }catch(err){console.error(err);}finally{this.setLoading(false);}
    }
    setLoading(on){
      if(!this.addBtn)return;
      this.addBtn.disabled=on;
      if(on){this.addBtn.dataset.orig=this.addBtn.textContent;this.addBtn.innerHTML="<span class=spinner></span>";}
      else{this.addBtn.textContent=this.addBtn.dataset.orig||"Add to Cart";}
    }
  }
  document.querySelectorAll("[data-product-form]").forEach(f=>new ProductForm(f));
  document.addEventListener("click",e=>{
    const b=e.target.closest("[data-qty-btn]");
    if(!b)return;
    const inp=b.closest("[data-qty-wrap]")?.querySelector("input[name=quantity]");
    if(!inp)return;
    const v=parseInt(inp.value)||1;
    inp.value=b.dataset.qtyBtn==="plus"?Math.min(99,v+1):Math.max(1,v-1);
  });
})();