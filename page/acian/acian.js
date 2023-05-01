const inputs = document.querySelectorAll("#formInput input, #formInput select");
const calculateButtonAcian = document.querySelector("#hitungMaterial");
const form = document.querySelector("#formInput");
import inputValid from "/JS/utilities/utilittiesOrigin.js";
const storageKey = "ACIAN_KEY";
let inputValidation = false;
const kebAcian = document.querySelectorAll("#kebAcian");
const tableAcian = document.querySelectorAll("#tableAcian");

console.log("Test");

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

  class PerhitunganAcian {
    constructor(inputs) {
      this.panjang = inputs[0].value * inputs[1].value;
      this.tinggi = inputs[2].value * inputs[3].value;
      this.jumlahSisiPlesteran = inputs[4].value;
    }

    volAcian(output) {
      const volume = parseFloat(
        (this.panjang * this.tinggi * this.jumlahSisiPlesteran).toFixed(3)
      );
      const semen = 3.25;
      output[0].innerHTML = `${volume} m<sup>2</sup>`;
      output[1].innerHTML = `<li>Semen Biasa <b>${parseFloat(
        ((volume * (semen / 2)) / 50).toFixed(3)
      )} Zak</b> + Semen Mill <b>${parseFloat(
        ((volume * (semen / 2)) / 20).toFixed(3)
      )} Zak</b> dengan masing-masing <b>${parseFloat(
        (volume * (semen / 2)).toFixed(3)
      )} kg</b> </li>
      <li>Jika Memakai Semen Saja <b>${parseFloat(
        ((volume * semen) / 50).toFixed(3)
      )} Zak</b> atau <b>${parseFloat(
        (volume * semen).toFixed(3)
      )} kg</b></li>`;
      putVolume(
        `${volume} m<sup>2</sup>`,
        `<li>Semen Biasa <b>${parseFloat(
          ((volume * (semen / 2)) / 50).toFixed(3)
        )} Zak</b> + Semen Mill <b>${parseFloat(
          ((volume * (semen / 2)) / 20).toFixed(3)
        )} Zak</b> dengan masing-masing <b>${parseFloat(
          (volume * (semen / 2)).toFixed(3)
        )} kg</b> </li>
      <li>Jika Memakai Semen Saja <b>${parseFloat(
        ((volume * semen) / 50).toFixed(3)
      )} Zak</b> atau <b>${parseFloat((volume * semen).toFixed(3))} kg</b></li>`
      );
    }
  }

  calculateButtonAcian.addEventListener("click", function (e) {
    e.preventDefault();
    validateInputs();
    const perhitunganAcian = new PerhitunganAcian(inputs);
    if (!inputValidation) {
      perhitunganAcian.volAcian(kebAcian);
      perhitunganAcian.volAcian(tableAcian);
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

    if (kebAcian) {
      for (let x = 0; x < arry.length; x++) {
        kebAcian[x].innerHTML = `${arry[x]}`;
      }
      for (let x = 0; x < arry.length; x++) {
        tableAcian[x].innerHTML = `${arry[x]}`;
      }
    }
  } else {
    return;
  }
}

getVolume();
