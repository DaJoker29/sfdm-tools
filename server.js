import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";

import passport from "./passport.js";
import { userSchema, journeySchema } from "./schemas.js";
import { generate } from "./controllers/journey.js";
import { validateSeasonsData } from "./data/seasons.js";
import authRoutes from "./routes/authRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";

const app = express();

connectDB().catch((err) => console.log(err));

const User = mongoose.model("User", userSchema);
const Journey = mongoose.model("Journey", journeySchema);

// Middleware
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "secretkey123",
  resave: false,
  saveUninitialized: true,
};

// Reduce fingerprinting
app.disable("x-powered-by");

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// Error Handling Routes
app.use((req, res, next) => {
  res.status(404).send("Can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Misadventure has occurred!");
});

// Start server
app.listen(process.env.PORT, () => {
  validateSeasonsData();
  console.log(`App listening on port ${process.env.PORT}`);
});

async function connectDB() {
  await mongoose.connect(process.env.DB);
  console.log(`Connected to database: ${process.env.DB}`);
}
