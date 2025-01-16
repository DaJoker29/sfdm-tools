import { SEASONS } from "../public/data/seasons.js";
import { REGIONS } from "../public/data/regions.js";
import weather from "../public/data/weather.js";
import { submitToGPT } from "../services/gpt.js";

const newNarrative = async function (req, res, next) {
  try {
    const { combatFlag, nonCombatFlag } = req.body;
    const { weatherWind, weatherTemp, weatherOverview, weatherBanner } =
      calculateWeather(req.body.season);

    const season = SEASONS[req.body.season].label;
    const region = REGIONS[req.body.region].label;
    const biome = REGIONS[req.body.region].biome;

    const { prompt, travelConditions, combatEncounter, nonCombatEncounter } =
      await submitToGPT({
        season,
        region,
        biome,
        combatFlag,
        nonCombatFlag,
        weatherWind,
        weatherTemp,
        weatherOverview,
      });

    const response = {
      season,
      region,
      biome,
      combatFlag,
      nonCombatFlag,
      weatherWind,
      weatherTemp,
      weatherOverview,
      weatherBanner,
      prompt,
      travelConditions,
      combatEncounter,
      nonCombatEncounter,
    };

    console.log(response);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

function calculateWeather(season) {
  const weatherCategory = getWeatherCat(
    SEASONS[season].chanceOfWeather,
    Math.random() * 100
  );

  const weatherWind = selectRandom(weather.WIND);
  const weatherTemp = selectRandom(weather.TEMP);
  const weatherOverview = selectRandom(weather.WEATHER[weatherCategory]);
  const weatherBanner = weather.BANNER[weatherCategory];

  return { weatherWind, weatherTemp, weatherOverview, weatherBanner };
}

function getWeatherCat(chanceArr, rand) {
  // Iterate through the chanceArr and return the weather category using weighted probability
  for (let i = 0; i < chanceArr.length; i++) {
    if (rand < chanceArr[i].weight) {
      return chanceArr[i].weather;
    }
    rand -= chanceArr[i].weight;
  }
}

function selectRandom(array) {
  return array.at(Math.floor(Math.random() * array.length));
}

export { newNarrative };
