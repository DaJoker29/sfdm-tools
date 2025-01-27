import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import MongoStore from "connect-mongo";

import passport from "./services/passport.js";
import { validateSeasonsData } from "./data/seasons.js";
import authRoutes from "./routes/authRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import { findUser } from "./controllers/auth.js";

const app = express();

const hostname = process.env.HOST;
const port = process.env.PORT;
const secret = process.env.EXPRESS_SECRET;
const dbUrl = process.env.DB;

// Middleware
const sessionOptions = {
  secret,
  store: MongoStore.create({ mongoUrl: dbUrl }),
  resave: false,
  saveUninitialized: true,
};

// Reduce fingerprinting
app.disable("x-powered-by");

app.use(express.static("dist"));
app.use("/data", express.static("data"));

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.get("/profile", findUser);

// Error Handling Routes
app.use((req, res, next) => {
  res.status(404).send("Can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Misadventure has occurred!");
});

try {
  validateSeasonsData();
  connect();
} catch (err) {
  console.error(err);
  process.exit(1);
}

async function connect() {
  await mongoose.connect(dbUrl);
  console.log(`== Connected to database: ${dbUrl} ==`);

  // Start server
  app.listen(port, () => {
    console.log(`== Express secret set to ${secret} ==`);
    console.log(`== Accessible from: http://${hostname}:${port} ==`);
    console.log(`\nLISTENING...\n`);
  });
}
