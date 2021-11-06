/* eslint-disable indent */
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("error");
const btn = document.createElement("SPAN");

switch(myParam)
{
    case "Username_Inuse":
        document.getElementById("warningAlert").style.display = "block";
        document.getElementById("warningAlert").style.marginLeft = "-165px";
        document.getElementById("warningAlertText").innerHTML = "That username is already in use";

        btn.innerHTML = "&times;";
        btn.classList.add("closebtn");
        document.getElementById("warningAlertText").appendChild(btn);   
        break;
    case "Email_Inuse":
        document.getElementById("warningAlert").style.display = "block";
        document.getElementById("warningAlert").style.marginLeft = "-145px";
        document.getElementById("warningAlertText").innerHTML = "That email is already in use";

        btn.innerHTML = "&times;";
        btn.classList.add("closebtn");
        document.getElementById("warningAlertText").appendChild(btn);   
        break;
    case "Passwords_Dont_Match":
        document.getElementById("warningAlert").style.display = "block";
        document.getElementById("warningAlert").style.marginLeft = "-153px";
        document.getElementById("warningAlertText").innerHTML = "Your passwords don't match";

        btn.innerHTML = "&times;";
        btn.classList.add("closebtn");
        document.getElementById("warningAlertText").appendChild(btn);   
        break;
    default:
        document.getElementById("warningAlert").style.display = "none";
}

const close = document.getElementsByClassName("closebtn");
let i;
for(i = 0; i < close.length; i++) 
{
    close[i].onclick = function()
    {
        const div = this.parentElement.parentElement.parentElement;
        div.style.opacity = "0";
        setTimeout(function() 
        {
            div.style.display = "none";
        }, 600);
    };
}