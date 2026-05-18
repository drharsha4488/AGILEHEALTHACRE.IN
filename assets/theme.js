// AgileHealthCare Theme JS
document.addEventListener("DOMContentLoaded", function() {
  // Mobile hamburger menu
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function() {
      navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
      navMenu.style.flexDirection = "column";
      navMenu.style.position = "absolute";
      navMenu.style.top = "70px";
      navMenu.style.left = "0";
      navMenu.style.right = "0";
      navMenu.style.background = "#0057A8";
      navMenu.style.padding = "20px";
    });
  }
});