const express = require("express");
const mysql = require("mysql");

const router = express.Router();

const db = mysql.createPool({
    connectionLimit : 100,
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASSWORD, 
    database: process.env.DATABASE
});

const query = (command, params) => new Promise((resolve) => 
{
    db.getConnection((err, connection) => 
    {
        if(err) return console.log("Error when connecting to db:", err);
        connection.query(command, params, (err, results) => 
        {
            if(err) return console.error(err);
            resolve(results);
            connection.release(err => 
            {
                if(err) return console.error(err);
            });
        });
    });
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

router.get("/home", async (req, res) => 
{
    if(req.session.user === undefined) return res.redirect("/login");

    const allUsersResults = await query("SELECT username FROM users");
    res.render("home", { session: req.session.user[0], allUsers: allUsersResults });
});

router.get("/profile", async (req, res) =>
{
    if(req.session.user === undefined) return res.redirect("/login");

    const userInfoResults = await query("SELECT * FROM user_info WHERE username = ?", [req.query.user]);
    const userFollowingResults = await query("SELECT * FROM user_following WHERE username = ?", [req.query.user]);
    const userFollowersResults = await query("SELECT * FROM user_following WHERE following = ?", [req.query.user]);

    let followButtonState = true;
    if(userFollowersResults)
    {
        for(const users of userFollowersResults)
        {
            if(users.username == req.session.user[0].username) followButtonState = false;
            else followButtonState = true;
        }
    }
    else followButtonState = true;

    res.render("profile", {
        session: req.session.user[0],
        urlParamUsername: req.query.user,
        userInfo: userInfoResults,
        userFollowing: userFollowingResults,
        userFollowers: userFollowersResults,
        followBtnState: followButtonState
    });
});

router.get("/settings", async (req, res) => 
{
    if(req.session.user === undefined) return res.redirect("/login");
    const userInfoResults = await query("SELECT * FROM user_info WHERE username = ?", [req.session.user[0].username]);
    res.render("settings", { session: req.session.user[0], userInfo: userInfoResults});
});

module.exports = router;