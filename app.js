const path = require("path");
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const session = require("express-session");

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 5000;

const DBcreateConnection = () => mysql.createConnection({ host: process.env.DATABASE_HOST, user: process.env.DATABASE_USER, password: process.env.DATABASE_PASSWORD, database: process.env.DATABASE });
const db = DBcreateConnection();

db.connect(function(error) 
{
    if(error) console.log("Error when connecting to db:", error);
    else console.log("MYSQL Connected...");
});

db.query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(18), email VARCHAR(255), password VARCHAR(255))", async (error) => 
{
    if(error) return console.log(error);
    db.query("CREATE TABLE IF NOT EXISTS user_info (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(18), bio VARCHAR(255), joinDate VARCHAR(10), pfp BLOB)", async (error) => 
    {
        if(error) return console.log(error);
        db.query("CREATE TABLE IF NOT EXISTS user_following (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(18), following VARCHAR(18))", async (error) => 
        {
            if(error) return console.log(error);
            db.end();
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