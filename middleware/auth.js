// middleware has 3 things req, res ,next a callback to move to next peice

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Getting Token From Header
  const token = req.header("x-auth-token");

  // Checking if token is provided
  if (!token) {
    res.status(401).json({ msg: "You are not Authorized to Enter Here" });
  }
  // verify Token
  try {
    const decoded = jwt.verify(token, config.get("jwtToken"));
    // to use req.user in any of private routes we want
    // user is a new property assigned
    req.user = decoded.user;
    // console.log(req);
    // console.log(decoded);
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ msg: "Your token is Invalid" });
  }
};
