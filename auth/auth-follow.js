const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.follow = (req, res) => 
{
    const { username, userToFollow } = req.body;
    db.query("SELECT * FROM user_following WHERE username = ? AND following = ?", [username, userToFollow], async (error, results) => 
    {
        if(error) return console.log(error);
        if(results[0]) return res.redirect(`/profile?user=${userToFollow}`);

        db.query("INSERT INTO user_following SET ?", { username: username, following: userToFollow }, (error) => 
        {
            if(error) return console.log(error);
            res.redirect(`/profile?user=${userToFollow}`);
        });
    });
};

exports.unfollow = (req, res) => 
{
    const { username, userToUnfollow } = req.body;
    db.query("DELETE FROM user_following WHERE username = ? AND following = ?", [username, userToUnfollow], (error) => 
    {
        if(error) return console.log(error);
        res.redirect(`/profile?user=${userToUnfollow}`);
    });
};