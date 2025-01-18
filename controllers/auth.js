import passport from "../services/passport.js";

const findUser = (req, res) => {
  if (Object.prototype.hasOwnProperty.call(req, "user")) {
    return res.json(req.user);
  } else {
    return res.status(404).json({ message: "No user found" });
  }
};

const Authenticate = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const OAuthCallback = passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/login",
});

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export { findUser, Authenticate, OAuthCallback, logout };
