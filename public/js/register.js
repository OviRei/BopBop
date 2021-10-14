/* eslint-disable indent */
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("error");

switch(myParam)
{
    case "Username_Inuse":
        document.getElementById("warningAlert").style.display = "block";
        document.getElementById("warningAlertText").innerHTML = "That username is already in use";
        document.getElementById("warningAlertText").scrollIntoView();
        break;
    case "Email_Inuse":
        document.getElementById("warningAlert").style.display = "block";
        document.getElementById("warningAlertText").innerHTML = "That email is already in use";
        document.getElementById("warningAlertText").scrollIntoView();
        break;
    case "Passwords_Dont_Match":
        document.getElementById("warningAlert").style.display = "block";
        document.getElementById("warningAlertText").innerHTML = "Your passwords don't match";
        document.getElementById("warningAlertText").scrollIntoView();
        break;
    default:
        document.getElementById("warningAlert").style.display = "none";
}