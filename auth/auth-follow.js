const mysql = require("mysql");

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

exports.follow = async (req, res) => 
{
    const { username, userToFollow } = req.body;

    const results = await query("SELECT * FROM user_following WHERE username = ? AND following = ?", [username, userToFollow]);
    if(results.length > 0) return res.redirect(`/profile?user=${userToFollow}`);
    if(username == userToFollow) return res.redirect(`/profile?user=${userToFollow}`);

    await query("INSERT INTO user_following SET ?", { username: username, following: userToFollow });
    res.redirect(`/profile?user=${userToFollow}`);
};

exports.unfollow = async (req, res) => 
{
    const { username, userToUnfollow } = req.body;

    await query("DELETE FROM user_following WHERE username = ? AND following = ?", [username, userToUnfollow]);
    res.redirect(`/profile?user=${userToUnfollow}`);
};