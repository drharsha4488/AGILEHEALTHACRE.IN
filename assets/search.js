/* AgileHealthcare search.js */
(function(){
var inp=document.querySelector("#search-drawer input[name='q']");
var timer;
if(!inp)return;
inp.addEventListener("input",function(){
  clearTimeout(timer);
  var q=inp.value.trim();
  var res=document.querySelector("#search-results");
  if(!res)return;
  if(q.length<2){res.innerHTML="";return;}
  timer=setTimeout(async function(){
    try{
      var r=await fetch("/search/suggest.json?q="+encodeURIComponent(q)+"&resources[type]=product&resources[limit]=6");
      var d=await r.json();
      var prods=(d.resources&&d.resources.results&&d.resources.results.products)||[];
      var fmt=function(c){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:0}).format(parseInt(c)/100);};
      if(!prods.length){res.innerHTML="<p style='color:var(--color-muted);padding:16px'>No results found</p>";return;}
      var html="";
      prods.forEach(function(p){html+="<a href='"+p.url+"' class='sri'><div class='sri-img' style='background-image:url("+(p.featured_image?p.featured_image.url:"")+")' ></div><div><div class='sri-title'>"+p.title+"</div>"+(p.price?"<div class='sri-price'>"+fmt(p.price)+"</div>":"")+"</div></a>";});
      res.innerHTML=html;
    }catch(e){console.error(e);}
  },300);
});
})();