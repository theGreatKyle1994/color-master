const { random, floor } = Math;

// TODO: expand to allow for specific colors
const genColor = (type = "random") => {
  switch (type) {
    case "random":
      return floor(random() * 256);
  }
};

// A basic color generation for testing. no constraints
export const generateSingleColors = (count) => {
  const colorArr = [];
  for (let i = 0; i < count; i++) {
    colorArr.push({
      r: genColor("random"),
      g: genColor("random"),
      b: genColor("random"),
    });
  }
  return colorArr;
};

export const getHexValue = (color) => {
  return (
    "#" +
    ((1 << 24) | (color.r << 16) | (color.g << 8) | color.b)
      .toString(16)
      .slice(1)
  );
};

export const getRGBValue = (color) => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  return {
    r,
    g,
    b,
  };
};
