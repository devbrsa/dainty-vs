const chroma = require("chroma-js");

const defaultColors = {
  grays: [
    // Material Grey 900
    "#212121",

    // Material Grey 50
    "#fafafa"
  ],
  blueGrays: [
    // Material Theme Ocean
    "#0f111a",

    // Material Blue 50
    desaturate("#e3f2fd", 0.15625)
  ],
  blues: [
    // Custom
    "#082847",

    // Material Blue 700
    "#1976d2",

    // Material Blue 50
    "#e3f2fd"
  ],

  // Material Blue A100
  blueLighter: "#82b1ff",

  // Material Green A100
  greenLighter: "#b9f6ca",

  // Custom
  deepOrangeLighter: "#e4b8a9",

  // Material Purple 200
  purpleLight: "#ce93d8",

  // Material Amber 100
  amberLighter: "#ffecb3"
};

function desaturate(color, amount) {
  return chroma(color)
    .desaturate(amount)
    .hex();
}

function generateScale(colors, n = 40) {
  return chroma
    .scale(colors)
    .mode("lch")
    .colors(n);
}

function mergeColors(defaults, overrides = {}) {
  let result = {};

  for (const key of Object.keys(defaults)) {
    if (overrides[key]) {
      result[key] = overrides[key];
    } else {
      result[key] = defaults[key];
    }
  }

  return result;
}

function brightenScale(colors, steps) {
  return [generateScale(colors)[steps]].concat(colors.slice(1));
}

function generateColorPalette(configuration) {
  const colors = mergeColors(defaultColors, configuration.colors.overrides);

  const grays = brightenScale(
    colors.grays,
    configuration.colors.process.brighten
  );
  const blueGrays = brightenScale(
    colors.blueGrays,
    configuration.colors.process.brighten
  );

  return {
    grays: generateScale(grays),
    blueGrays: generateScale(
      blueGrays.map(c =>
        desaturate(c, configuration.colors.process.desaturate * 0.03125)
      )
    ),
    blues: generateScale(
      colors.blues.map(c =>
        desaturate(c, configuration.colors.process.desaturate * 0.25)
      )
    ),
    blueLighter: desaturate(
      colors.blueLighter,
      configuration.colors.process.desaturate * 0.25
    ),
    greenLighter: desaturate(
      colors.greenLighter,
      configuration.colors.process.desaturate * 0.25
    ),
    deepOrangeLighter: desaturate(
      colors.deepOrangeLighter,
      configuration.colors.process.desaturate * 0.25
    ),
    purpleLight: desaturate(
      colors.purpleLight,
      configuration.colors.process.desaturate * 0.25
    ),
    amberLighter: desaturate(
      colors.amberLighter,
      configuration.colors.process.desaturate * 0.25
    )
  };
}

module.exports = {
  defaultColors,
  generateColorPalette
};
