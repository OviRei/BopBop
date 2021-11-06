/* eslint-disable indent */
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("error");
const btn = document.createElement("SPAN");

switch(myParam)
{
    case "Invaild_Credentials":
        document.getElementById("warningAlert").style.display = "block";
        document.getElementById("warningAlertText").innerHTML = "The credentials you have entered are invalid";
        
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