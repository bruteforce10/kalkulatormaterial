// side bar
const menuToggle = document.querySelector("#toggleKalkulator");
const nav = document.querySelector("#sideBar ul");
const navbar = document.querySelector("#navbar");
const menuToggleMobile = document.querySelector("#toggleKalkulatorMobile");

menuToggleMobile.addEventListener("click", function () {
  nav.classList.toggle("slide");
});

menuToggle.addEventListener("click", function () {
  nav.classList.toggle("slide");
});

document.addEventListener("click", function (e) {
  if (!menuToggle.contains(e.target) && !navbar.contains(e.target)) {
    nav.classList.remove("slide");
  }
});

// penutup sidebar
