const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const User = require("../../Models/Users");
const Profile = require("../../Models/Profile");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// @method Get
// @route Get api/profile/me
// @desc Get Logged in Users Profile
// @access Private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    //populate is from user model to take in name and avatar
    // user is from token
    if (!profile) {
      return res.status(400).json({ msg: "No such User Profile is Available" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Server");
  }
});

// @method Post
// @route post api/profile
// @desc create/update in Users Profile
// @access Private

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is Required").not().isEmpty(),
      check("skills", "Skill sets are needed").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubUserName,
      skills,
      youtube,
      instagram,
      linkedin,
      twitter,
      facebook,
    } = req.body;
    // res.status(200).send({msg:"skills and status are set"})
    // Build a profile Object
    const profileNewObject = {};
    profileNewObject.user = req.user.id;
    if (company) profileNewObject.company = company;
    if (website) profileNewObject.website = website;
    if (location) profileNewObject.location = location;
    if (bio) profileNewObject.bio = bio;
    if (status) profileNewObject.status = status;
    if (githubUserName) profileNewObject.githubUserName = githubUserName;
    if (skills) {
      profileNewObject.skills = skills
        .split(",")
        .map((eachSkill) => eachSkill.trim());
    }
    profileNewObject.social = {};
    if (youtube) {
      profileNewObject.social.youtube = youtube;
    }
    if (twitter) {
      profileNewObject.social.twitter = twitter;
    }
    if (facebook) {
      profileNewObject.social.facebook = facebook;
    }
    if (instagram) {
      profileNewObject.social.instagram = instagram;
    }
    if (linkedin) {
      profileNewObject.social.linkedin = linkedin;
    }
    console.log(profileNewObject.skills);

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // Update the profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileNewObject },
          { new: true }
        );
        return res.json(profile);
      }

      // Create Profile
      profile = new Profile(profileNewObject);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(400).send("Server Error");
    }
  }
);

// @Route Get api/profiles
// @description get all the profiles
//@access public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @Route Get user/:user_id
// @description get user form id
// @access public

router.get("/users/:user_id", async (req, res) => {
  try {
    const particularUser = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!particularUser) {
      return res.status(400).json({ msg: "No profile for such user" });
    }
    res.json(particularUser);
  } catch (err) {
    console.error(err);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "No profile for such user" });
    }
    res.status(500).send("Server Error");
  }
});

//@ Method Delete
//@ api/profile
//@ description delete Profile
//@ access private

router.delete("/", auth, async (req, res) => {
  try {
    // Delete User
    await User.findOneAndRemove({ _id: req.user.id });
    // Delete Profile
    await Profile.findOneAndRemove({
      user: req.user.id,
    });
    res.json({ msg: "User Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

//@Method put
//@route api/profile/experience
//@description Add experience
// access private
router.put(
  "/exp",
  [
    auth,
    [
      check("title", "Title is Required ").not().isEmpty(),
      check("company", "Previous Company Work Exp is required ")
        .not()
        .isEmpty(),
      check("from", "From date is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const experienceInfo = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(experienceInfo);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

//@Method delete
//@route api/profile/exp/:exp_id
//@description Delete experience
// access private
router.delete("/exp/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove Index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    if (removeIndex === -1) {
      return res.status(400).json({
        msg: "No such entity",
      });
    }
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//@Method put
//@route api/profile/education
//@description  insert Education
// access private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "Enter your School name, It is required").not().isEmpty(),
      check("degree", "Enter the Degree, It is necessary").not().isEmpty(),
      check("fieldOfStudy", "Enter your study majors").not().isEmpty(),
      check("from", "Date when you started your schooling").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const educationObject = {
      school: school,
      degree: degree,
      description: description,
      fieldOfStudy: fieldOfStudy,
      from: from,
      to: to,
      current: current,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(educationObject);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

//@Method delete
//@route api/profile/education/:edu_id
//@description Delete education parameter
// access private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get Index
    const removeIndex = profile.education
      .map((eduyear) => eduyear.id)
      .indexOf(req.params.edu_id);
    if (removeIndex === -1) {
      return res.status(400).json({
        msg: "No such entity",
      });
    }
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//@method get
//@route api/profile/github/:username
// @description github Info
// access public
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: encodeURI(
        `https://api.github.com/users/${
          req.params.username
        }/repos?per_page=5&sort=created:asc&client_id=${config.get(
          "githubClient_ID"
        )}&client_secret=${config.get("githubSECRET_KEY")}`
      ),
      method: "GET",
      headers: {
        "user-agent": "node.js",
      },
    };
    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No Github Profile Found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
// console.log(config.get(githubSECRET_KEY));
module.exports = router;
