var container = document.createElement("div");
container.setAttribute("class", "container");

divForText = document.createElement("div");
divForText.setAttribute("class", "text-center");
divForText.innerHTML = "<span>Lets Play Minesweeper</span>";

var divForButton = document.createElement("div");
divForButton.setAttribute("class", "text-center");
var btn = document.createElement("button");
btn.innerHTML = "<a href = '#'>Play</a>";
divForButton.appendChild(btn);

container.appendChild(divForText);
container.appendChild(divForButton);
document.body.appendChild(container);
