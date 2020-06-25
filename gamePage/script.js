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
// var btn1 = document.createElement("button");
// btn1.setAttribute("id", "dummy");
// btn1.innerText = "Hello";
container.appendChild(row1);
container.appendChild(row2);
// container.appendChild(btn1);
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
