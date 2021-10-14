const express = require("express");

const router = express.Router();

router.get("/",  (req, res) => 
{
    res.render("index");
});

router.get("/login",  (req, res) => 
{
    res.render("login");
});

router.get("/register",  (req, res) => 
{
    res.render("register");
});

router.get("/home", (req, res) => 
{
    if(req.session.user === undefined)
    {
        res.redirect("/login");
        return;
    }
    res.render("home", { session: req.session });
});

module.exports = router;