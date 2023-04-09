// Nav Sipilku
window.onscroll = function () {
  const navbar = document.querySelector("#navbar");
  if (this.scrollY === 0) {
    navbar.style.backgroundColor = "transparent";
  } else {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  }
};

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
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $("#promoDatabase").fadeOut(500);
    } else {
      $("#promoDatabase").fadeIn(500);
    }
  });
});

// Search Hitung Material
const inputMaterial = document.querySelector(
  "#menuHitungMaterial .group input"
);

const cardPekerjaan = document.querySelectorAll(".card-pekerjaan");

inputMaterial.addEventListener("keyup", function (e) {
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
