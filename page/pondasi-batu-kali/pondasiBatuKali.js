const inputs = document.querySelectorAll("#formInput input, #formInput select");
const calculateButtonPondasiBatuKali =
  document.querySelector("#hitungMaterial");
const form = document.querySelector("#formInput");
import inputValid from "/JS/utilities/utilittiesOrigin.js";
const kebPondasiBatuKali = document.querySelectorAll("#kebPondasiBatuKali");
const tablePondasiBatuKali = document.querySelectorAll("#tablePondasiBatuKali");
import { materialPondasiBatuKali } from "/JS/rumus/material.js";
const storageKey = "PONDASIBATUKALI_KEY";
let inputValidation = false;

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

  class PerhitunganPondasiBatuKali {
    constructor(inputs) {
      this.panjang = inputs[0].value * inputs[1].value;
      this.lebarAtas = inputs[2].value * inputs[3].value;
      this.lebarBawah = inputs[4].value * inputs[5].value;
      this.tinggi = inputs[6].value * inputs[7].value;
      this.campuranMaterial = materialPondasiBatuKali(inputs[8].value);
    }

    volPondasiBatuKali(output) {
      const sisiTrapesium = (this.lebarAtas + this.lebarBawah) / 2;
      const volPondasiBatuKali = parseFloat(
        (this.panjang * sisiTrapesium * this.tinggi).toFixed(3)
      );
      output[0].innerHTML = `${volPondasiBatuKali} m<sup>3</sup>`;
      output[1].innerHTML = `${
        (volPondasiBatuKali * this.campuranMaterial[0]) / 50
      } zak atau ${volPondasiBatuKali * this.campuranMaterial[0]} kg`;
      output[2].innerHTML = `${parseFloat(
        (volPondasiBatuKali * 1.2).toFixed(3)
      )} m<sup>3</sup> atau ${parseFloat(
        (volPondasiBatuKali / 7).toFixed(3)
      )} truk`;
      output[3].innerHTML = `${parseFloat(
        (volPondasiBatuKali * this.campuranMaterial[1]).toFixed(3)
      )} m<sup>3</sup> atau ${parseFloat(
        ((volPondasiBatuKali * this.campuranMaterial[1]) / 7).toFixed(3)
      )}`;
      putVolume(
        `${volPondasiBatuKali} m<sup>3</sup>`,
        `${(volPondasiBatuKali * this.campuranMaterial[0]) / 50} zak atau ${
          volPondasiBatuKali * this.campuranMaterial[0]
        } kg`,
        `${parseFloat(
          (volPondasiBatuKali * 1.2).toFixed(3)
        )} m<sup>3</sup> atau ${parseFloat(
          (volPondasiBatuKali / 7).toFixed(3)
        )} truk`,
        `${parseFloat(
          (volPondasiBatuKali * this.campuranMaterial[1]).toFixed(3)
        )} m<sup>3</sup> atau ${parseFloat(
          ((volPondasiBatuKali * this.campuranMaterial[1]) / 7).toFixed(3)
        )}`
      );
    }
  }

  calculateButtonPondasiBatuKali.addEventListener("click", function (e) {
    e.preventDefault();
    validateInputs();
    const perhitunganPondasiBatuKali = new PerhitunganPondasiBatuKali(inputs);
    if (!inputIncomplete) {
      perhitunganPondasiBatuKali.volPondasiBatuKali(kebPondasiBatuKali);
      perhitunganPondasiBatuKali.volPondasiBatuKali(tablePondasiBatuKali);
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

    if (kebPondasiBatuKali) {
      for (let x = 0; x < arry.length; x++) {
        kebPondasiBatuKali[x].innerHTML = `${arry[x]}`;
      }
      for (let x = 0; x < arry.length; x++) {
        tablePondasiBatuKali[x].innerHTML = `${arry[x]}`;
      }
    }
  } else {
    return;
  }
}

getVolume();
