import passport from "passport";
import mongoose from "mongoose";
import { Strategy } from "passport-google-oauth20";
import { userSchema } from "../utils/schemas.js";

const User = mongoose.model("User", userSchema);
const googleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  verifyUser
);

passport.use(googleStrategy);
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);

function serialize(user, done) {
  console.log(`Serializing User: ${user.googleID}`);
  done(null, user.googleID);
}

async function deserialize(googleID, done) {
  const user = await User.findOne({ googleID });
  console.log(`Deserializing user: ${user.googleID}`);
  done(null, user);
}

async function verifyUser(accessToken, refreshToken, profile, done) {
  const filter = { googleID: profile.id };
  const update = {};
  const options = { new: true, upsert: true };

  const user = await User.findOneAndUpdate(filter, update, options);
  return done(null, user);
}

export default passport;
