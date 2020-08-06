const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const { signup, signin } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("password", "Password must be 5 characters long.").isLength({
      min: 5,
    }),
    check("emailId", "Email-Id is required.").isEmail(),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("password", "Password must be 5 characters long.").isLength({
      min: 5,
    }),
    check("emailId", "Email-Id is required.").isEmail(),
  ],
  signin
);

router.get("/signout");

module.exports = router;
