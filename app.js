const panjangBalok = document.querySelector("#panjangBalok");
const satuanPanjang = document.querySelector("#satuanPanjang");
const lebarBalok = document.querySelector("#lebarBalok");
const satuanLebar = document.querySelector("#satuanLebar");
const tinggiBalok = document.querySelector("#tinggiBalok");
const satuanTinggi = document.querySelector("#satuanTinggi");
const selimutBalok = document.querySelector("#selimutBalok");
const satuanSelimut = document.querySelector("#satuanSelimut");
let tulanganUtama = document.querySelector("#tulanganUtama");
let tulanganSengkang = document.querySelector("#tulanganSengkang");
const jumlahTulanganUtama = document.querySelector("#jumlahTulanganUtama");
const jarakSengkang = document.querySelector("#jarakSengkang");
const satuanJarakSengkang = document.querySelector("#satuanJarakSengkang");
const campuranMaterial = document.querySelector("#campuranMaterial");
const hitungMaterial = document.querySelector("#hitungMaterial");

hitungMaterial.addEventListener("click", function () {
  class PerhitunganKotak {
    constructor(
      panjangBalok,
      lebarBalok,
      satuanPanjang,
      satuanLebar,
      tinggiBalok,
      satuanTinggi,
      selimutBalok,
      satuanSelimut,
      tulanganUtama,
      tulanganSengkang,
      jumlahTulanganUtama,
      jarakSengkang,
      satuanJarakSengkang,
      campuranMaterial
    ) {
      this.panjang = panjangBalok;
      this.lebar = lebarBalok;
      this.satuanPanjang = satuanPanjang;
      this.satuanLebar = satuanLebar;
      this.tinggi = tinggiBalok;
      this.satuanTinggi = satuanTinggi;
      this.selimut = selimutBalok;
      this.satuanSelimut = satuanSelimut;
      this.tulanganUtama = tulanganUtama;
      switch (this.tulanganUtama) {
        case "1":
          this.tulanganUtama = [0.006, 0.22];
          break;
        case "2":
          this.tulanganUtama = [0.008, 0.39];
          break;
        case "3":
          this.tulanganUtama = [0.01, 0.62];
          break;
        case "4":
          this.tulanganUtama = [0.013, 1.04];
          break;
        case "5":
          this.tulanganUtama = [0.019, 2.33];
          break;
        case "6":
          this.tulanganUtama = [0.022, 2.98];
          break;
        case "7":
          this.tulanganUtama = [0.025, 3.85];
          break;
      }
      this.tulanganSengkang = tulanganSengkang;
      switch (this.tulanganSengkang) {
        case "1":
          this.tulanganSengkang = [0.006, 0.22];
          break;
        case "2":
          this.tulanganSengkang = [0.008, 0.39];
          break;
        case "3":
          this.tulanganSengkang = [0.01, 0.62];
          break;
        case "4":
          this.tulanganSengkang = [0.013, 1.04];
          break;
      }

      this.jumlahTulanganUtama = jumlahTulanganUtama;
      this.jarakSengkang = jarakSengkang;
      this.satuanJarakSengkang = satuanJarakSengkang;
      this.campuranMaterial = campuranMaterial;
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
      let volBesiTotal = parseFloat(volBesiUtama) + parseFloat(volBesiSengkang);
      let hasilVolumeBesi =
        document.getElementsByClassName("list-group-item")[0];
      hasilVolumeBesi.innerHTML = `<span>Volume Besi ${volBesiTotal} kg </span>`;
      //
      //
      // Perhitungan Volume Bekesting
      let volBekesting = (
        2 *
          (this.panjang *
            this.satuanPanjang *
            (this.tinggi * this.satuanTinggi)) +
        2 *
          (this.panjang * this.satuanPanjang * (this.lebar * this.satuanLebar))
      ).toFixed(3);
      let hasilBekesting =
        document.getElementsByClassName("list-group-item")[1];
      hasilBekesting.innerHTML = `<span>Volume Bekesting ${volBekesting} m<sup>2</sup> </span>`;
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
      let hasilPengecoran =
        document.getElementsByClassName("list-group-item")[2];
      hasilPengecoran.innerHTML = `<span>Volume Pengecoran ${volPengecoran} m<sup>3</sup> </span>`;
    }
  }

  const perhitunganKotak = new PerhitunganKotak(
    panjangBalok.value,
    lebarBalok.value,
    satuanPanjang.value,
    satuanLebar.value,
    tinggiBalok.value,
    satuanTinggi.value,
    selimutBalok.value,
    satuanSelimut.value,
    tulanganUtama.value,
    tulanganSengkang.value,
    jumlahTulanganUtama.value,
    jarakSengkang.value,
    satuanJarakSengkang.value,
    campuranMaterial.value
  );

  perhitunganKotak.volumePekerjaan();
});
