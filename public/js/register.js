/* eslint-disable indent */
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("error");

switch(myParam)
{
    case "Username_Inuse":
        document.getElementById("warningAlert").style.display = "block";
        document.getElementById("warningAlert").children[0].innerHTML = "That username is already in use";
        break;
    case "Email_Inuse":
        document.getElementById("warningAlert").style.display = "block";
        document.getElementById("warningAlert").children[0].innerHTML = "That email is already in use";
        break;
    case "Passwords_Dont_Match":
        document.getElementById("warningAlert").style.display = "block";
        document.getElementById("warningAlert").children[0].innerHTML = "Your passwords don't match";
        break;
    case "User_Registered":
        document.getElementById("warningAlert").style.display = "block";
        document.getElementById("warningAlert").children[0].innerHTML = "User registered :)";
        break;
    default:
        document.getElementById("warningAlert").style.display = "none";
}