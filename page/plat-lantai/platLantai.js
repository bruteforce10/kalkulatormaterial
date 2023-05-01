const inputs = document.querySelectorAll("#formInput input, #formInput select");
const calculateButtonPlatLantai = document.querySelector("#hitungMaterial");
const form = document.querySelector("#formInput");
import inputValid from "../../JS/utilities/utilities.js";
const storageKeys = "PLATLANTAI_KEY";
import { generateMaterial } from "../../JS/rumus/material.js";
const tablePlatLantai = document.querySelectorAll("td");
let inputValidation = false;
import { generateTulutama, generateTulSengkang } from "../../JS/rumus/besi.js";
const kebPlatLantai = document.querySelectorAll("#kebutuhanMaterial");

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
    if ((inputValidation = false)) {
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

  class PerhitunganPlatLantai {
    constructor(inputs) {
      this.panjang = inputs[0].value * inputs[1].value;
      this.lebar = inputs[2].value * inputs[3].value;
      this.tebal = inputs[4].value * inputs[5].value;
      this.selimut = inputs[6].value * inputs[7].value;
      this.tulanganArahX = generateTulutama(inputs[8].value);
      this.tulanganArahY = generateTulSengkang(inputs[9].value);
      this.jarakSengkangX = inputs[10].value * inputs[11].value;
      this.jarakSengkangY = inputs[12].value * inputs[13].value;
      this.campuranMaterial = generateMaterial(inputs[14].value);
    }

    volumePekerjaanPlatLantai(output) {
      const volBesiSengkangX =
        2 *
        (this.panjang - 2 * this.selimut + 6 * this.tulanganArahX[0]) *
        (this.lebar / this.jarakSengkangX + 1) *
        this.tulanganArahX[1];
      const volBesiSengkangY =
        2 *
        (this.lebar - 2 * this.selimut + 6 * this.tulanganArahY[0]) *
        (this.panjang / this.jarakSengkangY + 1) *
        this.tulanganArahY[1];
      const volBesi = parseFloat(
        (volBesiSengkangX + volBesiSengkangY).toFixed(3)
      );
      output[0].innerHTML = `Volume Besi ${volBesi} kg`;
      const bekesting = parseFloat((this.panjang * this.lebar).toFixed(3));
      output[1].innerHTML = `Volume Bekesting ${bekesting} m<sup>2</sup>`;
      const volPengecoran = (
        this.panjang * this.lebar * this.tebal -
        volBesi / 7850
      ).toFixed(3);
      output[2].innerHTML = `Volume Pengecoran ${volPengecoran} m<sup>3</sup>`;
      // Perhitungan Material
      // Semen
      let volKebutuhanSemen = Math.round(
        volPengecoran * this.campuranMaterial[1]
      );
      output[3].innerHTML = `<span>${Math.round(
        volKebutuhanSemen / 50
      )} zak atau ${volKebutuhanSemen} buah semen</span>`;
      // pasir
      let volKebutuhanPasir = Math.round(
        volPengecoran * this.campuranMaterial[0]
      );
      output[4].innerHTML = `<span>${volKebutuhanPasir} kg</span>`;
      // Krikil
      let volKebutuhanKrikil = Math.round(
        volPengecoran * this.campuranMaterial[2]
      );
      output[5].innerHTML = `<span>${volKebutuhanKrikil} kg</span>`;
      // Besi Sengkang
      const panjangTulanganX = parseFloat(
        (
          2 *
          (this.panjang - 2 * this.selimut + 6 * this.tulanganArahX[0]) *
          (this.lebar / this.jarakSengkangX + 1)
        ).toFixed(3)
      );
      const panjangTulanganY = parseFloat(
        (
          2 *
          (this.lebar - 2 * this.selimut + 6 * this.tulanganArahY[0]) *
          (this.panjang / this.jarakSengkangY + 1)
        ).toFixed(3)
      );
      output[6].innerHTML = `<span>Besi Sengkang Arah X ${panjangTulanganX} m atau ${Math.round(
        panjangTulanganX / 12
      )} buah</span>`;
      output[7].innerHTML = `<span>Besi Sengkang Arah Y ${panjangTulanganY} m atau ${Math.round(
        panjangTulanganY / 12
      )} buah</span>`;
      // Bekesting
      let volBekestingPanjang = Math.round((bekesting / 2.98) * 1.05);
      output[8].innerHTML = `<span>${volBekestingPanjang} buah lembar</span>`;
      //
      // put volume
      putVolume(
        `Volume Besi ${volBesi} kg`,
        `Volume Bekesting ${bekesting} m<sup>2</sup>`,
        `Volume Pengecoran ${volPengecoran} m<sup>3</sup>`,
        `<span>${Math.round(
          volKebutuhanSemen / 50
        )} zak atau ${volKebutuhanSemen} buah semen</span>`,
        `<span>${volKebutuhanPasir} kg</span>`,
        `<span>${volKebutuhanKrikil} kg</span>`,
        `<span>Besi Sengkang Arah X ${panjangTulanganX} m atau ${Math.round(
          panjangTulanganX / 12
        )} buah</span>`,
        `<span>Besi Sengkang Arah Y ${panjangTulanganY} m atau ${Math.round(
          panjangTulanganY / 12
        )} buah</span>`,
        `<span>${volBekestingPanjang} buah lembar</span>`
      );
    }
  }

  calculateButtonPlatLantai.addEventListener("click", function (e) {
    e.preventDefault();
    validateInputs();

    const perhitunganPlatLantai = new PerhitunganPlatLantai(inputs);
    if (!inputValidation) {
      perhitunganPlatLantai.volumePekerjaanPlatLantai(kebPlatLantai);
      perhitunganPlatLantai.volumePekerjaanPlatLantai(tablePlatLantai);
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

    if (kebPlatLantai) {
      for (let x = 0; x < arry.length; x++) {
        kebPlatLantai[x].innerHTML = `${arry[x]}`;
      }
      for (let x = 0; x < arry.length; x++) {
        tablePlatLantai[x].innerHTML = `${arry[x]}`;
      }
    }
  } else {
    return;
  }
}

getVolume();
