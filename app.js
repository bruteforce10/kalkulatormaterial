// Nav Sipilku
window.onscroll = function () {
  const navbar = document.querySelector("#navbar");
  if (this.scrollY === 0) {
    navbar.style.backgroundColor = "transparent";
  } else {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  }
};

// button instagram

// Form Suggestion
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwllSO_EsueWeOax560Jd-2W7btpV6icixA1_Co43Z68i0RzFgDeCzvfHaNZFeidEU/exec";
const form = document.forms["suggestion"];
const btnKirim = document.querySelector(".btn-kirim");
const btnLoading = document.querySelector(".btn-loading");
const myAlert = document.querySelector(".my-alert");
const inputForm = document.querySelectorAll(".input-form");
let validation = true;

document.addEventListener("DOMContentLoaded", () => {
  for (const input of inputForm) {
    input.addEventListener("click", function () {
      if (input.classList.contains("is-invalid")) {
        input.classList.remove("is-invalid");
      }
    });
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  inputForm.forEach((input) => {
    if (input.value == "") {
      input.classList.add("is-invalid");
      validation = false;
    } else {
      validation = true;
    }
  });

  if (validation) {
    btnKirim.classList.toggle("d-none");
    btnLoading.classList.toggle("d-none");
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        myAlert.classList.toggle("d-none");
        form.reset();
        console.log("Success!", response);
        btnKirim.classList.toggle("d-none");
        btnLoading.classList.toggle("d-none");
      })
      .catch((error) => console.error("Error!", error.message));
  }
});

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

const tombolPekerjaan = document.querySelector("#tombolPekerjaanLainnya");
const iconPekerjaan = document.querySelector("#tombolPekerjaanLainnya i");

let isIconUp = true;

tombolPekerjaan.addEventListener("click", function () {
  if (isIconUp) {
    iconPekerjaan.classList.remove("fa-arrow-down");
    iconPekerjaan.classList.add("fa-arrow-up");
    isIconUp = false;
  } else {
    iconPekerjaan.classList.remove("fa-arrow-up");
    iconPekerjaan.classList.add("fa-arrow-down");
    isIconUp = true;
  }
});

// Jquery Promosi
$(document).ready(function () {
  const sectionAbout = $("#about").offset().top;
  const sectionSuggestion = $("#suggestion").offset().top;

  $(".navbar-nav .nav-link").click(function (e) {
    e.preventDefault();

    if (e.target.getAttribute("href") == "#about") {
      $("html").animate({ scrollTop: sectionAbout - 170 }, 300);
    } else {
      $("html").animate({ scrollTop: sectionSuggestion - 140 }, 300);
    }
  });

  $("#header button").click(function () {
    const sectionMaterial = $("#menuHitungMaterial").offset().top;
    if ($(window).width() < 1000) {
      $("html").animate({ scrollTop: sectionMaterial - 250 }, 300);
    } else {
      $("html").animate({ scrollTop: sectionMaterial - 155 }, 300);
    }
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $("#promoDatabase").fadeOut(300);
    } else {
      $("#promoDatabase").fadeIn(300);
    }
  });
});

// Search Hitung Material
const inputMaterial = document.querySelector(
  "#menuHitungMaterial .group input"
);

const cardPekerjaan = document.querySelectorAll(".card-pekerjaan");

inputMaterial.addEventListener("keydown", function (e) {
  const input = e.target.value.toLowerCase();
  const button = document.querySelector("#tombolPekerjaanLainnya");
  button.click();

  cardPekerjaan.forEach(function (card) {
    const title = card
      .querySelector(".text-pekerjaan h4")
      .innerText.toLowerCase();
    const description = card
      .querySelector(".text-pekerjaan span")
      .innerText.toLowerCase();
    if (title.indexOf(input) > -1 || description.indexOf(input) > -1) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
});
