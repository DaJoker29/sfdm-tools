const logCredentials = (req, res, next) => {
  const id = Object.prototype.hasOwnProperty.call(req, "user")
    ? req.user.googleID
    : "Unauthenticated";

  console.log(`Request recieved from id: ${id}`);
  next();
};

export { logCredentials };
