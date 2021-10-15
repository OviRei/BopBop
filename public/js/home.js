const array = ["ExampleName", "OviRei", "sure", "ExampleName4", "ExampleName5", "123456789012345678", "ExampleName6", "ExampleName7", "ExampleName8", "ExampleName9", "uwuhello", "bopbop"];
const array2 = ["OviRei", "Sure#9025", "Rasckan", "Bljetmen", "Scrimmer", "123456789012345678", "Hooter", "Flappy", "Sebastian", "wanda", "popcat", "bopbop", "mmmcakes"];

function createButton(className, appendElementName, username)
{
    const button =  document.createElement("button");
    const appendElement = document.getElementById(appendElementName);
    appendElement.appendChild(button);
    button.classList.add(className);

    const br = document.createElement("br");
    appendElement.appendChild(br);

    const span = document.createElement("span");
    button.appendChild(span);
    span.innerHTML = username;
}

for(const username of array)
{
    createButton("users-button", "messagesButtonAppend", username);
}

for(const username of array2)
{
    createButton("users-button", "usersButtonAppend", username);
}