const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "All fields must be filled" });
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(422).json({ error: "Email already existed!" });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({ name, email, password: hashedPassword});
        user
          .save()
          .then((saveduser) => {
            console.log(saveduser);
            res.json({ message: "SignUp successfully!" });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "All fields must be filled" });
  }
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(422).json({ error: "Invalid Email" });
    }

    bcrypt
      .compare(password, user.password)
      .then((isMatch) => {
        if (!isMatch) {
          return res.status(422).json({ error: "Invalid Password" });
        }
        else {
          const token = jwt.sign({ _id: user._id }, "secret");
        const { _id, name, email } = user;
         res.json({token, user: {_id, name, email}});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
