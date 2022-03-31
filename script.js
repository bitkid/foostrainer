const playButton = document.querySelector('#play');
const stopButton = document.querySelector('#stop');
const goalDelay = document.querySelector('#goal-delay');
const passesDiv = document.querySelector('#passes');
const shotsDiv = document.querySelector('#shots');
const timingDiv = document.querySelector('#timing');
const goalDelayValue = document.querySelector('.goal-delay-value');
let routine = null;

function setup() {
    const urlParams = new URLSearchParams(window.location.search);
    let fiveBarGoals = urlParams.getAll("five");
    if (fiveBarGoals.length === 0) {
        fiveBarGoals = ["wall pass", "lane pass", "center pass"];
    }
    let threeBarGoals = urlParams.getAll("three")
    if (threeBarGoals.length === 0) {
        threeBarGoals = ["long left", "short left", "straight", "short right", "long right", "cut back left", "cut back right"];
    }
    console.log(fiveBarGoals);
    console.log(threeBarGoals);
    let timeDiv = new TimeDiv(timingDiv);
    routine = new FoosballRoutine(fiveBarGoals, threeBarGoals, 5, timeDiv);

    document.getElementById("stop").disabled = true;
    passesDiv.innerHTML = "<p>Passes: " + routine.fiveBarGoals.join(", ") + "</p>";
    shotsDiv.innerHTML = "<p>Shots: " + routine.threeBarGoals.join(", ") + "</p>";
}

window.onload = setup;

goalDelay.onchange = function () {
    goalDelayValue.textContent = "Goal reset delay " + goalDelay.value + " seconds";
    routine.setResetTimeInSeconds(goalDelay.value);
}

playButton.onclick = function (event) {
    event.preventDefault();
    document.getElementById("play").disabled = true;
    document.getElementById("stop").disabled = false;
    routine.start();
}

stopButton.onclick = function (event) {
    event.preventDefault();
    document.getElementById("play").disabled = false;
    document.getElementById("stop").disabled = true;
    routine.stop();
}