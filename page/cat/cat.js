const inputs = document.querySelectorAll("#formInput input, #formInput select");
const calculateButtonCat = document.querySelector("#hitungMaterial");
const form = document.querySelector("#formInput");
import inputValid from "/JS/utilities/utilittiesOrigin.js";
const kebCat = document.querySelectorAll("#kebCat");
const tableCat = document.querySelectorAll("#tableCat");
const storageKey = "CAT_KEY";
let inputValidation = false;
import { materialCat } from "/JS/rumus/material.js";

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

  class PerhitunganCat {
    constructor(inputs) {
      this.panjang = inputs[0].value * inputs[1].value;
      this.tinggi = inputs[2].value * inputs[3].value;
      this.materialCat = inputs[4].value;
    }

    volCat(output) {
      const luas = parseFloat((this.panjang * this.tinggi).toFixed(3));
      const cat = materialCat(this.materialCat, luas);
      output[0].innerHTML = `${luas} m<sup>2</sup>`;
      output[1].innerHTML = `${cat}`;
      putVolume(`${luas} m<sup>2</sup>`, `${cat}`);
    }
  }

  calculateButtonCat.addEventListener("click", function (e) {
    e.preventDefault();
    validateInputs();
    const perhitunganCat = new PerhitunganCat(inputs);
    if (!inputValidation) {
      perhitunganCat.volCat(kebCat);
      perhitunganCat.volCat(tableCat);
    }
  });
});

export { inputs, form };

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

    if (kebCat) {
      for (let x = 0; x < arry.length; x++) {
        kebCat[x].innerHTML = `${arry[x]}`;
      }
      for (let x = 0; x < arry.length; x++) {
        tableCat[x].innerHTML = `${arry[x]}`;
      }
    }
  } else {
    return;
  }
}

getVolume();
