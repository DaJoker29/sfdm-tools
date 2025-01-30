import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleID: String,
});

userSchema.virtual("narratives", {
  ref: "Narrative",
  localField: "_id",
  foreignField: "owner",
});

const checkboxEnum = ["on", "off"];

const narrativeSchema = new mongoose.Schema({
  owner: { type: String, ref: "User" },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 },
  season: { type: String, required: true },
  region: { type: String, required: true },
  biome: { type: String, required: true },
  combatFlag: { type: String, required: true, enum: checkboxEnum },
  nonCombatFlag: { type: String, required: true, enum: checkboxEnum },
  weatherWind: { type: String, required: true },
  weatherTemp: { type: String, required: true },
  weatherOverview: { type: String, required: true },
  travelConditions: { type: String, required: true },
  combatEncounter: { type: String },
  nonCombatEncounter: { type: String },
});

export { userSchema, narrativeSchema };
