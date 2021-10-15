/* eslint-disable indent */
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("error");

switch(myParam)
{
    case "Invaild_Credentials":
        document.getElementById("warningAlert").style.display = "block";
        document.getElementById("warningAlertText").innerHTML = "The credentials you have entered are invalid";
        break;
    default:
        document.getElementById("warningAlert").style.display = "none";
}