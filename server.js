import express from "express";
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";

const app = express();

connectDB().catch((err) => console.log(err));

// Database Schemas
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

const User = mongoose.model("User", userSchema);
const Journey = mongoose.model("Journey", journeySchema);

// Middleware
app.use(cors());
app.use(helmet());
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
    async function (accessToken, refreshToken, profile, done) {
      const filter = { googleID: profile.id };
      const update = {};
      const options = { new: true, upsert: true };

      const user = await User.findOneAndUpdate(filter, update, options);
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(`Serializing User. ID: ${user.googleID}`);
  done(null, user.googleID);
});

passport.deserializeUser(async (id, done) => {
  const filter = { googleID: id };
  const update = {};
  const options = { new: true, upsert: true };

  const user = await User.findOneAndUpdate(filter, update, options);
  console.log(`Deserializing user. ID: ${user.googleID}`);
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

// Error Handling
app.use((req, res, next) => {
  res.status(404).send("Can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Misadventure has occurred!");
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

async function connectDB() {
  await mongoose.connect(process.env.DB);
  console.log(`Connected to database: ${process.env.DB}`);
}
