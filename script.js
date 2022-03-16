let synth = window.speechSynthesis;
let playButton = document.querySelector('#play');
let stopButton = document.querySelector('#stop');
let utterThis = new SpeechSynthesisUtterance();
let noSleep = new NoSleep();

let setupTimeout = 2000;
let afterGoalSetupTime = 7000;
let minimumPassDelay = 2000;
let minimumShootDelay = 3000;
let maxTimeOnFiveBar = 10000;
let maxTimeOnThreeBar = 17000;
let fiveBarGoals = ["wall pass", "lane pass", "center pass"];
let threeBarGoals = ["long left", "short left", "straight", "short right", "long right", "cut back left", "cut back right"];

let playing = false;

function setup() {
    document.getElementById("stop").disabled = true;
}

window.onload = setup;

function speak(myTxt) {
    utterThis.onerror = function () {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    utterThis.text = myTxt;
    utterThis.voice = speechSynthesis
        .getVoices()
        .find(voice => voice.lang.toLowerCase().indexOf("en-gb") !== -1);
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
}

function getRandomFive() {
    return fiveBarGoals[Math.floor(Math.random() * fiveBarGoals.length)];
}

function getRandomThree() {
    return threeBarGoals[Math.floor(Math.random() * threeBarGoals.length)];
}

function endRoutine() {
    speak("You are done!");
}

function setCancellableTimeout(fun, interval) {
    if(!playing) {
        endRoutine();
    } else {
        setTimeout(fun, interval);
    }
}

function speakAndSchedule(txt, fun, interval) {
    if(!playing) {
        endRoutine();
    } else {
        speak(txt)
        setCancellableTimeout(fun, interval);
    }
}

function shoot() {
    speakAndSchedule(getRandomThree(), readyFive, afterGoalSetupTime);
}

function pass() {
    speakAndSchedule(getRandomFive(), shoot, Math.max(Math.random() * maxTimeOnThreeBar, minimumShootDelay));
}

function startFiveBar() {
    speakAndSchedule("go", pass, Math.max(Math.random() * maxTimeOnFiveBar, minimumPassDelay));
}

function readyFive() {
    speakAndSchedule("setup five bar", startFiveBar, setupTimeout);
}

playButton.onclick = function (event) {
    event.preventDefault();
    playing = true;
    noSleep.enable();
    document.getElementById("play").disabled = true;
    document.getElementById("stop").disabled = false;
    readyFive();
}

stopButton.onclick = function (event) {
    event.preventDefault();
    noSleep.disable();
    playing = false;
    document.getElementById("play").disabled = false;
    document.getElementById("stop").disabled = true;
}
