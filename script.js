let playButton = document.querySelector('#play');
let stopButton = document.querySelector('#stop');
let goalDelay = document.querySelector('#goal-delay');
let goalDelayValue = document.querySelector('.goal-delay-value');
let routine = null;

function setup() {
    document.getElementById("stop").disabled = true;
    routine = new FoosballRoutine(["wall pass", "lane pass", "center pass"],
        ["long left", "short left", "straight", "short right", "long right", "cut back left", "cut back right"],
        5);
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