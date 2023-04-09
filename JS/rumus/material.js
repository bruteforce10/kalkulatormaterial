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

export { generateMaterial, materialPondasiBatuKali };
