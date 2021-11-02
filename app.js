const path = require("path");
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const session = require("express-session");

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT;

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

function handleError() 
{
    db.connect(function(error) 
    {
        if(error) 
        {
            console.log("Error when connecting to db:", error);
            setTimeout(handleError, 2000);
        }
        else console.log("MYSQL Connected...");
    });

    db.on("error", function(error) 
    {
        console.log("DB error:", error);
        if(error.code === "PROTOCOL_CONNECTION_LOST" || error.code === "ECONNRESET")  handleError();
        else throw error;
    });
}
handleError();

//Stops MySQL connecting from getting pruned after being idle
function reconnect_timeout()
{
    const date = new Date().toString();
    db.query("show variables like 'wait_timeout'", function(error) 
    {
        if(error) console.log("Error while trying to keep the connecting alive:", error);
        else 
        {
            process.stdout.write("\r\x1b[K");
            process.stdout.write(`Last refresh: ${date}`);
        }
    });
}
reconnect_timeout();
setInterval(reconnect_timeout, 15*1000);

db.query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(18), email VARCHAR(255), password VARCHAR(255))", async (error) => 
{
    if(error) return console.log(error);
    db.query("CREATE TABLE IF NOT EXISTS user_info (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(18), bio VARCHAR(255), joinDate VARCHAR(10), pfp BLOB)", async (error) => 
    {
        if(error) return console.log(error);
        db.query("CREATE TABLE IF NOT EXISTS user_following (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(18), following VARCHAR(18))", async (error) => 
        {
            if(error) return console.log(error);
        });
    });
});

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

app.use(session({ secret: "sure#9025" }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(port, () => 
{
    console.log(`Server started on port: ${port}`);
});