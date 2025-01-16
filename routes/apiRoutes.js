import express from "express";
import { newJourney } from "../controllers/journey.js";

const router = express.Router();

router.post("/journey", newJourney);

export default router;
