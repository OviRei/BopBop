const mysql = require("mysql");
//const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = (req, res) => 
{
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (error, results) => 
    {
        if(error) return console.log(error);
        if(!results[0] || results[0].email != email) return res.redirect(`/login?error=${encodeURIComponent("Invaild_Credentials")}`);

        bcrypt.compare(password, results[0].password, function(error, result)
        {
            if(error) return console.log(error);
            if(!result) return res.redirect(`/login?error=${encodeURIComponent("Invaild_Credentials")}`);

            res.redirect("/home");
        });
    });
};