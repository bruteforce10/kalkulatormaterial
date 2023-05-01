// Material Beton
function generateMaterial(material) {
  const materialData = {
    1: [799, 299, 1017],
    2: [760, 326, 1029],
    3: [731, 352, 1031],
    4: [698, 371, 1047],
    5: [692, 384, 1039],
    6: [684, 406, 1026],
  };
  return materialData[material];
}

// Material Campuran Pondasi Batu Kali
function materialPondasiBatuKali(material) {
  const materialData = {
    1: [202, 0.485],
    2: [163, 0.52],
    3: [136, 0.544],
    4: [117, 0.561],
    5: [91, 0.584],
  };
  return materialData[material];
}

// Material Campuran Plesteran
function materialPlesteran(material) {
  const materialData = {
    1: [6.24, 0.024],
    2: [5.18, 0.026],
    3: [4.42, 0.027],
  };
  return materialData[material];
}

// Material Lantai
function materialLantai(material) {
  const materialData = {
    1: 1,
    2: 0.99,
    3: 0.96,
    4: 1.08,
  };
  return materialData[material];
}

// Material Cat
function materialCat(material, volume) {
  const materialData = {
    1: `Cat Dasar ${parseFloat(
      (volume * 0.1).toFixed(3)
    )} kg, Cat Penutup ${parseFloat((volume * 0.26).toFixed(3))} kg,
      Plamir ${parseFloat(
        (volume * 0.1).toFixed(3)
      )} kg, Kertas Pasir ${parseFloat((volume * 0.25).toFixed(3))} lbr`,
    2: `Cat Dasar ${parseFloat(
      (volume * 0.1).toFixed(3)
    )} kg, Cat Penutup ${parseFloat((volume * 0.26).toFixed(3))} kg,
      Plamir ${parseFloat(
        (volume * 0.1).toFixed(3)
      )} kg, Kertas Pasir ${parseFloat((volume * 1).toFixed(3))} lbr`,
    3: `Cat Plafond ${parseFloat((volume * 0.26).toFixed(3))} kg`,
    4: `Meni Kayu ${parseFloat(
      (volume * 0.167).toFixed(3)
    )} kg, Plamir Kayu ${parseFloat((volume * 0.081).toFixed(3))} kg, 
    Cat Kayu ${parseFloat((volume * 0.2).toFixed(3))} kg, Amplas Kayu 
    ${parseFloat((volume * 0.4).toFixed(3))} lembar`,
    5: `Meni Besi ${parseFloat((volume * 0.167).toFixed(3))} kg, Cat Dasar Besi
    ${parseFloat((volume * 0.863).toFixed(3))} kg, Cat Besi ${parseFloat(
      (volume * 0.2).toFixed(3)
    )} kg`,
  };
  return materialData[material];
}

function materialPlafond(pilihBahan, pilihRangka, volume) {
  const materialBahan = {
    1: `<li>Asbes ${parseFloat((volume * 1.1).toFixed(3))} lembar</li>
    <li>Paku Tripleks ${parseFloat((volume * 0.01).toFixed(3))} kg</li>`,
    2: `<li>Tripleks ${parseFloat((volume * 0.39).toFixed(3))} lembar</li>
    <li>Paku Tripleks ${parseFloat((volume * 0.03).toFixed(3))} kg</li></li>`,
    3: `<li>Gypsum ${parseFloat((volume * 0.36).toFixed(3))} lembar</li>
    <li>Sekrup Gypsum ${parseFloat((volume * 0.11).toFixed(3))} kg</li>`,
  };
  const materialKerangka = {
    1: `<li>Kaso 5/7m ${parseFloat((volume * 1.55).toFixed(3))} lembar</li>
    <li>Paku 7-10cm ${parseFloat((volume * 0.25).toFixed(3))} kg</li>`,
    2: `<li>Hollow 40/40mm ${parseFloat((volume * 1).toFixed(3))} lembar</li>
    <li>Skrup Hollow ${parseFloat((volume * 6).toFixed(3))} biji</li>`,
  };
  return [materialBahan[pilihBahan], materialKerangka[pilihRangka]];
}

function meterialAtapRangka(pilihAtap, volume) {
  const materialBahan = {
    1: `<li>Kaso 5/7 cm ${parseFloat(
      (volume * 0.01).toFixed(3)
    )} m<sup>3</sup></li>
    <li>Reng 3/2 cm ${parseFloat((volume * 0.01).toFixed(3))} m<sup>3</sup></li>
    <li>Paku ${parseFloat((volume * 0.05).toFixed(3))} kg</li>`,
    2: `<li>Kaso 5/7 cm ${parseFloat(
      (volume * 0.01).toFixed(3)
    )} m<sup>3</sup></li>
    <li>Reng 3/2 cm ${parseFloat((volume * 0.01).toFixed(3))} m<sup>3</sup></li>
    <li>Paku ${parseFloat((volume * 0.05).toFixed(3))} kg</li>`,
    3: `<li>Kaso 5/7 cm ${parseFloat(
      (volume * 0.01).toFixed(3)
    )} m<sup>3</sup></li>
    <li>Reng 3/2 cm ${parseFloat((volume * 0.06).toFixed(3))} m<sup>3</sup></li>
    <li>Paku ${parseFloat((volume * 0.03).toFixed(3))} kg</li>`,
    4: `<li>Kaso 5/7 cm ${parseFloat(
      (volume * 0.01).toFixed(3)
    )} m<sup>3</sup></li>
    <li>Reng 3/2 cm ${parseFloat((volume * 0.06).toFixed(3))} m<sup>3</sup></li>
    <li>Paku ${parseFloat((volume * 0.03).toFixed(3))} kg</li>`,
    5: `<li>Balok Kayu ${parseFloat(
      (volume * 1.1).toFixed(3)
    )} m<sup>3</sup></li>
    <li>Besi Strip 5 mm ${parseFloat((volume * 15).toFixed(3))} kg</li>
    <li>Paku 12 cm ${parseFloat((volume * 3).toFixed(3))} kg</li>`,
  };
  const materialAtaps = {
    1: `Genteng Biasa ${parseFloat((volume * 25).toFixed(3))} buah`,
    2: `Genteng Glazuur ${parseFloat((volume * 25).toFixed(3))} buah`,
    3: `Genteng Beton ${parseFloat((volume * 11).toFixed(3))} buah`,
    4: `<li>Genteng Metal ${parseFloat((volume * 1.02).toFixed(3))} buah</li>
    <li>Paku Genteng ${parseFloat((volume * 0.25).toFixed(3))} kg</li>`,
    5: `<li>Asbes ${parseFloat((volume * 0.6).toFixed(3))} lembar</li>
    <li>Paku Pancing ${parseFloat((volume * 0.12).toFixed(3))} kg</li>`,
  };
  return [materialBahan[pilihAtap], materialAtaps[pilihAtap]];
}

function materialDindingBataRingan(material) {
  const materialData = {
    1: 111.11,
    2: 83.33,
    3: 67.67,
    4: 55.56,
    5: 47.61,
    6: 41.67,
  };
  return materialData[material];
}

function materialDindingBataMerah(material) {
  const materialData = {
    1: [14.37, 0.04],
    2: [11.5, 0.043],
    3: [9.68, 0.045],
    4: [8.32, 0.0049],
    5: [6.5, 0.05],
  };
  return materialData[material];
}

function materialDindingBatako(material) {
  const materialData = {
    1: [3, 0.007],
    2: [2.4, 0.0075],
    3: [2.02, 0.0079],
    4: [1.74, 0.0086],
    5: [1.36, 0.0009],
  };
  return materialData[material];
}

function balokPraktis(material) {
  const materialData = {
    1: [0.15, 0.1],
    2: [0.15, 0.15],
    3: [0.15, 0.1],
    4: [0.15, 0.1],
    5: [0.15, 0.15],
  };
  return materialData[material];
}

export {
  generateMaterial,
  materialPondasiBatuKali,
  materialPlesteran,
  materialLantai,
  materialCat,
  materialPlafond,
  meterialAtapRangka,
  materialDindingBataRingan,
  materialDindingBataMerah,
  materialDindingBatako,
  balokPraktis,
};
