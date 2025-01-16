import { SEASONS } from "../public/data/seasons.js";
import { REGIONS } from "../public/data/regions.js";
import { calculateWeather } from "../public/data/weather.js";
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

export { newNarrative };
