const mysql = require("mysql");
const bcrypt = require("bcryptjs");

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

exports.changeusername = async (req, res) => 
{
    const { username, newUsername } = req.body;

    const usernameResults = await query("SELECT username FROM users WHERE username = ?", [newUsername]);
    if(usernameResults.length > 0) return res.redirect(`/register?error=${encodeURIComponent("Username_Inuse")}`);

    await query("UPDATE user_info SET username = ? WHERE username = ?", [newUsername, username]);
    await query("UPDATE users SET username = ? WHERE username = ?", [newUsername, username]);
    await query("UPDATE user_following SET username = ? WHERE username = ?", [newUsername, username]);
    await query("UPDATE user_following SET following = ? WHERE following = ?", [newUsername, username]);

    req.session.user[0].username = newUsername;
    res.redirect(`/profile?user=${newUsername}`);
};

exports.changeemail = async (req, res) => 
{
    const { username, newEmail } = req.body;

    const emailResults = await query("SELECT email FROM users WHERE email = ?", [newEmail]);
    if(emailResults.length > 0) return res.redirect(`/register?error=${encodeURIComponent("Email_Inuse")}`);

    await query("UPDATE user_info SET email = ? WHERE username = ?", [newEmail, username]);
    await query("UPDATE users SET email = ? WHERE username = ?", [newEmail, username]);

    req.session.user[0].email = newEmail;
    res.redirect(`/profile?user=${username}`);
};

exports.changepassword = (req, res) => 
{
    const { username, newPassword, newPasswordConfirm } = req.body;

    if(newPassword !== newPasswordConfirm) return res.redirect(`/settings?error=${encodeURIComponent("Passwords_Dont_Match")}`);
    bcrypt.hash(newPassword, 10, async function(error, hashedPassword) 
    {
        if(error) return console.log(error);
        await query("UPDATE users SET password = ? WHERE username = ?", [hashedPassword, username]);
        req.session.user[0].password = hashedPassword;
        res.redirect("/login");
    });
};

exports.changeavatar = async (req, res) => 
{
    const { username } = req.body;

    await query("SELECT username FROM users WHERE username = ?", [username]);
    res.redirect(`/profile?user=${username}`);
};

exports.changebio = async (req, res) => 
{
    const { username, newBio } = req.body;

    await query("UPDATE user_info SET bio = ? WHERE username = ?", [newBio, username]);
    res.redirect(`/profile?user=${username}`);
};

exports.deleteaccount = async (req, res) => 
{
    const { username } = req.body;

    await query("DELETE FROM user_info SET username = ? WHERE username = ?", [username]);
    await query("DELETE FROM users SET username = ? WHERE username = ?", [username]);
    await query("DELETE FROM user_following SET username = ? WHERE username = ?", [username]);
    await query("DELETE FROM user_following SET following = ? WHERE following = ?", [username]);

    res.redirect(`/profile?user=${username}`);
};