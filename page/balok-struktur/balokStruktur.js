const inputs = document.querySelectorAll("#formInput input, #formInput select");
const calculateButton = document.querySelector("#hitungMaterial");
const form = document.querySelector("#formInput");
import inputValid from "../../JS/utilities/utilities.js";
const storageKey = "STORAGE_KEY";
import { generateMaterial } from "../../JS/rumus/material.js";
const showMaterial = document.querySelectorAll("#kebutuhanMaterial");
const table = document.querySelectorAll("td");
let inputValidation = false;
import { generateTulutama, generateTulSengkang } from "../../JS/rumus/besi.js";

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

  calculateButton.addEventListener("click", function (e) {
    e.preventDefault();
    validateInputs();
    class PerhitunganKotak {
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

      volumePekerjaan() {
        //
        //
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
        let volBesiTotal =
          parseFloat(volBesiUtama) + parseFloat(volBesiSengkang);
        hasilVolumePekerjaan[0].innerHTML = `<span>Volume Besi ${volBesiTotal.toFixed(
          3
        )}  kg </span>`;
        // table Besi
        table[0].innerHTML = `<span>${volBesiTotal.toFixed(3)} kg </span>`;
        //
        //
        // Perhitungan Volume Bekesting
        let volBekesting = (
          2 *
            (this.panjang *
              this.satuanPanjang *
              (this.tinggi * this.satuanTinggi)) +
          2 *
            (this.panjang *
              this.satuanPanjang *
              (this.lebar * this.satuanLebar))
        ).toFixed(3);
        hasilVolumePekerjaan[1].innerHTML = `<span>Volume Bekesting ${volBekesting} m<sup>2</sup> </span>`;
        // table Bekesting
        table[1].innerHTML = `<span>${volBekesting} m<sup>2</sup> </span>`;
        //
        //
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

        table[2].innerHTML = `<span>Volume Pengecoran ${volPengecoran} m<sup>3</sup> </span>`;
        // table Pengecoran
        const kolVolPengecoran = document.querySelector("#kolVolPengecoran");
        kolVolPengecoran.innerHTML = `<span>${volPengecoran} m<sup>3</sup> </span>`;
        //
        //
        // Material
        //
        //
        // Perhitungan Material
        // Semen
        let volKebutuhanSemen = Math.round(
          volPengecoran * this.campuranMaterial[1]
        );
        showMaterial[0].innerHTML = `<span>${Math.round(
          volKebutuhanSemen / 50
        )} zak atau ${volKebutuhanSemen} buah semen</span>`;
        // Table Semen
        table[3].innerHTML = `<span>${Math.round(volKebutuhanSemen / 50)} zak`;
        table[4].innerHTML = `<span> ${volKebutuhanSemen} buah semen</span>`;
        // pasir
        let volKebutuhanPasir = Math.round(
          volPengecoran * this.campuranMaterial[0]
        );
        showMaterial[1].innerHTML = `<span>${volKebutuhanPasir} kg</span>`;
        // Table Pasir
        table[5].innerHTML = `<span>${volKebutuhanPasir} kg</span>`;
        // Krikil
        let volKebutuhanKrikil = Math.round(
          volPengecoran * this.campuranMaterial[2]
        );
        showMaterial[2].innerHTML = `<span>${volKebutuhanKrikil} kg</span>`;
        // Table Krikil
        table[6].innerHTML = `<span>${volKebutuhanKrikil} kg</span>`;
        // Besi Utama
        let volBesiUtamaPanjang = Math.round(
          this.panjang * this.satuanPanjang * this.jumlahTulanganUtama
        );
        showMaterial[3].innerHTML = `<span>Besi Utama ${volBesiUtamaPanjang} m atau ${Math.round(
          volBesiUtamaPanjang / 12
        )} buah</span>`;
        // table Besi Utama
        table[7].innerHTML = `<span>Besi Utama ${volBesiUtamaPanjang} m </span>`;
        table[8].innerHTML = `<span>${Math.round(
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
        showMaterial[4].innerHTML = `<span>Besi Sengkang ${volBesiSengkangPanjang} m atau ${Math.round(
          volBesiSengkangPanjang / 12
        )} buah</span>`;
        // table Sengkang
        table[9].innerHTML = `<span>Besi Sengkang ${volBesiSengkangPanjang} m </span>`;
        table[10].innerHTML = `<span> ${Math.round(
          volBesiSengkangPanjang / 12
        )} buah</span>`;
        // Bekesting
        let volBekestingPanjang = Math.round((volBekesting / 2.98) * 1.05);
        showMaterial[5].innerHTML = `<span>${volBekestingPanjang} buah lembar</span>`;
        // table bekesting
        table[11].innerHTML = `<span>${volBekestingPanjang} buah lembar</span>`;

        putVolume(
          ` ${volBesiTotal.toFixed(3)} kg`,
          ` ${volBekesting} m<sup>2</sup>`,
          ` ${volPengecoran} m<sup>3</sup>`,
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
          `<span>${volBekestingPanjang} buah lembar</span>`,
          `<span>${volBesiTotal.toFixed(3)} kg </span>`,
          `<span>${volBekesting} m<sup>2</sup> </span>`,
          `<span>Volume Pengecoran ${volPengecoran} m<sup>3</sup> </span>`,
          `<span>${Math.round(volKebutuhanSemen / 50)} zak`,
          `<span> ${volKebutuhanSemen} buah semen</span>`,
          `<span>${volKebutuhanPasir} kg</span>`,
          `<span>${volKebutuhanKrikil} kg</span>`,
          `<span>Besi Utama ${volBesiUtamaPanjang} m </span>`,
          `<span>${Math.round(volBesiUtamaPanjang / 12)} buah</span>`,
          `<span>Besi Sengkang ${volBesiSengkangPanjang} m </span>`,
          `<span> ${Math.round(volBesiSengkangPanjang / 12)} buah</span>`,
          `<span>${volBekestingPanjang} buah lembar</span>`
        );
      }
    }

    const perhitunganKotak = new PerhitunganKotak(inputs);
    if (!inputIncomplete) {
      perhitunganKotak.volumePekerjaan();
    }
  });
});

export { form, inputs };

const hasilVolumePekerjaan = document.querySelectorAll(".list-group-item");
// local Storage
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
    console.log(arry);
    for (let i = 0; i < arry.length; i++) {
      if (hasilVolumePekerjaan[i]) {
        hasilVolumePekerjaan[i].innerHTML += `${arry[i]}`;
      }
    }
    const arryMaterial = arry.slice(3, 12);
    for (let x = 0; x < arryMaterial.length; x++) {
      if (showMaterial[x]) {
        showMaterial[x].innerHTML = `${arryMaterial[x]}`;
      }
    }
    const arryTable = arry.slice(9, 21);
    for (let x = 0; x < arryTable.length; x++) {
      if (table[x]) {
        table[x].innerHTML = `${arryTable[x]}`;
      }
    }
  }
}

getVolume();
