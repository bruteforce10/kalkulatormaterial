const inputs = document.querySelectorAll("#formInput input, #formInput select");
const calculateButtonDindingBataRingan =
  document.querySelector("#hitungMaterial");
const form = document.querySelector("#formInput");
import inputValid from "/JS/utilities/utilittiesOrigin.js";
const kebDindingBataRingan = document.querySelectorAll("#kebDindingBataRingan");
const tableDindingBataRingan = document.querySelectorAll(
  "#tableDindingBataRingan"
);
const storageKey = "DINDINGBATARINGAN_KEY";
let inputValidation = false;
import { materialDindingBataRingan } from "/JS/rumus/material.js";

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

  class PerhitunganDindingBataRingan {
    constructor(inputs) {
      this.panjang = inputs[0].value * inputs[1].value;
      this.lebar = inputs[2].value * inputs[3].value;
      this.dinding = materialDindingBataRingan(inputs[4].value);
    }

    volDindingBataRingan(output) {
      const luas = parseFloat((2 * (this.panjang + this.lebar) * 3).toFixed(3));
      output[0].innerHTML = `${luas} m<sup>2</sup>`;
      const kebutuhanBata = parseFloat((luas * 8.3).toFixed(3));
      const kebutuhanBataVol = parseFloat(
        (kebutuhanBata / this.dinding).toFixed(3)
      );
      output[1].innerHTML = `Kebutuhan Bata ${kebutuhanBata} Buah atau 
      ${kebutuhanBataVol} m<sup>3</sup>`;
      const kebutuhanMortar = parseFloat(((luas * 4) / 40).toFixed(3));
      output[2].innerHTML = `${kebutuhanMortar} zak & Kebutuhan Air ${parseFloat(
        (luas / 5).toFixed(3)
      )} liter`;
      putVolume(
        `${luas} m<sup>2</sup>`,
        `Kebutuhan Bata ${kebutuhanBata} Buah atau 
      ${kebutuhanBataVol} m<sup>3</sup>`,
        `${kebutuhanMortar} zak & Kebutuhan Air ${parseFloat(
          (luas / 5).toFixed(3)
        )} liter`
      );
    }
  }

  calculateButtonDindingBataRingan.addEventListener("click", function (e) {
    e.preventDefault();
    validateInputs();
    const perhitunganDindingBataRingan = new PerhitunganDindingBataRingan(
      inputs
    );
    if (!inputValidation) {
      perhitunganDindingBataRingan.volDindingBataRingan(kebDindingBataRingan);
      perhitunganDindingBataRingan.volDindingBataRingan(tableDindingBataRingan);
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

    if (kebDindingBataRingan) {
      for (let x = 0; x < arry.length; x++) {
        kebDindingBataRingan[x].innerHTML = `${arry[x]}`;
      }
      for (let x = 0; x < arry.length; x++) {
        tableDindingBataRingan[x].innerHTML = `${arry[x]}`;
      }
    }
  } else {
    return;
  }
}

getVolume();
