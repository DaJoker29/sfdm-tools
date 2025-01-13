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

const WIND = ["No wind", "Light wind", "Heavy wind"];

const TEMP = ["Normal temperature", "Unusually cold", "Unusually warm"];

const BANNER = {
  "Clear/Cloudy": "clear-cloudy.png",
  Fog: "fog.png",
  Rain: "rain.png",
  Snow: "snow.png",
  "Freezing Rain": "freezing-rain.png",
  "Ice Pellets": "ice-pellets.png",
};

export default { WEATHER, WIND, TEMP, BANNER };
