const express = require("express");
const authRegister = require("../auth/auth-register");
const authLogin = require("../auth/auth-login");

const router = express.Router();

router.post("/register", authRegister.register);
router.post("/login", authLogin.login);

module.exports = router;