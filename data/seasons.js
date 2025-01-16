const SEASONS = {
  "early-winter": {
    label: "Early Winter",
    chanceOfWeather: [
      { weather: "Clear/Cloudy", weight: 15 },
      { weather: "Fog", weight: 25 },
      { weather: "Rain", weight: 15 },
      { weather: "Freezing Rain", weight: 15 },
      { weather: "Snow", weight: 20 },
      { weather: "Ice Pellets", weight: 10 },
    ],
  },
  midwinter: {
    label: "Midwinter",
    chanceOfWeather: [
      { weather: "Clear/Cloudy", weight: 25 },
      { weather: "Fog", weight: 15 },
      { weather: "Rain", weight: 15 },
      { weather: "Freezing Rain", weight: 15 },
      { weather: "Snow", weight: 20 },
      { weather: "Ice Pellets", weight: 10 },
    ],
  },
  "late-winter": {
    label: "Late Winter",
    chanceOfWeather: [
      { weather: "Clear/Cloudy", weight: 25 },
      { weather: "Fog", weight: 15 },
      { weather: "Rain", weight: 30 },
      { weather: "Freezing Rain", weight: 10 },
      { weather: "Snow", weight: 10 },
      { weather: "Ice Pellets", weight: 10 },
    ],
  },
  "early-spring": {
    label: "Early Spring",
    chanceOfWeather: [
      { weather: "Clear/Cloudy", weight: 30 },
      { weather: "Fog", weight: 15 },
      { weather: "Rain", weight: 30 },
      { weather: "Freezing Rain", weight: 5 },
      { weather: "Snow", weight: 10 },
      { weather: "Ice Pellets", weight: 10 },
    ],
  },
  midspring: {
    label: "Midspring",
    chanceOfWeather: [
      { weather: "Clear/Cloudy", weight: 35 },
      { weather: "Fog", weight: 15 },
      { weather: "Rain", weight: 30 },
      { weather: "Freezing Rain", weight: 5 },
      { weather: "Snow", weight: 5 },
      { weather: "Ice Pellets", weight: 10 },
    ],
  },
  "late-spring": {
    label: "Late Spring",
    chanceOfWeather: [
      { weather: "Clear/Cloudy", weight: 35 },
      { weather: "Fog", weight: 15 },
      { weather: "Rain", weight: 40 },
      { weather: "Freezing Rain", weight: 5 },
      { weather: "Snow", weight: 5 },
      { weather: "Ice Pellets", weight: 0 },
    ],
  },
  "early-summer": {
    label: "Early Summer",
    chanceOfWeather: [
      { weather: "Clear/Cloudy", weight: 55 },
      { weather: "Fog", weight: 15 },
      { weather: "Rain", weight: 20 },
      { weather: "Freezing Rain", weight: 5 },
      { weather: "Snow", weight: 0 },
      { weather: "Ice Pellets", weight: 5 },
    ],
  },
  midsummer: {
    label: "Midsummer",
    chanceOfWeather: [
      { weather: "Clear/Cloudy", weight: 60 },
      { weather: "Fog", weight: 10 },
      { weather: "Rain", weight: 25 },
      { weather: "Freezing Rain", weight: 0 },
      { weather: "Snow", weight: 0 },
      { weather: "Ice Pellets", weight: 5 },
    ],
  },
  "late-summer": {
    label: "Late Summer",
    chanceOfWeather: [
      { weather: "Clear/Cloudy", weight: 75 },
      { weather: "Fog", weight: 10 },
      { weather: "Rain", weight: 15 },
      { weather: "Freezing Rain", weight: 0 },
      { weather: "Snow", weight: 0 },
      { weather: "Ice Pellets", weight: 0 },
    ],
  },
  "early-autumn": {
    label: "Early Autumn",
    chanceOfWeather: [
      { weather: "Clear/Cloudy", weight: 40 },
      { weather: "Fog", weight: 15 },
      { weather: "Rain", weight: 30 },
      { weather: "Freezing Rain", weight: 5 },
      { weather: "Snow", weight: 5 },
      { weather: "Ice Pellets", weight: 5 },
    ],
  },
  midautumn: {
    label: "Midautumn",
    chanceOfWeather: [
      { weather: "Clear/Cloudy", weight: 40 },
      { weather: "Fog", weight: 15 },
      { weather: "Rain", weight: 30 },
      { weather: "Freezing Rain", weight: 5 },
      { weather: "Snow", weight: 5 },
      { weather: "Ice Pellets", weight: 5 },
    ],
  },
  "late-autumn": {
    label: "Late Autumn",
    chanceOfWeather: [
      { weather: "Clear/Cloudy", weight: 40 },
      { weather: "Fog", weight: 30 },
      { weather: "Rain", weight: 15 },
      { weather: "Freezing Rain", weight: 5 },
      { weather: "Snow", weight: 5 },
      { weather: "Ice Pellets", weight: 5 },
    ],
  },
};

async function validateSeasonsData() {
  console.log(`== Validating seasonal weather probability ==`);

  try {
    for (const [key, value] of Object.entries(SEASONS)) {
      const sum = value.chanceOfWeather.reduce(
        (acc, curr) => acc + curr.weight,
        0
      );

      if (sum !== 100)
        throw new Error(
          `${key} weight sum equals ${sum}. This value should equal 100!`
        );
    }
  } catch (e) {
    console.error(e);
  }
}

export { validateSeasonsData, SEASONS };
