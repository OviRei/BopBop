const express = require("express");
const authFollow = require("../auth/auth-follow");
const authLogin = require("../auth/auth-login");
const authSettings = require("../auth/auth-settings");

const router = express.Router();

router.post("/register", authLogin.register);
router.post("/login", authLogin.login);
router.post("/logout", authLogin.logout);

router.post("/settings/changeusername", authSettings.changeusername);
router.post("/settings/changeemail", authSettings.changeemail);
router.post("/settings/changepassword", authSettings.changepassword);
router.post("/settings/changeavatar", authSettings.changeavatar);
router.post("/settings/changebio", authSettings.changebio);
router.post("/settings/deleteaccount", authSettings.deleteaccount);

router.post("/follow", authFollow.follow);
router.post("/unfollow", authFollow.unfollow);


module.exports = router;