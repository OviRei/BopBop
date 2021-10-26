const express = require("express");
const mysql = require("mysql");

const router = express.Router();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

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
    if(req.session.user === undefined) return res.redirect("/login");
    
    db.query("SELECT username FROM users", function (err, results) 
    {
        res.render("home", { session: req.session.user[0], allUsers: results });
    });
});

router.get("/profile", (req, res) =>
{
    if(req.session.user === undefined) return res.redirect("/login");

    db.query("SELECT * FROM user_info WHERE username = ?", [req.query.user], async (error, results) =>
    {
        const userInfoResults = results;
        db.query("SELECT * FROM user_following WHERE username = ?", [req.query.user], async (error, results) =>
        {
            const userFollowingResults = results;
            db.query("SELECT * FROM user_following WHERE following = ?", [req.query.user], async (error, results) =>
            {
                const userFollowersResults = results;
                let followButtonState = true;
                for(const users of userFollowersResults)
                {
                    if(users.username == req.session.user[0].username) followButtonState = false;
                    else followButtonState = true;
                }
                res.render("profile", { 
                    session: req.session.user[0],
                    urlParamUsername: req.query.user,
                    userInfo: userInfoResults,
                    userFollowing: userFollowingResults,
                    userFollowers: userFollowersResults,
                    followBtnState: followButtonState
                });
            });
        });
    });
});

router.get("/settings", (req, res) => 
{
    if(req.session.user === undefined) return res.redirect("/login");

    db.query("SELECT * FROM user_info WHERE username = ?", [req.session.user[0].username], async (error, results) =>
    {
        res.render("settings", { session: req.session.user[0], userInfo: results});
    });
});

module.exports = router;