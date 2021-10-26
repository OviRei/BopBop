const path = require("path");
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const session = require("express-session");

dotenv.config({ path: "./.env" });

const app = express();
const port = 5000;

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect((error) => 
{
    if(error) console.log(error);
    else console.log("MYSQL Connected...");
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