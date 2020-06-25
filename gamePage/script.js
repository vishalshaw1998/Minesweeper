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
    score.innerHTML = 0;
});

//set Timer running
function myTimer() {
    var newDate = new Date().getTime();
    dis = d - newDate;
    var sec = document.getElementById("seconds");
    var mints = document.getElementById("minutes");
    var inMins = Math.floor((dis % (1000 * 60 * 60)) / (1000 * 60));
    var inSec = Math.floor((dis % (1000 * 60)) / 1000);
    sec.innerHTML = inSec;
    mints.innerHTML = "0" + inMins;
    if (dis < 0) {
        sec.innerHTML = 0;
        mints.innerHTML = "0" + 0;
    }
}

arrOfElements = [];

for (var i = 3; i < 19; i++) {
    var tempRow = document.createElement("div");
    tempRow.setAttribute("class", "row " + `row-${i}`);
    for (var j = 1; j < 17; j++) {
        var tempCol = document.createElement("div");
        tempCol.setAttribute("class", "col inside " + `col-${i}--${j}`);
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = "";
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
            .innerHTML == "Mi"
    ) {
        while (
            arrOfElements[randomRow].childNodes[randomCol].childNodes[0]
                .innerHTML == "Mi"
        ) {
            randomRow = Math.floor(Math.random() * 16);
            randomCol = Math.floor(Math.random() * 16);
        }
    }
    arrOfElements[randomRow].childNodes[randomCol].childNodes[0].innerHTML =
        "Mi";
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

// var temp = resArr[20];
// var attr = temp.getAttribute("class");
// attr = attr.split("-");
// var row = attr[attr.length - 3];
// var col = attr[attr.length - 1];
// var leftElement = document.getElementsByClassName(`col-${row}--${col - 1}`)[0];
// if (leftElement.childNodes[0].innerHTML == "") {
//     if (temp.childNodes[0].innerHTML == "") {
//         console.log("Hello");
//     } else {
//         console.log("Hii");
//     }
// }

resArr.forEach((item) => {
    var tempStr = item.getAttribute("class");
    tempStr = tempStr.split("-");
    var tempRow1 = parseInt(tempStr[tempStr.length - 3]);
    var tempCol1 = parseInt(tempStr[tempStr.length - 1]);
    //checkleft
    if (item.childNodes[0].innerHTML != "Mi") {
        if (tempCol1 - 1 != 0) {
            var leftElement = document.getElementsByClassName(
                `col-${tempRow1}--${tempCol1 - 1}`
            )[0];
            if (leftElement.childNodes[0].innerHTML == "Mi") {
                if (item.childNodes[0].innerHTML == "") {
                    item.childNodes[0].innerHTML = 1;
                } else {
                    item.childNodes[0].innerHTML += 1;
                }
            }
        }
        //checkRight
        if (tempCol1 + 1 != 17) {
            var rightElement = document.getElementsByClassName(
                `col-${tempRow1}--${tempCol1 + 1}`
            )[0];
            if (rightElement.childNodes[0].innerHTML == "Mi") {
                if (item.childNodes[0].innerHTML == "") {
                    item.childNodes[0].innerHTML = 1;
                } else {
                    item.childNodes[0].innerHTML =
                        parseInt(item.childNodes[0].innerHTML) + parseInt(1);
                }
            }
        }
        //CheckTop
        if (tempRow1 - 1 != 2) {
            var topElement = document.getElementsByClassName(
                `col-${tempRow1 - 1}--${tempCol1}`
            )[0];
            if (topElement.childNodes[0].innerHTML == "Mi") {
                if (item.childNodes[0].innerHTML == "") {
                    item.childNodes[0].innerHTML = parseInt(1);
                } else {
                    item.childNodes[0].innerHTML =
                        parseInt(item.childNodes[0].innerHTML) + parseInt(1);
                }
            }
        }
        //Checkottom
        if (tempRow1 + 1 != 19) {
            var bottomElement = document.getElementsByClassName(
                `col-${tempRow1 + 1}--${tempCol1}`
            )[0];
            if (bottomElement.childNodes[0].innerHTML == "Mi") {
                if (item.childNodes[0].innerHTML == "") {
                    item.childNodes[0].innerHTML = parseInt(1);
                } else {
                    item.childNodes[0].innerHTML =
                        parseInt(item.childNodes[0].innerHTML) + parseInt(1);
                }
            }
        }
        //Check Diagonal NW
        if (tempRow1 - 1 != 2 && tempCol1 - 1 != 0) {
            var diagonalUpElement = document.getElementsByClassName(
                `col-${tempRow1 - 1}--${tempCol1 - 1}`
            )[0];
            if (diagonalUpElement.childNodes[0].innerHTML == "Mi") {
                if (item.childNodes[0].innerHTML == "") {
                    item.childNodes[0].innerHTML = parseInt(1);
                } else {
                    item.childNodes[0].innerHTML =
                        parseInt(item.childNodes[0].innerHTML) + parseInt(1);
                }
            }
        }
        //Check Diagonal SE
        if (tempRow1 + 1 != 19 && tempCol1 + 1 != 17) {
            var diagonalDownElement = document.getElementsByClassName(
                `col-${tempRow1 + 1}--${tempCol1 + 1}`
            )[0];
            if (diagonalDownElement.childNodes[0].innerHTML == "Mi") {
                if (item.childNodes[0].innerHTML == "") {
                    item.childNodes[0].innerHTML = parseInt(1);
                } else {
                    item.childNodes[0].innerHTML =
                        parseInt(item.childNodes[0].innerHTML) + parseInt(1);
                }
            }
        }
        //Check Diagonal NE
        if (tempRow1 - 1 != 2 && tempCol1 + 1 != 17) {
            var diagonalNEElement = document.getElementsByClassName(
                `col-${tempRow1 - 1}--${tempCol1 + 1}`
            )[0];
            if (diagonalNEElement.childNodes[0].innerHTML == "Mi") {
                if (item.childNodes[0].innerHTML == "") {
                    item.childNodes[0].innerHTML = parseInt(1);
                } else {
                    item.childNodes[0].innerHTML =
                        parseInt(item.childNodes[0].innerHTML) + parseInt(1);
                }
            }
        }
        //Check Diagonal SW
        if (tempRow1 + 1 != 19 && tempCol1 - 1 != 0) {
            var diagonalSWElement = document.getElementsByClassName(
                `col-${tempRow1 + 1}--${tempCol1 - 1}`
            )[0];
            if (diagonalSWElement.childNodes[0].innerHTML == "Mi") {
                if (item.childNodes[0].innerHTML == "") {
                    item.childNodes[0].innerHTML = parseInt(1);
                } else {
                    item.childNodes[0].innerHTML =
                        parseInt(item.childNodes[0].innerHTML) + parseInt(1);
                }
            }
        }
    }
});
