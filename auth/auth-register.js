const mysql = require("mysql");
//const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => 
{
    const { username, email, password, passwordConfirm } = req.body;

    db.query("SELECT username FROM users WHERE username = ?", [username], async (error, results) => 
    {
        if(error) return console.log(error);
        else if(results.length > 0) return res.redirect(`/register?error=${encodeURIComponent("Username_Inuse")}`);

        db.query("SELECT email FROM users WHERE email = ?", [email], async (error, results) => 
        {
            if(error) return console.log(error);
            else if(results.length > 0) return res.redirect(`/register?error=${encodeURIComponent("Email_Inuse")}`);
            else if(password !== passwordConfirm) return res.redirect(`/register?error=${encodeURIComponent("Passwords_Dont_Match")}`);

            // eslint-disable-next-line prefer-const
            let hashedPassword = await bcrypt.hash(password, 8);

            db.query("INSERT INTO users SET ?", {username: username, email: email, password: hashedPassword}, (error) => 
            {
                if(error) return console.log(error);
                else res.redirect(`/register?error=${encodeURIComponent("User_Registered")}`);
            });
        });
    });
};