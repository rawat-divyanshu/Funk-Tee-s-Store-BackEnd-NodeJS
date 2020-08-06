const User = require("../models/user");

const { validationResult } = require("express-validator");

var expressJwt = require("express-jwt");
var jwt = require("jsonwebtoken");

// Signup Middleware
exports.signup = (req, res) => {
  // Validation check errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Signup Unsuccessful",
      });
    }
    res.json({
      fullName: user.fullName,
      emailId: user.emailId,
      role: user.role,
      _id: user._id,
    });
  });
};

// Login Middleware
exports.signin = (req, res) => {
  // Validation check errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const { emailId, password } = req.body;

  User.findOne({ emailId }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User does not Exists.",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email & Password do not Match.",
      });
    }
    // Create Token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // Put token in Cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    const { _id, fullName, emailId, role } = user;
    return res.json({ token, user: { _id, fullName, emailId, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    messgae: "User Signed Out Successfully.",
  });
};
