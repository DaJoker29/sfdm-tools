import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleID: String,
});

const journeySchema = new mongoose.Schema({
  owner: String,
  season: String,
  region: String,
  combatFlag: Boolean,
  nonCombatFlag: Boolean,
  weatherWind: String,
  weatherTemp: String,
  weatherOverview: String,
  travelConditions: String,
  combatEncounter: String,
  nonCombatEncounter: String,
});

export { userSchema, journeySchema };
