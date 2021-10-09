const express = require("express");
const authRegister = require("../auth/auth-register");

const router = express.Router();

router.post("/register", authRegister.register);

module.exports = router;