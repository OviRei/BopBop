# BopBop
"BopBop" is a twitter-like website i'm working on.

Features:
* Register and login
* Passwords are hashed using bcrypt
* Follow other users
* Message other users
* Posts things
* Customise their own profile (by customise i mean you can only change your avatar and bio)
* Change username, email, password in settings page

I created this project using:
* JavaScript
* Ejs
* CSS
* Bootstrap
* Express.js
* MySQL

## Download project
1. Clone the project `git clone https://github.com/OviRei/BopBop`
2. Download and install [MySQL](https://dev.mysql.com/downloads/installer/)
3. Create a database called "bopbop_db"
4. Create a file called `.env` in the root directory
5. Put this in the file and replace the [x] with the correct information:
  ```
   DATABASE = bopbop_db
   DATABASE_HOST = localhost
   DATABASE_USER = [mysql username]
   DATABASE_PASSWORD = [mysql password]
   PORT = 5000;
  ```
6. Run `npm install`
7. Run `npm start`
8. Go to `localhost:5000` in your browser
