const User = require("../../model/user");
const api = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

api.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(400).json({
        error: "There is no account associated with the given email address.",
      });
    }

    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ error: "Password incorrect." });
      }

      const payload = {
        id: user._id,
        email: user.email,
      };

      jwt.sign(
        payload,
        require("../../secret").secret,
        {
          expiresIn: 7200,
        },
        (err, token) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Something is wrong with the server. " });
          }
          user.token = token;
          user
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        }
      );
    });
  });
});

api.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ err: "Email address already in use." });
    }

    bcrypt.genSalt().then((salt) => {
      bcrypt.hash(req.body.password, salt).then((cryptedPassword) => {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: cryptedPassword,
          token: "",
        });

        const payload = {
          id: newUser._id,
          email: newUser.email,
        };

        jwt.sign(
          payload,
          require("../../secret").secret,
          { expiresIn: 7200 },
          (err, token) => {
            if (err) {
              throw err;
            }

            newUser.token = token;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          }
        );
      });
    });
  });
});

api.post("/welcome", auth, (req, res) => {
  User.findOne({ email: req.user.email }).then((user) => {
    res.json({ message: `Welcome ${user.firstName} ${user.lastName}!` });
  });
});

module.exports = api;
