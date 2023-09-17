const { random, floor } = Math;

const genColor = (type = "random") => {
  switch (type) {
    case "random":
      return floor(random() * 256);
  }
};

export const generateSingleColors = (count) => {
  const colorArr = [];
  for (let i = 0; i < count; i++) {
    colorArr.push({
      r: genColor("random"),
      g: genColor("random"),
      b: genColor("random"),
      _id: "none",
    });
  }
  return colorArr;
};
