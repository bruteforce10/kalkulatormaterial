const inputs = document.querySelectorAll("#formInput input, #formInput select");
const calculateButtonDindingBatako = document.querySelector("#hitungMaterial");
const form = document.querySelector("#formInput");
import inputValid from "/JS/utilities/utilittiesOrigin.js";
const kebDindingBatako = document.querySelectorAll("#kebDindingBatako");
const tableDindingBatako = document.querySelectorAll("#tableDindingBatako");
const storageKey = "DINDINGBATAKO_KEY";
let inputValidation = false;
import { materialDindingBatako } from "/JS/rumus/material.js";

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

  class PerhitunganDindingBatako {
    constructor(inputs) {
      this.panjang = inputs[0].value * inputs[1].value;
      this.lebar = inputs[2].value * inputs[3].value;
      this.dinding = materialDindingBatako(inputs[4].value);
    }

    volDindingBatako(output) {
      const luas = parseFloat((2 * (this.panjang + this.lebar) * 3).toFixed(3));
      output[0].innerHTML = `${luas} m<sup>2</sup>`;
      const kebutuhanBatako = parseFloat((luas * 11).toFixed(3));
      output[1].innerHTML = `${kebutuhanBatako} buah`;
      output[2].innerHTML = `${parseFloat(
        ((luas * this.dinding[0]) / 40).toFixed(3)
      )} zak atau ${parseFloat((luas * this.dinding[0]).toFixed(3))} kg`;
      output[3].innerHTML = `${parseFloat(
        ((luas * this.dinding[1]) / 7).toFixed(3)
      )} truk atau ${parseFloat(
        (luas * this.dinding[1]).toFixed(3)
      )} m<sup>3</sup>`;
      putVolume(
        `${luas} m<sup>2</sup>`,
        `${kebutuhanBatako} buah`,
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

  calculateButtonDindingBatako.addEventListener("click", function (e) {
    e.preventDefault();
    validateInputs();
    const perhitunganDindingBatako = new PerhitunganDindingBatako(inputs);
    if (!inputValidation) {
      perhitunganDindingBatako.volDindingBatako(kebDindingBatako);
      perhitunganDindingBatako.volDindingBatako(tableDindingBatako);
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

    if (kebDindingBatako) {
      for (let x = 0; x < arry.length; x++) {
        kebDindingBatako[x].innerHTML = `${arry[x]}`;
      }
      for (let x = 0; x < arry.length; x++) {
        tableDindingBatako[x].innerHTML = `${arry[x]}`;
      }
    }
  } else {
    return;
  }
}

getVolume();
