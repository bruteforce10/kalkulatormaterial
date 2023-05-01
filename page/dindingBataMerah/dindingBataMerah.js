const inputs = document.querySelectorAll("#formInput input, #formInput select");
const calculateButtonDindingBataMerah =
  document.querySelector("#hitungMaterial");
const form = document.querySelector("#formInput");
import inputValid from "/JS/utilities/utilittiesOrigin.js";
const kebDindingBataMerah = document.querySelectorAll("#kebDindingBataMerah");
const tableDindingBataMerah = document.querySelectorAll(
  "#tableDindingBataMerah"
);
const storageKey = "DINDINGBATAMERAH_KEY";
let inputValidation = false;
import { materialDindingBataMerah } from "/JS/rumus/material.js";

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

  class PerhitunganDindingBataMerah {
    constructor(inputs) {
      this.panjang = inputs[0].value * inputs[1].value;
      this.lebar = inputs[2].value * inputs[3].value;
      this.dinding = materialDindingBataMerah(inputs[4].value);
    }

    volDindingBataMerah(output) {
      const luas = parseFloat((2 * (this.panjang + this.lebar) * 3).toFixed(3));
      output[0].innerHTML = `${luas} m<sup>2</sup>`;
      const kebutuhanBataMerah = parseFloat((luas * 70).toFixed(3));
      output[2].innerHTML = `${kebutuhanBataMerah} buah`;
      output[1].innerHTML = `${parseFloat(
        ((luas * this.dinding[0]) / 40).toFixed(3)
      )} zak atau ${parseFloat((luas * this.dinding[0]).toFixed(3))} kg`;
      output[3].innerHTML = `${parseFloat(
        ((luas * this.dinding[1]) / 7).toFixed(3)
      )} truk atau ${parseFloat(
        (luas * this.dinding[1]).toFixed(3)
      )} m<sup>3</sup>`;
      putVolume(
        `${luas} m<sup>2</sup>`,
        `${kebutuhanBataMerah} buah`,
        `${parseFloat(
          ((luas * this.dinding[0]) / 40).toFixed(3)
        )} zak atau ${parseFloat((luas * this.dinding[0]).toFixed(3))} kg`,
        `${parseFloat(
          ((luas * this.dinding[1]) / 7).toFixed(3)
        )} truk atau ${parseFloat(
          (luas * this.dinding[1]).toFixed(3)
        )} m<sup>3</sup>`
      );
    }
  }

  calculateButtonDindingBataMerah.addEventListener("click", function (e) {
    e.preventDefault();
    validateInputs();
    const perhitunganDindingBataMerah = new PerhitunganDindingBataMerah(inputs);
    if (!inputValidation) {
      perhitunganDindingBataMerah.volDindingBataMerah(kebDindingBataMerah);
      perhitunganDindingBataMerah.volDindingBataMerah(tableDindingBataMerah);
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

    if (kebDindingBataMerah) {
      for (let x = 0; x < arry.length; x++) {
        kebDindingBataMerah[x].innerHTML = `${arry[x]}`;
      }
      for (let x = 0; x < arry.length; x++) {
        tableDindingBataMerah[x].innerHTML = `${arry[x]}`;
      }
    }
  } else {
    return;
  }
}

getVolume();
