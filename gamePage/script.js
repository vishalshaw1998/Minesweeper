var container = document.createElement("div");
container.setAttribute("class", "container-fluid");

var row1 = document.createElement("div");
row1.setAttribute("class", "row");

var row1col1 = document.createElement("div");
row1col1.setAttribute("class", "col-sm-6");
row1col1.innerHTML =
    "<span class = 'ctdn text-bold'>Score</span><span id = 'score' class = 'ctdn text-bold'>0</span>";

row1.appendChild(row1col1);

var row1col2 = document.createElement("div");
row1col2.setAttribute("class", "col-sm-6 align-right ");
row1col2.innerHTML =
    "<span class = 'ctdn text-bold'>Time Countdown</span><span span id = 'timer' class = 'ctdn text-bold'><span id='minutes'>00</span>:<span id='seconds'>00</span></span>";

row1.appendChild(row1col2);

var row2 = document.createElement("div");
row2.setAttribute("class", "row margin-top");
var row2col1 = document.createElement("div");
row2col1.setAttribute("class", "col-sm-12 offset-5");
row2col1.innerHTML =
    "<button type='button' id = 'play' class='btn btn-dark'>Play</button>";

var forTheGrid = document.createElement("div");
forTheGrid.setAttribute("class", "forGrid bottom-margin");

row2.appendChild(row2col1);
container.appendChild(row1);
container.appendChild(row2);
container.appendChild(forTheGrid);
document.body.appendChild(container);

var btn = document.getElementById("play");
btn.addEventListener("click", () => {
    d = new Date().getTime() + 300000;
    interval = setInterval(myTimer, 1000);
    var score = document.getElementById("score");
    forTheGrid.style.visibility = "visible";
    score.innerHTML = 0;
    btn.setAttribute("disabled", "");
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
        clearInterval(interval);
        var score1 = document.getElementById("score").innerHTML;
        console.log(score1);
        while (container.childNodes.length != 0) {
            container.removeChild(container.childNodes[0]);
        }
        var divBoth = document.createElement("div");
        divBoth.setAttribute("class", "margin-top1");
        var tempForScore = document.createElement("div");
        var textThankYou = document.createElement("div");
        tempForScore.setAttribute("class", "center-align text-bold large");
        textThankYou.setAttribute("class", "center-align text-bold large");
        textThankYou.innerHTML = "Thank You For Playing";
        tempForScore.innerHTML = "Your Score is : - " + "<br>" + score1;
        divBoth.appendChild(textThankYou);
        divBoth.appendChild(tempForScore);
        container.setAttribute("id", "container1");
        container.setAttribute("class", "fluid-container");

        var divForButton = document.createElement("div");
        divForButton.setAttribute("class", "text-center margin-top");
        var a = document.createElement("a");
        a.setAttribute("href", "../index.html");
        a.innerHTML = "Go To Homepage";
        divForButton.appendChild(a);

        container.appendChild(divBoth);
        container.appendChild(divForButton);
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
    forTheGrid.appendChild(tempRow);
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
    var tempStr = item.getAttribute("class");
    tempStr = tempStr.split("-");
    var tempRow1 = parseInt(tempStr[tempStr.length - 3]);
    var tempCol1 = parseInt(tempStr[tempStr.length - 1]);
    if (item.childNodes[0].innerHTML != "Mi") {
        //checkleft
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
        //Checkbottom
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
visitedParent = [];
resArr.forEach((item) => {
    item.addEventListener("click", () => {
        item.childNodes[0].style.visibility = "visible";
        item.style.backgroundColor = "white";

        if (item.childNodes[0].innerHTML == "Mi") {
            clearInterval(interval);
            var score1 = document.getElementById("score").innerHTML;
            console.log(score1);
            while (container.childNodes.length != 0) {
                container.removeChild(container.childNodes[0]);
            }
            var divBoth = document.createElement("div");
            divBoth.setAttribute("class", "margin-top1");
            var tempForScore = document.createElement("div");
            var textThankYou = document.createElement("div");
            tempForScore.setAttribute("class", "center-align text-bold large");
            textThankYou.setAttribute("class", "center-align text-bold large");
            textThankYou.innerHTML = "Thank You For Playing";
            tempForScore.innerHTML = "Your Score is : - " + "<br>" + score1;
            divBoth.appendChild(textThankYou);
            divBoth.appendChild(tempForScore);
            container.setAttribute("id", "container1");
            container.setAttribute("class", "fluid-container");

            var divForButton = document.createElement("div");
            divForButton.setAttribute("class", "text-center margin-top");
            var a = document.createElement("a");
            a.setAttribute("href", "../index.html");
            a.innerHTML = "Go To Homepage";
            divForButton.appendChild(a);

            container.appendChild(divBoth);
            container.appendChild(divForButton);
        } else if (item.childNodes[0].innerHTML == "") {
            var queue = [];
            var visited = [];
            var withNumber = [];
            queue.push(item);
            while (queue.length != 0) {
                temp = queue.shift();
                classOfTempBox = temp.getAttribute("class");
                classOfTempBox = classOfTempBox.split("-");
                rowOfTempBox = parseInt(
                    classOfTempBox[classOfTempBox.length - 3]
                );
                colOfTempBox = parseInt(
                    classOfTempBox[classOfTempBox.length - 1]
                );
                if (!visitedParent.includes(temp)) {
                    visitedParent.push(temp);
                }
                //check left
                if (colOfTempBox - 1 != 0) {
                    var leftOfTempBox = document.getElementsByClassName(
                        `col-${rowOfTempBox}--${colOfTempBox - 1}`
                    )[0];
                    if (leftOfTempBox.childNodes[0].innerHTML.length == 0) {
                        leftOfTempBox.childNodes[0].style.visibility =
                            "visible";
                        leftOfTempBox.style.backgroundColor = "white";
                        if (!visited.includes(leftOfTempBox)) {
                            visited.push(leftOfTempBox);
                            queue.push(leftOfTempBox);
                        }
                        if (!visitedParent.includes(leftOfTempBox)) {
                            visitedParent.push(leftOfTempBox);
                        }
                    } else {
                        leftOfTempBox.childNodes[0].style.visibility =
                            "visible";
                        leftOfTempBox.style.backgroundColor = "white";
                        if (!withNumber.includes(leftOfTempBox)) {
                            withNumber.push(leftOfTempBox);
                        }
                        if (!visitedParent.includes(leftOfTempBox)) {
                            visitedParent.push(leftOfTempBox);
                        }
                    }
                }
                //check right
                if (colOfTempBox + 1 != 17) {
                    var rightOfTempBox = document.getElementsByClassName(
                        `col-${rowOfTempBox}--${colOfTempBox + 1}`
                    )[0];
                    if (rightOfTempBox.childNodes[0].innerHTML.length == 0) {
                        rightOfTempBox.childNodes[0].style.visibility =
                            "visible";
                        rightOfTempBox.style.backgroundColor = "white";
                        if (!visited.includes(rightOfTempBox)) {
                            visited.push(rightOfTempBox);
                            queue.push(rightOfTempBox);
                        }
                        if (!visitedParent.includes(rightOfTempBox)) {
                            visitedParent.push(rightOfTempBox);
                        }
                    } else {
                        rightOfTempBox.childNodes[0].style.visibility =
                            "visible";
                        rightOfTempBox.style.backgroundColor = "white";
                        if (!withNumber.includes(rightOfTempBox)) {
                            withNumber.push(rightOfTempBox);
                        }
                        if (!visitedParent.includes(rightOfTempBox)) {
                            visitedParent.push(rightOfTempBox);
                        }
                    }
                }
                //check top
                if (rowOfTempBox - 1 != 2) {
                    var topOfTempBox = document.getElementsByClassName(
                        `col-${rowOfTempBox - 1}--${colOfTempBox}`
                    )[0];
                    if (topOfTempBox.childNodes[0].innerHTML.length == 0) {
                        topOfTempBox.childNodes[0].style.visibility = "visible";
                        topOfTempBox.style.backgroundColor = "white";
                        if (!visited.includes(topOfTempBox)) {
                            visited.push(topOfTempBox);
                            queue.push(topOfTempBox);
                        }
                        if (!visitedParent.includes(topOfTempBox)) {
                            visitedParent.push(topOfTempBox);
                        }
                    } else {
                        topOfTempBox.childNodes[0].style.visibility = "visible";
                        topOfTempBox.style.backgroundColor = "white";
                        if (!withNumber.includes(topOfTempBox)) {
                            withNumber.push(topOfTempBox);
                        }
                        if (!visitedParent.includes(topOfTempBox)) {
                            visitedParent.push(topOfTempBox);
                        }
                    }
                }
                //check bottom
                if (rowOfTempBox + 1 != 19) {
                    var bottomOfTempBox = document.getElementsByClassName(
                        `col-${rowOfTempBox + 1}--${colOfTempBox}`
                    )[0];
                    if (bottomOfTempBox.childNodes[0].innerHTML.length == 0) {
                        bottomOfTempBox.childNodes[0].style.visibility =
                            "visible";
                        bottomOfTempBox.style.backgroundColor = "white";
                        if (!visited.includes(bottomOfTempBox)) {
                            visited.push(bottomOfTempBox);
                            queue.push(bottomOfTempBox);
                        }
                        if (!visitedParent.includes(bottomOfTempBox)) {
                            visitedParent.push(bottomOfTempBox);
                        }
                    } else {
                        bottomOfTempBox.childNodes[0].style.visibility =
                            "visible";
                        bottomOfTempBox.style.backgroundColor = "white";
                        if (!withNumber.includes(bottomOfTempBox)) {
                            withNumber.push(bottomOfTempBox);
                        }
                        if (!visitedParent.includes(bottomOfTempBox)) {
                            visitedParent.push(bottomOfTempBox);
                        }
                    }
                }
                //check NW
                if (rowOfTempBox - 1 != 2 && colOfTempBox - 1 != 0) {
                    var NWOfTempBox = document.getElementsByClassName(
                        `col-${rowOfTempBox - 1}--${colOfTempBox - 1}`
                    )[0];
                    if (NWOfTempBox.childNodes[0].innerHTML.length == 0) {
                        NWOfTempBox.childNodes[0].style.visibility = "visible";
                        NWOfTempBox.style.backgroundColor = "white";
                        if (!visited.includes(NWOfTempBox)) {
                            visited.push(NWOfTempBox);
                            queue.push(NWOfTempBox);
                        }
                        if (!visitedParent.includes(NWOfTempBox)) {
                            visitedParent.push(NWOfTempBox);
                        }
                    } else {
                        NWOfTempBox.childNodes[0].style.visibility = "visible";
                        NWOfTempBox.style.backgroundColor = "white";
                        if (!withNumber.includes(NWOfTempBox)) {
                            withNumber.push(NWOfTempBox);
                        }
                        if (!visitedParent.includes(NWOfTempBox)) {
                            visitedParent.push(NWOfTempBox);
                        }
                    }
                }
                //check NE
                if (rowOfTempBox - 1 != 2 && colOfTempBox + 1 != 17) {
                    var NEOfTempBox = document.getElementsByClassName(
                        `col-${rowOfTempBox - 1}--${colOfTempBox + 1}`
                    )[0];
                    if (NEOfTempBox.childNodes[0].innerHTML.length == 0) {
                        NEOfTempBox.childNodes[0].style.visibility = "visible";
                        NEOfTempBox.style.backgroundColor = "white";
                        if (!visited.includes(NEOfTempBox)) {
                            visited.push(NEOfTempBox);
                            queue.push(NEOfTempBox);
                        }
                        if (!visitedParent.includes(NEOfTempBox)) {
                            visitedParent.push(NEOfTempBox);
                        }
                    } else {
                        NEOfTempBox.childNodes[0].style.visibility = "visible";
                        NEOfTempBox.style.backgroundColor = "white";
                        if (!withNumber.includes(NEOfTempBox)) {
                            withNumber.push(NEOfTempBox);
                        }
                        if (!visitedParent.includes(NEOfTempBox)) {
                            visitedParent.push(NEOfTempBox);
                        }
                    }
                }
                //check SW
                if (rowOfTempBox + 1 != 19 && colOfTempBox - 1 != 0) {
                    var SWOfTempBox = document.getElementsByClassName(
                        `col-${rowOfTempBox + 1}--${colOfTempBox - 1}`
                    )[0];
                    if (SWOfTempBox.childNodes[0].innerHTML.length == 0) {
                        SWOfTempBox.childNodes[0].style.visibility = "visible";
                        SWOfTempBox.style.backgroundColor = "white";
                        if (!visited.includes(SWOfTempBox)) {
                            visited.push(SWOfTempBox);
                            queue.push(SWOfTempBox);
                        }
                        if (!visitedParent.includes(SWOfTempBox)) {
                            visitedParent.push(SWOfTempBox);
                        }
                    } else {
                        SWOfTempBox.childNodes[0].style.visibility = "visible";
                        SWOfTempBox.style.backgroundColor = "white";
                        if (!withNumber.includes(SWOfTempBox)) {
                            withNumber.push(SWOfTempBox);
                        }
                        if (!visitedParent.includes(SWOfTempBox)) {
                            visitedParent.push(SWOfTempBox);
                        }
                    }
                }
                //check SE
                if (rowOfTempBox + 1 != 19 && colOfTempBox + 1 != 17) {
                    var SEOfTempBox = document.getElementsByClassName(
                        `col-${rowOfTempBox + 1}--${colOfTempBox + 1}`
                    )[0];
                    if (SEOfTempBox.childNodes[0].innerHTML.length == 0) {
                        SEOfTempBox.childNodes[0].style.visibility = "visible";
                        SEOfTempBox.style.backgroundColor = "white";
                        if (!visited.includes(SEOfTempBox)) {
                            visited.push(SEOfTempBox);
                            queue.push(SEOfTempBox);
                        }
                        if (!visitedParent.includes(SEOfTempBox)) {
                            visitedParent.push(SEOfTempBox);
                        }
                    } else {
                        SEOfTempBox.childNodes[0].style.visibility = "visible";
                        SEOfTempBox.style.backgroundColor = "white";
                        if (!withNumber.includes(SEOfTempBox)) {
                            withNumber.push(SEOfTempBox);
                        }
                        if (!visitedParent.includes(SEOfTempBox)) {
                            visitedParent.push(SEOfTempBox);
                        }
                    }
                }
            }
            console.log(visited);
            console.log(withNumber);
        } else {
            if (!visitedParent.includes(item)) {
                visitedParent.push(item);
            }
        }
        console.log(visitedParent);
        var score = document.getElementById("score");
        if (visitedParent.length == 216) {
            clearInterval(interval);
            var score1 = document.getElementById("score").innerHTML;
            console.log(score1);
            while (container.childNodes.length != 0) {
                container.removeChild(container.childNodes[0]);
            }
            var divBoth = document.createElement("div");
            divBoth.setAttribute("class", "margin-top1");
            var tempForScore = document.createElement("div");
            var textThankYou = document.createElement("div");
            tempForScore.setAttribute("class", "center-align text-bold large");
            textThankYou.setAttribute("class", "center-align text-bold large");
            textThankYou.innerHTML =
                "Thank You For Playing You Have Won The Game";
            tempForScore.innerHTML = "Your Score is : - " + "<br>" + score1;
            divBoth.appendChild(textThankYou);
            divBoth.appendChild(tempForScore);
            container.setAttribute("id", "container1");
            container.setAttribute("class", "fluid-container");

            var divForButton = document.createElement("div");
            divForButton.setAttribute("class", "text-center margin-top");
            var a = document.createElement("a");
            a.setAttribute("href", "../index.html");
            a.innerHTML = "Go To Homepage";
            divForButton.appendChild(a);

            container.appendChild(divBoth);
            container.appendChild(divForButton);
        }
        score.innerHTML = visitedParent.length;
    });
});
