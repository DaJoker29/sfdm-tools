const selectRandom = (array) => {
  return array.at(Math.floor(Math.random() * array.length));
};

export { selectRandom };
