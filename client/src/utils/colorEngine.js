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
