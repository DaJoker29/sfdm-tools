import express from "express";
import { logout, Authenticate, OAuthCallback } from "../controllers/auth.js";

const router = express.Router();

router.get("/google", Authenticate);
router.get("/google/callback", OAuthCallback);
router.get("/logout", logout);

export default router;
