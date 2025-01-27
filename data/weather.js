import { SEASONS } from "./seasons.js";
import { selectRandom } from "../utils/index.js";

const WEATHER = {
  "Clear/Cloudy": [
    "Clear, Sunny",
    "Mostly Clear",
    "Partly Cloudy",
    "Mostly Cloudy",
    "Cloudy",
  ],
  Fog: ["Light Fog", "Dense Fog"],
  Rain: ["Drizzle", "Light Rain", "Heavy Rain", "Thunderstorm"],
  Snow: ["Flurries", "Light Snow", "Heavy Snow", "Blizzard"],
  "Freezing Rain": [
    "Freezing Drizzle",
    "Light Freezing Rain",
    "Heavy Freezing Rain",
    "Ice Storm",
  ],
  "Ice Pellets": [
    "Occasional Ice Pellets",
    "Light Ice Pellets",
    "Heavy Ice Pellets",
    "Hailstorm",
  ],
};

const WIND = ["No wind", "Light wind", "Heavy wind", "Squall"];

const TEMP = [
  "Normal temperature",
  "Unusually cold",
  "Unusually warm",
  "Freezing Cold",
  "Scorching Heat",
];

const BANNER = {
  "Clear, Sunny": "clear-sunny",
  "Mostly Clear": "mostly-clear",
  "Partly Cloudy": "partly-cloudy",
  "Mostly Cloudy": "mostly-cloudy",
  Cloudy: "cloudy",
  "Light Fog": "light-fog",
  "Dense Fog": "dense-fog",
  Drizzle: "drizzle",
  "Light Rain": "light-rain",
  "Heavy Rain": "heavy-rain",
  Thunderstorm: "thunderstorm",
  Flurries: "flurries",
  "Light Snow": "light-snow",
  "Heavy Snow": "heavy-snow",
  Blizzard: "blizzard",
  "Freezing Drizzle": "drizzle",
  "Light Freezing Rain": "light-rain",
  "Heavy Freezing Rain": "heavy-rain",
  "Ice Storm": "hailstorm",
  "Occasional Ice Pellets": "ice-pellets",
  "Light Ice Pellets": "ice-pellets",
  "Heavy Ice Pellets": "ice-pellets",
  Hailstorm: "hailstorm",
};

const calculateWeather = (season) => {
  const weatherCategory = getWeatherCat(
    SEASONS[season].chanceOfWeather,
    Math.random() * 100
  );

  const weatherWind = selectRandom(WIND);
  const weatherTemp = selectRandom(TEMP);
  const weatherOverview = selectRandom(WEATHER[weatherCategory]);
  const weatherBanner = BANNER[weatherOverview];

  return { weatherWind, weatherTemp, weatherOverview, weatherBanner };
};

function getWeatherCat(chanceArr, rand) {
  // Iterate through the chanceArr and return the weather category using weighted probability
  for (let i = 0; i < chanceArr.length; i++) {
    if (rand < chanceArr[i].weight) {
      return chanceArr[i].weather;
    }
    rand -= chanceArr[i].weight;
  }
}

export { calculateWeather };
