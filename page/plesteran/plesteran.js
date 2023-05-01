const inputs = document.querySelectorAll("#formInput input, #formInput select");
const calculateButtonPlesteran = document.querySelector("#hitungMaterial");
const form = document.querySelector("#formInput");
import inputValid from "/JS/utilities/utilittiesOrigin.js";
const kebPlesteran = document.querySelectorAll("#kebPlesteran");
const tablePlesteran = document.querySelectorAll("#tablePlesteran");
const storageKey = "PLESTERAN_KEY";
import { materialPlesteran } from "/JS/rumus/material.js";
let inputValidation = false;
import Rumus from "/JS/rumus/rumusDasar.js";

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

  class PerhitunganPlesteran {
    constructor(inputs) {
      this.panjang = inputs[0].value * inputs[1].value;
      this.tinggi = inputs[2].value * inputs[3].value;
      this.tebal = inputs[4].value * inputs[5].value;
      this.jumlahSisiPlesteran = inputs[6].value;
      this.campuranMaterial = materialPlesteran(inputs[7].value);
    }

    volPlesteran(output) {
      const volume = Rumus.volumePekerjaan(
        this.panjang,
        this.tinggi,
        this.tebal
      );
      const volPlesteran = parseFloat(
        (volume * this.jumlahSisiPlesteran).toFixed(3)
      );
      output[0].innerHTML = `${volPlesteran} m<sup>3</sup>`;
      output[1].innerHTML = `${parseFloat(
        ((volPlesteran * this.campuranMaterial[0]) / 40).toFixed(3)
      )} zak atau ${parseFloat(
        (volPlesteran * this.campuranMaterial[0]).toFixed(3)
      )} kg`;
      output[2].innerHTML = `${parseFloat(
        (volPlesteran * this.campuranMaterial[1]).toFixed(3)
      )} m<sup>3</sup> atau ${parseFloat(
        ((volPlesteran * this.campuranMaterial[1]) / 7).toFixed(3)
      )} truk`;

      putVolume(
        `${volPlesteran} m<sup>3</sup>`,
        `${parseFloat(
          ((volPlesteran * this.campuranMaterial[0]) / 40).toFixed(3)
        )} zak atau ${parseFloat(
          (volPlesteran * this.campuranMaterial[0]).toFixed(3)
        )} kg`,
        `${parseFloat(
          (volPlesteran * this.campuranMaterial[1]).toFixed(3)
        )} m<sup>3</sup> atau ${parseFloat(
          ((volPlesteran * this.campuranMaterial[1]) / 7).toFixed(3)
        )} truk`
      );
    }
  }

  calculateButtonPlesteran.addEventListener("click", function (e) {
    e.preventDefault();
    validateInputs();
    const perhitunganPlesteran = new PerhitunganPlesteran(inputs);
    if (!inputValidation) {
      perhitunganPlesteran.volPlesteran(kebPlesteran);
      perhitunganPlesteran.volPlesteran(tablePlesteran);
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

    if (kebPlesteran) {
      for (let x = 0; x < arry.length; x++) {
        kebPlesteran[x].innerHTML = `${arry[x]}`;
      }
      for (let x = 0; x < arry.length; x++) {
        tablePlesteran[x].innerHTML = `${arry[x]}`;
      }
    }
  } else {
    return;
  }
}

getVolume();
