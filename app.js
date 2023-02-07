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
const resetInput = document.querySelector("#resetInput");
const form = document.querySelector("#formInput");

resetInput.addEventListener("click", function () {
  form.reset();
});

// Export Excel
function ExportToExcel(type, fn, dl) {
  var elt = document.getElementById("tbl_exporttable_to_xls");
  var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
    : XLSX.writeFile(wb, fn || "Kebutuhan Material Balok." + (type || "xlsx"));
}
// Akhir Export Excel

hitungMaterial.addEventListener("click", function () {
  if (
    (panjangBalok.value === "") |
    (lebarBalok.value === "") |
    (tinggiBalok.value === "") |
    (selimutBalok.value === "") |
    (tulanganUtama.value === "") |
    (tulanganSengkang.value === "") |
    (jumlahTulanganUtama.value === "") |
    (jarakSengkang.value === "") |
    (campuranMaterial === "")
  ) {
    for (let i = 0; i < form.length; i++) {
      if (form[i].value === "") {
        form[i].classList.add("is-invalid");
      }
    }
    return false;
  }

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
      switch (this.campuranMaterial) {
        case "1":
          this.campuranMaterial = [799, 299, 1017];
          break;
        case "2":
          this.campuranMaterial = [760, 326, 1029];
          break;
        case "3":
          this.campuranMaterial = [731, 352, 1031];
          break;
        case "4":
          this.campuranMaterial = [698, 371, 1047];
          break;
        case "5":
          this.campuranMaterial = [692, 384, 1039];
          break;
        case "6":
          this.campuranMaterial = [684, 406, 1026];
          break;
      }
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
      hasilVolumeBesi.innerHTML = `<span>Volume Besi ${volBesiTotal.toFixed(
        3
      )} kg </span>`;
      // table Besi
      const kolVolBesi = document.querySelector("#kolVolBesi");
      kolVolBesi.innerHTML = `<span>${volBesiTotal.toFixed(3)} kg </span>`;
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
      // table Bekesting
      const kolVolBekesting = document.querySelector("#kolVolBekesting");
      kolVolBekesting.innerHTML = `<span>${volBekesting} m<sup>2</sup> </span>`;
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
      // table Pengecoran
      const kolVolPengecoran = document.querySelector("#kolVolPengecoran");
      kolVolPengecoran.innerHTML = `<span>${volPengecoran} m<sup>3</sup> </span>`;
      //
      //
      // Perhitungan Material
      // Semen
      let volKebutuhanSemen = Math.round(
        volPengecoran * this.campuranMaterial[1]
      );
      const hasilKebutuhanSemen = document.querySelector("#kebutuhanSemen");
      hasilKebutuhanSemen.innerHTML = `<span>${Math.round(
        volKebutuhanSemen / 50
      )} zak atau ${volKebutuhanSemen} buah semen</span>`;
      // Table Semen
      const kolSemenZak = document.querySelector("#kolSemenZak");
      const kolSemenBuah = document.querySelector("#kolSemenBuah");
      kolSemenZak.innerHTML = `<span>${Math.round(volKebutuhanSemen / 50)} zak`;
      kolSemenBuah.innerHTML = `<span> ${volKebutuhanSemen} buah semen</span>`;
      // pasir
      let volKebutuhanPasir = Math.round(
        volPengecoran * this.campuranMaterial[0]
      );
      const hasilKebutuhanPasir = document.querySelector("#kebutuhanPasir");
      hasilKebutuhanPasir.innerHTML = `<span>${volKebutuhanPasir} kg</span>`;
      // Table Pasir
      const kolPasir = document.querySelector("#kolPasir");
      kolPasir.innerHTML = `<span>${volKebutuhanPasir} kg</span>`;
      // Krikil
      let volKebutuhanKrikil = Math.round(
        volPengecoran * this.campuranMaterial[2]
      );
      const hasilKebutuhanKrikil = document.querySelector("#kebutuhanKrikil");
      hasilKebutuhanKrikil.innerHTML = `<span>${volKebutuhanKrikil} kg</span>`;
      // Table Krikil
      const kolKrikil = document.querySelector("#kolKrikil");
      kolKrikil.innerHTML = `<span>${volKebutuhanKrikil} kg</span>`;
      // Besi Utama
      let volBesiUtamaPanjang = Math.round(
        this.panjang * this.satuanPanjang * this.jumlahTulanganUtama
      );
      const hasilKebutuhanBesiUtama = document.querySelector(
        "#kebutuhanBesiUtama"
      );
      hasilKebutuhanBesiUtama.innerHTML = `<span>${volBesiUtamaPanjang} m atau ${Math.round(
        volBesiUtamaPanjang / 12
      )} buah</span>`;
      // table Besi Utama
      const kolBesiUtamaPanjang = document.querySelector(
        "#kolBesiUtamaPanjang"
      );
      const kolBesiUtamaBuah = document.querySelector("#kolBesiUtamaBuah");
      kolBesiUtamaPanjang.innerHTML = `<span>Besi Utama ${volBesiUtamaPanjang} m`;
      kolBesiUtamaBuah.innerHTML = `<span>${Math.round(
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
      const hasilKebutuhanBesiSengkang = document.querySelector(
        "#kebutuhanBesiSengkang"
      );
      hasilKebutuhanBesiSengkang.innerHTML = `<span>${volBesiSengkangPanjang} m atau ${Math.round(
        volBesiSengkangPanjang / 12
      )} buah</span>`;
      // table Sengkang
      const kolBesiSengkangPanjang = document.querySelector(
        "#kolBesiSengkangPanjang"
      );
      const kolBesiSengkangBuah = document.querySelector(
        "#kolBesiSengkangBuah"
      );
      kolBesiSengkangPanjang.innerHTML = `<span>Besi Sengkang ${volBesiSengkangPanjang} m`;
      kolBesiSengkangBuah.innerHTML = `<span> ${Math.round(
        volBesiSengkangPanjang / 12
      )} buah</span>`;
      // Bekesting
      let volBekestingPanjang = Math.round((volBekesting / 2.98) * 1.05);
      const hasilKebutuhanBekesting = document.querySelector(
        "#kebutuhanBekesting"
      );
      hasilKebutuhanBekesting.innerHTML = `<span>${volBekestingPanjang} buah lembar</span>`;
      // table bekesting
      const kolBekesting = document.querySelector("#kolBekesting");
      kolBekesting.innerHTML = `<span>${volBekestingPanjang} buah lembar</span>`;
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

form.addEventListener("click", function (e) {
  if (
    (e.target.className == "form-control is-invalid") |
    (e.target.className == "form-select is-invalid")
  ) {
    e.target.classList.remove("is-invalid");
  }
});
