import express from "express";
import {
  newNarrative,
  saveNarrative,
  fetchNarratives,
} from "../controllers/narrative.js";
import { logCredentials } from "../middleware/auth.js";

const router = express.Router();

router.use(logCredentials);

router.get("/narratives", fetchNarratives);
router.post("/narrative/new", newNarrative);
router.post("/narrative/save", saveNarrative);

export default router;
