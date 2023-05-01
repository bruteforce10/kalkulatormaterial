const inputs = document.querySelectorAll("#formInput input, #formInput select");
const calculateButtonPlafond = document.querySelector("#hitungMaterial");
const form = document.querySelector("#formInput");
import inputValid from "/JS/utilities/utilittiesOrigin.js";
const kebPlafond = document.querySelectorAll("#kebPlafond");
const tablePlafond = document.querySelectorAll("#tablePlafond");
const storageKey = "PLAFOND_KEY";
let inputValidation = false;
import { materialPlafond } from "/JS/rumus/material.js";

document.addEventListener("DOMContentLoaded", function () {
  function validateInputs() {
    if (inputValidation) {
      inputValidation = false;
    } else {
      inputValidation = true;
    }
    inputs.forEach((input) => {
      if (input.value === "") {
        input.classList.add("is-invalid");
      }
    });
  }
  inputValid();

  class PerhitunganPlafond {
    constructor(inputs) {
      this.panjang = inputs[0].value * inputs[1].value;
      this.lebar = inputs[2].value * inputs[3].value;
      this.pilihBahan = inputs[4].value;
      this.pilihRangka = inputs[5].value;
    }

    volPlafond(output) {
      const luas = parseFloat(2 * (this.panjang + this.lebar)).toFixed(3);
      const pilihBahanRangka = materialPlafond(
        this.pilihBahan,
        this.pilihRangka,
        luas
      );
      output[0].innerHTML = `${luas} m`;
      output[1].innerHTML = `${pilihBahanRangka[0]}`;
      output[2].innerHTML = `${pilihBahanRangka[1]}`;

      putVolume(
        `${luas} m`,
        `${pilihBahanRangka[0]}`,
        `${pilihBahanRangka[1]}`
      );
    }
  }

  calculateButtonPlafond.addEventListener("click", function (e) {
    e.preventDefault();
    validateInputs();
    const perhitunganPlafond = new PerhitunganPlafond(inputs);
    if (!inputValidation) {
      perhitunganPlafond.volPlafond(kebPlafond);
      perhitunganPlafond.volPlafond(tablePlafond);
    }
  });
});

// local storage
function putVolume(...data) {
  let dataVolume = data;
  localStorage.setItem(storageKey, JSON.stringify(dataVolume));
}

function getVolume() {
  if (localStorage.getItem(storageKey)) {
    const getVolume = JSON.parse(localStorage.getItem(storageKey));
    const arry = [];
    for (const volume of getVolume) {
      arry.push(volume);
    }

    if (kebPlafond) {
      for (let x = 0; x < arry.length; x++) {
        kebPlafond[x].innerHTML = `${arry[x]}`;
      }
      for (let x = 0; x < arry.length; x++) {
        tablePlafond[x].innerHTML = `${arry[x]}`;
      }
    }
  } else {
    return;
  }
}

getVolume();
