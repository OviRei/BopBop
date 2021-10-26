const mysql = require("mysql");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.changeusername = (req, res) => 
{
    const { username, newUsername } = req.body;

    db.query("UPDATE user_info SET username = ? WHERE username = ?", [newUsername, username], async (error) => 
    {
        if(error) return console.log(error);
        db.query("UPDATE users SET username = ? WHERE username = ?", [newUsername, username], async (error) => 
        {
            if(error) return console.log(error);
            req.session.user[0].username = newUsername;
            res.redirect(`/profile?user=${newUsername}`);
        });
    });
};

exports.changeemail = (req, res) => 
{
    const { username, newEmail } = req.body;

    db.query("UPDATE user_info SET email = ? WHERE username = ?", [newEmail, username], async (error) => 
    {
        if(error) return console.log(error);
        db.query("UPDATE users SET email = ? WHERE username = ?", [newEmail, username], async (error) => 
        {
            if(error) return console.log(error);
            req.session.user[0].email = newEmail;
            res.redirect(`/profile?user=${username}`);
        });
    });
};

exports.changepassword = (req, res) => 
{
    const { username, newPassword, newPasswordConfirm } = req.body;

    if(newPassword !== newPasswordConfirm) return res.redirect(`/settings?error=${encodeURIComponent("Passwords_Dont_Match")}`);
    bcrypt.hash(newPassword, 10, function(error, hashedPassword) 
    {
        if(error) return console.log(error);
        db.query("UPDATE users SET password = ? WHERE username = ?", [hashedPassword, username], async (error) => 
        {
            if(error) return console.log(error);
            req.session.user[0].password = hashedPassword;
            res.redirect("/login");
        });
    });
};

exports.changeavatar = (req, res) => 
{
    const { username } = req.body;

    db.query("SELECT username FROM users WHERE username = ?", [username], async (error) => 
    {
        if(error) return console.log(error);
        res.redirect(`/profile?user=${username}`);
    });
};

exports.changebio = (req, res) => 
{
    const { username, newBio } = req.body;

    db.query("UPDATE user_info SET bio = ? WHERE username = ?", [newBio, username], async (error) => 
    {
        if(error) return console.log(error);
        res.redirect(`/profile?user=${username}`);
    });
};

exports.deleteaccount = (req, res) => 
{
    const { username } = req.body;

    db.query("SELECT username FROM users WHERE username = ?", [username], async (error) => 
    {
        if(error) return console.log(error);
        res.redirect(`/profile?user=${username}`);
    });
};