import mongoose from "mongoose";
import { SEASONS } from "../public/data/seasons.js";
import { REGIONS } from "../public/data/regions.js";
import { calculateWeather } from "../public/data/weather.js";
import { submitToGPT } from "../services/gpt.js";
import { userSchema, narrativeSchema } from "../utils/schemas.js";

const User = mongoose.model("User", userSchema);
const Narrative = mongoose.model("Narrative", narrativeSchema);

const fetchNarratives = async function (req, res, next) {
  try {
    const user = await User.findOne({
      googleID: req.query.googleID,
    }).populate("narratives");

    console.log(`Fetching Narratives from User: ${user._id}`);
    res.json(user.narratives);
  } catch (err) {
    next(err);
  }
};

const saveNarrative = async function (req, res, next) {
  console.log(`Saving Narrative. User: ${req.user._id}`);
  const narrative = await Narrative.create(req.body);
  res.json(narrative);
  console.log(`Narrative saved: ${narrative._id}`);
};

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

export { newNarrative, saveNarrative, fetchNarratives };
