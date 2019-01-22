export function getRandomNumber(min, max) {
  // The maximum is inclusive and the minimum is inclusive

  min = Math.ceil(min); // eslint-disable-line
  max = Math.floor(max); // eslint-disable-line
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {};