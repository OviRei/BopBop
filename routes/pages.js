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

router.get("/profile", (req, res) => 
{
    if(req.session.user === undefined)
    {
        res.redirect("/login");
        return;
    }
    res.render("profile", { session: req.session });
});

router.get("/settings", (req, res) => 
{
    if(req.session.user === undefined)
    {
        res.redirect("/login");
        return;
    }
    res.render("settings", { session: req.session });
});

module.exports = router;