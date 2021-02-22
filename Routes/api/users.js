const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const gravitar = require("gravatar");
const User = require("../../Models/Users");
// @method Post
// @route Post api/users
// @desc Posts the User
// @access Public
router.post(
  "/",
  [
    check("name", "name is required").notEmpty(),
    check("email", "email is necessary").notEmpty(),
    check("password", "Password is Required").isLength({ min: 6 }),
    // body("password", "Password is Required").isLength({ min: 6 }),
  ],
  // for express 5.31 we use check as it is given in the course
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;
    try {
      // check if User in Database
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Mail is Already Taken" }] });
      }

      // Get Users Avatar
      const avatar = gravitar.url(email, {
        s: "200", // Default Size of 200
        r: "pg", // rating
        d: "mp", // default image or you can have 404 user not found
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });

      // bycrypt Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // any asynchronous or return promises just use await in front
      await user.save();

      // Jwt Token
      const payload = {
        user: {
          id: user.id,
          // name: user.name,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      // res.send("User Routers");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
    // console.log(req.body);
  }
);

module.exports = router;
