const inputs = document.querySelectorAll("#formInput input, #formInput select");
const calculateButtonLantai = document.querySelector("#hitungMaterial");
const form = document.querySelector("#formInput");
import inputValid from "/JS/utilities/utilittiesOrigin.js";
const kebLantai = document.querySelectorAll("#kebLantai");
const tableLantai = document.querySelectorAll("#tableLantai");
const storageKey = "LANTAI_KEY";
let inputValidation = false;
import { materialLantai } from "/JS/rumus/material.js";

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

  class PerhitunganLantai {
    constructor(inputs) {
      this.panjang = inputs[0].value * inputs[1].value;
      this.lebar = inputs[2].value * inputs[3].value;
      this.lantai = materialLantai(inputs[4].value);
    }

    volLantai(output) {
      const volume = parseFloat((this.panjang * this.lebar).toFixed(3));
      const semen = 10;
      const nat = 1.5;
      const pasir = 0.045;

      output[0].innerHTML = `${volume} m<sup>2</sup>`;
      output[1].innerHTML = `<li>${parseFloat(
        ((volume * semen) / 50).toFixed(3)
      )} zak atau
      ${parseFloat((volume * semen).toFixed(3))} kg</li>
      <li>Semen Nat ${parseFloat((volume * nat).toFixed(3))}</li>`;
      output[2].innerHTML = `${Math.round(volume * this.lantai)} dus keramik`;
      output[3].innerHTML = `${parseFloat(
        ((volume * pasir) / 50).toFixed(3)
      )} zak atau
      ${parseFloat((volume * pasir).toFixed(3))} kg`;
      putVolume(
        `${volume} m<sup>2</sup>`,
        `<li>${parseFloat(((volume * semen) / 50).toFixed(3))} zak atau
      ${parseFloat((volume * semen).toFixed(3))} kg</li>
      <li>Semen Nat ${parseFloat((volume * nat).toFixed(3))}</li>`,
        `${Math.round(volume * this.lantai)} dus keramik`,
        `${parseFloat(((volume * pasir) / 50).toFixed(3))} zak atau
      ${parseFloat((volume * pasir).toFixed(3))} kg`
      );
    }
  }

  calculateButtonLantai.addEventListener("click", function (e) {
    e.preventDefault();
    validateInputs();
    const perhitunganLantai = new PerhitunganLantai(inputs);
    if (!inputValidation) {
      perhitunganLantai.volLantai(kebLantai);
      perhitunganLantai.volLantai(tableLantai);
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

    if (kebLantai) {
      for (let x = 0; x < arry.length; x++) {
        kebLantai[x].innerHTML = `${arry[x]}`;
      }
      for (let x = 0; x < arry.length; x++) {
        tableLantai[x].innerHTML = `${arry[x]}`;
      }
    }
  } else {
    return;
  }
}

getVolume();
