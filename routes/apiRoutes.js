import express from "express";
import { newNarrative } from "../controllers/days-travel.js";
import { logCredentials } from "../middleware/auth.js";

const router = express.Router();

router.use(logCredentials);

router.post("/days-travel", newNarrative);

export default router;
