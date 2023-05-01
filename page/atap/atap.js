const inputs = document.querySelectorAll("#formInput input, #formInput select");
const calculateButtonAtap = document.querySelector("#hitungMaterial");
const form = document.querySelector("#formInput");
import inputValid from "/JS/utilities/utilittiesOrigin.js";
const kebAtap = document.querySelectorAll("#kebAtap");
const tableAtap = document.querySelectorAll("#tableAtap");
const storageKey = "ATAP_KEY";
let inputValidation = false;
import { meterialAtapRangka } from "/JS/rumus/material.js";

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

  class PerhitunganAtap {
    constructor(inputs) {
      this.panjang = inputs[0].value * inputs[1].value;
      this.lebar = inputs[2].value * inputs[3].value;
      this.kemiringan = inputs[4].value;
      this.pilihGenteng = inputs[5].value;
    }

    volAtap(output) {
      const luasAtap = parseFloat(
        (((this.panjang + 2) * (this.lebar + 2)) / this.kemiringan).toFixed(3)
      );
      const material = meterialAtapRangka(this.pilihGenteng, luasAtap);
      output[0].innerHTML = `${luasAtap} m<sup>2</sup>`;
      output[1].innerHTML = `${material[0]}`;
      output[2].innerHTML = `${material[1]}`;
      putVolume(
        `${luasAtap} m<sup>2</sup>`,
        `${material[0]}`,
        `${material[1]}`
      );
    }
  }

  calculateButtonAtap.addEventListener("click", function (e) {
    e.preventDefault();
    validateInputs();
    const perhitunganAtap = new PerhitunganAtap(inputs);
    if (!inputValidation) {
      perhitunganAtap.volAtap(kebAtap);
      perhitunganAtap.volAtap(tableAtap);
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

    if (kebAtap) {
      for (let x = 0; x < arry.length; x++) {
        kebAtap[x].innerHTML = `${arry[x]}`;
      }
      for (let x = 0; x < arry.length; x++) {
        tableAtap[x].innerHTML = `${arry[x]}`;
      }
    }
  } else {
    return;
  }
}

getVolume();
