var container = document.createElement("div");
container.setAttribute("class", "container");

var row1 = document.createElement("div");
row1.setAttribute("class", "row");

var row1col1 = document.createElement("div");
row1col1.setAttribute("class", "col-sm-6");
row1col1.innerHTML =
    "<span class = 'ctdn text-bold'>Score</span><span id = 'score' class = 'ctdn text-bold'>0</span>";

row1.appendChild(row1col1);

var row1col2 = document.createElement("div");
row1col2.setAttribute("class", "col-sm-6 align-left ");
row1col2.innerHTML =
    "<span class = 'ctdn text-bold'>Time Countdown</span><span span id = 'timer' class = 'ctdn text-bold'><span id='minutes'>00</span>:<span id='seconds'>00</span></span>";

row1.appendChild(row1col2);

var row2 = document.createElement("div");
row2.setAttribute("class", "row margin-top");
var row2col1 = document.createElement("div");
row2col1.setAttribute("class", "col-sm-12 offset-5");
row2col1.innerHTML =
    "<button type='button' id = 'play' class='btn btn-dark'>Play</button>";

row2.appendChild(row2col1);
container.appendChild(row1);
container.appendChild(row2);
document.body.appendChild(container);

var btn = document.getElementById("play");
btn.addEventListener("click", () => {
    d = new Date().getTime() + 300000;
    interval = setInterval(myTimer, 1000);
    var score = document.getElementById("score");
    score.innerText = 0;
});

//set Timer running
function myTimer() {
    var newDate = new Date().getTime();
    dis = d - newDate;
    var sec = document.getElementById("seconds");
    var mints = document.getElementById("minutes");
    var inMins = Math.floor((dis % (1000 * 60 * 60)) / (1000 * 60));
    var inSec = Math.floor((dis % (1000 * 60)) / 1000);
    sec.innerText = inSec;
    mints.innerText = "0" + inMins;
    if (dis < 0) {
        sec.innerText = 0;
        mints.innerText = "0" + 0;
    }
}

arrOfElements = [];

for (var i = 3; i < 19; i++) {
    var tempRow = document.createElement("div");
    tempRow.setAttribute("class", "row " + `row-${i}`);
    for (var j = 1; j < 17; j++) {
        var tempCol = document.createElement("div");
        tempCol.setAttribute("class", "col inside " + `col-${i}${j}`);
        var tempDiv = document.createElement("div");
        tempDiv.innerText = "Hello";
        tempCol.appendChild(tempDiv);
        tempRow.appendChild(tempCol);
    }
    console.log(tempRow);
    container.appendChild(tempRow);
    arrOfElements.push(tempRow);
}
console.log(arrOfElements);
//Random Mines
for (var i = 0; i < 40; i++) {
    randomRow = Math.floor(Math.random() * 16);
    randomCol = Math.floor(Math.random() * 16);
    if (
        arrOfElements[randomRow].childNodes[randomCol].childNodes[0]
            .innerText == "M"
    ) {
        while (
            arrOfElements[randomRow].childNodes[randomCol].childNodes[0]
                .innerText == "M"
        ) {
            randomRow = Math.floor(Math.random() * 16);
            randomCol = Math.floor(Math.random() * 16);
        }
    }
    arrOfElements[randomRow].childNodes[randomCol].childNodes[0].innerText =
        "M";
}

arrOfElements.forEach((item) => {
    item.childNodes.forEach((item) => {
        item.childNodes[0].style.visibility = "hidden";
    });
});

var resArr = document.querySelectorAll(".inside");
resArr.forEach((item) => {
    item.addEventListener("click", () => {
        item.childNodes[0].style.visibility = "visible";
    });
});
