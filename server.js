import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import passport from "passport";
import seasons from "./public/seasons-data.js";
import { Strategy } from "passport-google-oauth20";

import { userSchema, journeySchema } from "./schemas.js";
import { generate } from "./travel.js";

const app = express();

connectDB().catch((err) => console.log(err));

const User = mongoose.model("User", userSchema);
const Journey = mongoose.model("Journey", journeySchema);

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Reduce fingerprinting
app.disable("x-powered-by");

// Authentication
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretkey123",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:3000/auth/google/callback",
    },
    verifyUser
  )
);

passport.serializeUser((user, done) => {
  console.log(`Serializing User: ${user.googleID}`);
  done(null, user.googleID);
});

passport.deserializeUser(async (id, done) => {
  const filter = { googleID: id };
  const update = {};
  const options = { new: true, upsert: true };

  const user = await User.findOneAndUpdate(filter, update, options);
  console.log(`Deserializing user: ${user.googleID}`);
  done(null, user);
});

// Authentication Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/");
  }
);

// API Routes
app.post("/travel", generate);

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
  validateJSONContent();
  console.log(`App listening on port ${process.env.PORT}`);
});

async function connectDB() {
  await mongoose.connect(process.env.DB);
  console.log(`Connected to database: ${process.env.DB}`);
}

async function verifyUser(accessToken, refreshToken, profile, done) {
  const filter = { googleID: profile.id };
  const update = {};
  const options = { new: true, upsert: true };

  const user = await User.findOneAndUpdate(filter, update, options);
  return done(null, user);
}

async function validateJSONContent() {
  console.log(`== Validating local content ==`);

  try {
    for (const [key, value] of Object.entries(seasons)) {
      const sum = value.chanceOfWeather.reduce(
        (acc, curr) => acc + curr.weight,
        0
      );

      if (sum !== 100)
        throw new Error(
          `${key} weight sum equals ${sum}. This value should equal 100!`
        );
    }
  } catch (e) {
    console.error(e);
  }
}
