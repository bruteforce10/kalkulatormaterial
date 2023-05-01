const inputs = document.querySelectorAll("#formInput input, #formInput select");
const calculateButtonBalokPraktis = document.querySelector("#hitungMaterial");
const form = document.querySelector("#formInput");
import inputValid from "../../JS/utilities/utilities.js";
const storageKeys = "BALOKPRAKTIS_KEY";
import { balokPraktis } from "../../JS/rumus/material.js";
const tableBalokPraktis = document.querySelectorAll("td");
let inputValidation = false;
const kebBalokPraktis = document.querySelectorAll("#kebutuhanMaterial");

// Navigasi Scroll Sipilku
window.onscroll = function () {
  const navbar = document.querySelector("#navbar");
  if (this.scrollY === 0) {
    navbar.style.backgroundColor = "transparent";
  } else {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  }
};
// Akhir Navigasi Scroll Sipilku

document.addEventListener("DOMContentLoaded", () => {
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

  class PerhitunganBalokPraktis {
    constructor(inputs) {
      this.panjang = inputs[0].value * inputs[1].value;
      this.material = balokPraktis(inputs[2].value);
    }

    volumePekerjaanBalokPraktis(output) {
      // Volume Besi
      let volBesiUtama = ((this.panjang + 2 * 40 * 0.01) * 4 * 0.62).toFixed(3);
      let volBesiSengkang = (
        (2 * (this.material[0] - 2 * 0.004) +
          (this.material[1] - 2 * 0.004) +
          6 * 0.008) *
        (this.panjang / (150 / 1000) + 1) *
        0.395
      ).toFixed(3);
      let volBesiTotal = parseFloat(volBesiUtama) + parseFloat(volBesiSengkang);
      output[0].innerHTML = `<span>Volume Besi ${volBesiTotal.toFixed(
        3
      )}  kg </span>`;
      // Perhitungan Volume Bekesting
      let volBekesting = parseFloat(
        (
          2 * (this.panjang * this.material[0]) +
          2 * (this.panjang * this.material[1])
        ).toFixed(3)
      );
      output[1].innerHTML = `<span>Volume Bekesting ${volBekesting} m<sup>2</sup> </span>`;
      let volPengecoran = (
        this.panjang * this.material[0] * this.material[1] -
        volBesiTotal / 7850
      ).toFixed(3);
      output[2].innerHTML = `<span>Volume Pengecoran ${volPengecoran} m<sup>3</sup> </span>`;
      // Perhitungan Material
      // Semen
      let volKebutuhanSemen = Math.round(volPengecoran * 326);
      output[3].innerHTML = `<span>${parseFloat(
        (volKebutuhanSemen / 50).toFixed(3)
      )} zak atau ${volKebutuhanSemen} buah semen</span>`;
      // pasir
      let volKebutuhanPasir = Math.round(volPengecoran * 760);
      output[4].innerHTML = `<span>${volKebutuhanPasir} kg</span>`;
      // Krikil
      let volKebutuhanKrikil = Math.round(volPengecoran * 1029);
      output[5].innerHTML = `<span>${volKebutuhanKrikil} kg</span>`;
      // Besi Utama
      let volBesiUtamaPanjang = Math.round(this.panjang * 4);
      output[6].innerHTML = `<span>Besi Utama ${volBesiUtamaPanjang} m atau ${Math.round(
        volBesiUtamaPanjang / 12
      )} buah</span>`;
      // Besi Sengkang
      let volBesiSengkangPanjang = (
        (2 * (this.material[0] - 2 * 0.004) +
          (this.material[1] - 2 * 0.004) +
          6 * 0.008) *
        (this.panjang / (150 / 1000) + 1)
      ).toFixed(2);
      output[7].innerHTML = `<span>Besi Sengkang ${volBesiSengkangPanjang} m atau ${Math.round(
        volBesiSengkangPanjang / 12
      )} buah</span>`;
      // Bekesting
      let volBekestingPanjang = Math.round((volBekesting / 2.98) * 1.05);
      output[8].innerHTML = `<span>${volBekestingPanjang} buah lembar</span>`;
      // put volume
      //
      putVolume(
        `<span>Volume Besi ${volBesiTotal.toFixed(3)}  kg </span>`,
        `<span>Volume Bekesting ${volBekesting} m<sup>2</sup> </span>`,
        `<span>Volume Pengecoran ${volPengecoran} m<sup>3</sup> </span>`,
        `<span>${Math.round(
          volKebutuhanSemen / 50
        )} zak atau ${volKebutuhanSemen} buah semen</span>`,
        `<span>${volKebutuhanPasir} kg</span>`,
        `<span>${volKebutuhanKrikil} kg</span>`,
        `<span>Besi Utama ${volBesiUtamaPanjang} m atau ${Math.round(
          volBesiUtamaPanjang / 12
        )} buah</span>`,
        `<span>Besi Sengkang ${volBesiSengkangPanjang} m atau ${Math.round(
          volBesiSengkangPanjang / 12
        )} buah</span>`,
        `<span>${volBekestingPanjang} buah lembar</span>`
      );
    }
  }

  calculateButtonBalokPraktis.addEventListener("click", function (e) {
    e.preventDefault();
    validateInputs();

    const perhitunganBalokPraktis = new PerhitunganBalokPraktis(inputs);
    if (!inputValidation) {
      perhitunganBalokPraktis.volumePekerjaanBalokPraktis(kebBalokPraktis);
      perhitunganBalokPraktis.volumePekerjaanBalokPraktis(tableBalokPraktis);
    }
  });
});

export { form, inputs };

// local Storage
function putVolume(...data) {
  let dataVolume = data;
  localStorage.setItem(storageKeys, JSON.stringify(dataVolume));
}

function getVolume() {
  if (localStorage.getItem(storageKeys)) {
    const getVolume = JSON.parse(localStorage.getItem(storageKeys));
    const arry = [];
    for (const volume of getVolume) {
      arry.push(volume);
    }

    if (!kebBalokPraktis) {
      for (let x = 0; x < arry.length; x++) {
        kebBalokPraktis[x].innerHTML = `${arry[x]}`;
      }
      for (let x = 0; x < arry.length; x++) {
        tableBalokPraktis[x].innerHTML = `${arry[x]}`;
      }
    }
  } else {
    return;
  }
}

getVolume();
