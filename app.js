const panjangBalok = document.querySelector("#panjangBalok");
const satuanPanjang = document.querySelector("#satuanPanjang");
const lebarBalok = document.querySelector("#lebarBalok");
const satuanLebar = document.querySelector("#satuanLebar");
const tinggiBalok = document.querySelector("#tinggiBalok");
const satuanTinggi = document.querySelector("#satuanTinggi");
const selimutBalok = document.querySelector("selimutBalok");
const satuanSelimut = document.querySelector("satuanSelimut");
const tulanganUtama = document.querySelector("tulanganUtama");
const tulanganSengkang = document.querySelector("tulanganSengkang");
const jumlahTulanganUtama = document.querySelector("jumlahTulanganUtama");
const jarakSengkang = document.querySelector("jarakSengkang");
const satuanJarakSengkang = document.querySelector("satuanJarakSengkang");
const campuranMaterial = document.querySelector("campuranMaterial");
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
      this.campuranMaterial = campuranMaterial;
      this.satuanJarakSengkang = satuanJarakSengkang;
      this.jarakSengkang = jarakSengkang;
      this.jumlahTulanganUtama = jumlahTulanganUtama;
      this.tulanganSengkang = tulanganSengkang;
      this.tulanganUtama = tulanganUtama;
      this.panjang = panjangBalok;
      this.lebar = lebarBalok;
      this.satuanPanjang = satuanPanjang;
      this.satuanLebar = satuanLebar;
      this.tinggi = tinggiBalok;
      this.satuanTinggi = satuanTinggi;
      this.selimut = selimutBalok;
      this.satuanSelimut = satuanSelimut;
    }
    volumePengecoran() {
      let perhitunganPengecoran = (
        this.panjang *
        this.satuanPanjang *
        this.lebar *
        this.satuanLebar
      ).toFixed(2);
      const hasilVolume = document.getElementsByClassName("list-group-item")[2];
      hasilVolume.innerHTML = `<span>Volume Pengecoran ${perhitunganPengecoran} m<sup>3</sup> </span>`;
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

  perhitunganKotak.volumePengecoran();
});
