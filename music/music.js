const playButton = document.querySelector('#play');
const changeButton = document.querySelector('#change');
const showButton = document.querySelector('#show');
const noteDiv = document.querySelector('#currentNote');

let notes = [["C", 60], ["C# (Db)", 61], ["D", 62], ["D# (Eb)", 63],
    ["E", 64], ["F", 65], ["F# (Gb)", 66], ["G", 67], ["G# (Ab)", 68], ["A", 69],
    ["A# (B)", 70], ["H", 71]];

let currentNote = getRandomNote();

let synth = null;

function init() {
    synth = document.getElementById("tinysynth");
}

playButton.onmousedown = function (event) {
    playNote();
}

playButton.onmouseup = function (event) {
    stopNote();
}

changeButton.onclick = function (event) {
    noteDiv.innerHTML = "<h1>:)</h1>";
    currentNote = getRandomNote();
}

showButton.onclick = function (event) {
    noteDiv.innerHTML = "<h1>" + currentNote[0] + "</h1>";
}

function getRandomNote() {
    let r = Math.floor(Math.random() * 12);
    return notes[r];
}

function playNote() {
    synth.send([0x90, currentNote[1], 100]);
}

function stopNote() {
    synth.send([0x90, currentNote[1], 0]);
}

window.onload = init;