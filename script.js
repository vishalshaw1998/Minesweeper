var container = document.createElement("div");
container.setAttribute("class", "container");

divForText = document.createElement("div");
divForText.setAttribute("class", "text-center padding-top font-krona");
divForText.innerHTML = "<span>Lets Play Minesweeper</span>";

var divForButton = document.createElement("div");
divForButton.setAttribute("class", "text-center margin-top");
var a = document.createElement("a");
a.setAttribute("href", "#");
a.innerHTML = "Click to Play";
divForButton.appendChild(a);

container.appendChild(divForText);
container.appendChild(divForButton);
document.body.appendChild(container);
