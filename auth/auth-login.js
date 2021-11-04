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

exports.register = async (req, res) => 
{
    const { username, email, password, passwordConfirm } = req.body;

    const usernameResults = await query("SELECT username FROM users WHERE username = ?", [username]);
    const emailResults = await query("SELECT email FROM users WHERE email = ?", [email]);

    if(usernameResults.length > 0) return res.redirect(`/register?error=${encodeURIComponent("Username_Inuse")}`);
    else if(emailResults.length > 0) return res.redirect(`/register?error=${encodeURIComponent("Email_Inuse")}`);
    else if(password !== passwordConfirm) return res.redirect(`/register?error=${encodeURIComponent("Passwords_Dont_Match")}`);

    bcrypt.hash(password, 10, async function(error, hashedPassword) 
    {
        if(error) return console.log(error);

        await query("INSERT INTO users SET ?", {username: username, email: email, password: hashedPassword});

        const dateObj = new Date();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const year = dateObj.getUTCFullYear();
        const date = `${day}/${month}/${year}`;

        await query("INSERT INTO user_info SET ?", {username: username, bio: "Hello this in my bio!", joinDate: date, pfp: null});
        res.redirect("/login");    
    });
};

exports.login = async (req, res) => 
{
    const { email, password } = req.body;

    const userResults = await query("SELECT * FROM users WHERE email = ?", [email]);

    if(!userResults[0] || userResults[0].email != email) return res.redirect(`/login?error=${encodeURIComponent("Invaild_Credentials")}`);
    
    bcrypt.compare(password, userResults[0].password, function(error, result)
    {
        if(error) return console.log(error);
        if(!result) return res.redirect(`/login?error=${encodeURIComponent("Invaild_Credentials")}`);

        req.session.user = userResults;
        res.redirect("/home");
    });
};

exports.logout = (req, res) => 
{
    req.session.user = null;
    res.redirect("/login");
};