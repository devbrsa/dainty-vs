const chroma = require("chroma-js");

const defaultColors = {
  grays: [
    // Material Grey 900
    "#212121",
    // Material Grey 50
    "#fafafa"
  ],
  blueGrays: [
    // Custom
    "#111527",
    // Material Blue 50
    "#e3f2fd"
  ],
  blues: [
    // Custom
    "#07224f",
    // Material Blue 600
    desaturate("#1e88e5"),
    // Material Blue 50
    "#e3f2fd"
  ],
  // Material Green A100
  greenLighter: desaturate("#b9f6ca"),

  // Material Deep Orange 200
  deepOrangeLight: desaturate("#ffab91", 0.875),

  // Material Purple 200
  purpleLight: desaturate("#ce93d8"),

  // Material Amber 100
  amberLighter: desaturate("#ffecb3", 0.875)
};

function desaturate(color, amount = 0.25) {
  return chroma(color)
    .desaturate(amount)
    .hex();
}

function generateScale(colors) {
  return chroma
    .scale(colors)
    .mode("lch")
    .colors(40);
}

function generateColorPalette(colors = defaultColors) {
  return {
    grays: generateScale(colors.grays),
    blueGrays: generateScale(colors.blueGrays),
    blues: generateScale(colors.blues),
    greenLighter: colors.greenLighter,
    deepOrangeLight: colors.deepOrangeLight,
    purpleLight: colors.purpleLight,
    amberLighter: colors.amberLighter
  };
}

module.exports = {
  generateColorPalette
};
