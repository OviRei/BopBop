/* eslint-disable indent */
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("error");

switch(myParam)
{
    case "Invaild_Credentials":
        document.getElementById("warningAlert").style.display = "block";
        document.getElementById("warningAlert").children[0].innerHTML = "The credentials you have entered it wrong";
        break;
    case "User_Loggedin":
        document.getElementById("warningAlert").style.display = "block";
        document.getElementById("warningAlert").children[0].innerHTML = "User logged in :)";
        break;
    default:
        document.getElementById("warningAlert").style.display = "none";
}