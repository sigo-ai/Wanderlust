const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/users.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userControl = require("../controllers/users.js");

router.route("/signup")
    .get(userControl.renderSignup)
    .post(wrapAsync(userControl.signup));


router.route("/login")
    .get(userControl.renderlogin)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userControl.login)

router.get("/logout", userControl.logout);

module.exports = router;