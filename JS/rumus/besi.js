function generateTulutama(tulangan) {
  const tulanganData = {
    1: [0.006, 0.22],
    2: [0.008, 0.39],
    3: [0.01, 0.62],
    4: [0.013, 1.04],
    5: [0.019, 2.33],
    6: [0.022, 2.98],
    7: [0.025, 3.85],
  };
  return tulanganData[tulangan];
}

function generateTulSengkang(tulangan) {
  const tulanganData = {
    1: [0.006, 0.22],
    2: [0.008, 0.39],
    3: [0.01, 0.62],
    4: [0.013, 1.04],
  };

  return tulanganData[tulangan];
}

export { generateTulutama, generateTulSengkang };
