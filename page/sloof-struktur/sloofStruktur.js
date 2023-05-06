const inputs = document.querySelectorAll("#formInput input, #formInput select");
const calculateButtonSloofStruktur = document.querySelector("#hitungMaterial");
const form = document.querySelector("#formInput");
import inputValid from "../../JS/utilities/utilities.js";
const storageKeys = "SlOOFSTRUKTUR_KEY";
import { generateMaterial } from "../../JS/rumus/material.js";
const tableSloofStrukutur = document.querySelectorAll("td");
let inputValidation = false;
import { generateTulutama, generateTulSengkang } from "../../JS/rumus/besi.js";
const kebSloofStruktur = document.querySelectorAll("#kebutuhanMaterial");

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

  class PerhitunganSloof {
    constructor(inputs) {
      this.panjang = inputs[0].value;
      this.lebar = inputs[2].value;
      this.satuanPanjang = inputs[1].value;
      this.satuanLebar = inputs[3].value;
      this.tinggi = inputs[4].value;
      this.satuanTinggi = inputs[5].value;
      this.selimut = inputs[6].value;
      this.satuanSelimut = inputs[7].value;
      this.tulanganUtama = generateTulutama(inputs[8].value);

      this.tulanganSengkang = generateTulSengkang(inputs[9].value);

      this.jumlahTulanganUtama = inputs[10].value;
      this.jarakSengkang = inputs[11].value;
      this.satuanJarakSengkang = inputs[12].value;
      this.campuranMaterial = generateMaterial(inputs[13].value);
    }

    volumePekerjaanSloofStruktur(output) {
      // Volume Besi
      let volBesiUtama = (
        (this.panjang * this.satuanPanjang + 2 * 40 * this.tulanganUtama[0]) *
        this.jumlahTulanganUtama *
        this.tulanganUtama[1]
      ).toFixed(3);
      let volBesiSengkang = (
        2 *
        (this.lebar * this.satuanLebar -
          2 * (this.selimut * this.satuanSelimut) +
          (this.tinggi * this.satuanTinggi -
            2 * (this.selimut * this.satuanSelimut)) +
          6 * this.tulanganSengkang[0]) *
        (this.panjang / (this.jarakSengkang * this.satuanJarakSengkang) + 1) *
        this.tulanganSengkang[1]
      ).toFixed(3);
      let volBesiTotal = parseFloat(volBesiUtama) + parseFloat(volBesiSengkang);
      output[0].innerHTML = `<span>Volume Besi ${volBesiTotal.toFixed(
        3
      )}  kg </span>`;
      // Perhitungan Volume Bekesting
      let volBekesting = (
        2 *
          (this.panjang *
            this.satuanPanjang *
            (this.tinggi * this.satuanTinggi)) +
        2 *
          (this.panjang * this.satuanPanjang * (this.lebar * this.satuanLebar))
      ).toFixed(3);
      output[1].innerHTML = `<span>Volume Bekesting ${volBekesting} m<sup>2</sup> </span>`;
      // Perhitungan Volume Pengecoran
      let volPengecoran = (
        this.panjang *
          this.satuanPanjang *
          this.lebar *
          this.satuanLebar *
          this.tinggi *
          this.satuanTinggi -
        volBesiTotal / 7850
      ).toFixed(3);
      output[2].innerHTML = `<span>Volume Pengecoran ${volPengecoran} m<sup>3</sup> </span>`;
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
      // Besi Utama
      let volBesiUtamaPanjang = Math.round(
        this.panjang * this.satuanPanjang * this.jumlahTulanganUtama
      );
      output[6].innerHTML = `<span>Besi Utama ${volBesiUtamaPanjang} m atau ${Math.round(
        volBesiUtamaPanjang / 12
      )} buah</span>`;
      // Besi Sengkang
      let volBesiSengkangPanjang = Math.round(
        ((this.panjang * this.satuanPanjang) /
          (this.jarakSengkang * this.satuanJarakSengkang)) *
          (2 *
            (this.lebar * this.satuanLebar -
              this.selimut * this.satuanSelimut) +
            (2 * (this.tinggi * this.satuanTinggi) -
              this.selimut * this.satuanSelimut))
      );
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

  calculateButtonSloofStruktur.addEventListener("click", function (e) {
    e.preventDefault();
    validateInputs();

    const perhitunganSloof = new PerhitunganSloof(inputs);
    if (!inputValidation) {
      perhitunganSloof.volumePekerjaanSloofStruktur(kebSloofStruktur);
      perhitunganSloof.volumePekerjaanSloofStruktur(tableSloofStrukutur);
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

    if (kebSloofStruktur) {
      for (let x = 0; x < arry.length; x++) {
        kebSloofStruktur[x].innerHTML = `${arry[x]}`;
      }
      for (let x = 0; x < arry.length; x++) {
        tableSloofStrukutur[x].innerHTML = `${arry[x]}`;
      }
    }
  } else {
    return;
  }
}

getVolume();
