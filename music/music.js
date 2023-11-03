const playButton = document.querySelector('#play');
const changeButton = document.querySelector('#change');
const showButton = document.querySelector('#show');
const noteDiv = document.querySelector('#currentNote');

const showSongButton = document.querySelector('#showSong');
const playSongButton = document.querySelector('#playSong');
const playFirstNoteButton = document.querySelector('#playFirst');
const playRootNoteButton = document.querySelector('#playRoot');
const songDiv = document.querySelector('#currentSong');
const changeSongButton = document.querySelector('#changeSong');

const NOTE_DURATION = 500;
const NOTE_DISTANCE = NOTE_DURATION + 100;

const notes = [["C", 60], ["C# (Db)", 61], ["D", 62], ["D# (Eb)", 63],
    ["E", 64], ["F", 65], ["F# (Gb)", 66], ["G", 67], ["G# (Ab)", 68], ["A", 69],
    ["A# (B)", 70], ["H", 71]];

const scales = ["C", "C#", "Db", "D", "Eb", "E", "F", "F#", "Gb", "G", "Ab", "A", "Bb", "B"];

const notesNoSign = [
    ["C"],
    ["C", "D"],
    ["D"],
    ["D", "E"],
    ["E"],
    ["F"],
    ["F", "G"],
    ["G"],
    ["G", "A"],
    ["A"],
    ["A", "B"],
    ["B"]
];

const scalesMap = {
    "C": [0, "C", null, null],
    "C#": [1, "C#", "Db", "#"],
    "Db": [1, "Db", "C#", "b"],
    "D": [2, "D", null, "#"],
    "Eb": [3, "Eb", null, "b"],
    "E": [4, "E", null, "#"],
    "F": [5, "F", null, "b"],
    "F#": [6, "F#", "Gb", "#"],
    "Gb": [6, "Gb", "F#", "b"],
    "G": [7, "G", null, "#"],
    "Ab": [8, "Ab", null, "b"],
    "A": [9, "A", null, "#"],
    "Bb": [10, "Bb", null, "b"],
    "B": [11, "B", null, "#"]
};

const bruderJakob = [[1, 2, 3], "Bruder Jakob", [0, 2, 4]];
const zylinderHut = [[3, 2, 1], "Zylinder Hut", [4, 2, 0]];
const vogel = [[3, 4, 5], "Kommt ein Vogel", [4, 5, 7]];
const bundesHymne = [[5, 4, 3], "Bundeshymne", [7, 5, 4]];
const pauke = [[3, 1], "Pauke", [4, 0]];
const abc = [[1, 5], "ABC", [0, 7]];
const beethoven = [[3, 1], "Beethoven", [4, 0]];
const miau = [[5, 15], "Miau", [7, 16]];
const geige = [[5, 12], "Geige", [7, 12]];
const mozart = [[12, 5], "Mozart", [12, 7]];
const usa = [[5, 3, 1], "USA", [7, 4, 0]];
const wachetAuf = [[1, 3, 5], "Wachet auf", [0, 4, 7]];
const kuckuck = [[5, 3], "Kuckuck", [7, 4]];
const vogelHochzeit = [[3, 5], "Vogelhochzeit", [4, 7]];

const songStart = [bruderJakob, zylinderHut, vogel, bundesHymne, pauke, abc, beethoven, miau,
    geige, mozart, usa, wachetAuf, kuckuck, vogelHochzeit];

let currentNote = getRandomNote();

let currentClef = getRandomClef();
let currentSong = getRandomSong();
let currentScale = getRandomScale();

let synth = null;

const {Renderer, Stave, StaveNote, Voice, Formatter} = Vex.Flow;
const div = document.getElementById("output")
const renderer = new Renderer(div, Renderer.Backends.SVG);
renderer.resize(500, 150);
const context = renderer.getContext();


function init() {
    synth = document.getElementById("tinysynth");
    emptyNotePanel();
}

function emptyNotePanel() {
    context.clear();
    const stave = new Stave(0, 0, 450);
    stave.setClef(currentClef).setTimeSignature("4/4");
    stave.setContext(context).draw();
}

function getStaveNoteForValue(val) {
    let n = notesNoSign[val % 12];
    let octave = Math.floor(val / 12) - 1;
    let note;
    if (n.length === 1) {
        note = n[0];
    } else {
        let sign = scalesMap[currentScale][3];
        if (sign === "#") {
            note = n[0];
        } else {
            note = n[1];
        }
    }
    return new StaveNote({keys: [note + "/" + octave], duration: "q"});
}

function drawNotePanel() {
    context.clear();
    const stave = new Stave(0, 0, 450);
    stave.setClef(currentClef).setTimeSignature("4/4");
    stave.setKeySignature(currentScale);
    stave.setContext(context).draw();

    let notesForCurrentSong = getNotesForCurrentSong();
    let notes = notesForCurrentSong.map((x) => getStaveNoteForValue(x));

    const voice = new Voice({num_beats: 4, beat_value: 4});
    voice.addTickables(notes);
    const nrOfRests = 4 - notesForCurrentSong.length;
    for (let i = 0; i < nrOfRests; i++) {
        voice.addTickable(new StaveNote({keys: ["b/4"], duration: "qr"}));
    }
    new Formatter().joinVoices([voice]).format([voice], 350);
    voice.draw(context, stave);
}

playButton.onclick = function (event) {
    event.preventDefault();
    playNote(currentNote[1]);
}

changeButton.onclick = function (event) {
    event.preventDefault();
    stopNote();
    noteDiv.innerHTML = "<h1>:)</h1>";
    currentNote = getRandomNote();
}

showButton.onclick = function (event) {
    event.preventDefault();
    noteDiv.innerHTML = "<h1>" + currentNote[0] + "</h1>";
}

showSongButton.onclick = function (event) {
    event.preventDefault();
    songDiv.innerHTML = "<h1>" + currentSong[1] + " in " + currentScale + " [" + currentSong[0] + "]</h1>";
    drawNotePanel();
}

changeSongButton.onclick = function (event) {
    event.preventDefault();
    songDiv.innerHTML = "<h1>:)</h1>";
    currentSong = getRandomSong();
    currentScale = getRandomScale();
    currentClef = getRandomClef();

    emptyNotePanel();
}

function getNotesForCurrentSong() {
    return currentSong[2].map((x) => 60 + scalesMap[currentScale][0] + x);
}

playSongButton.onclick = function (event) {
    event.preventDefault();
    let notes = getNotesForCurrentSong();
    notes.forEach((value, index) => {
        setTimeout(playNote, index * NOTE_DISTANCE, value);
    });
}

playFirstNoteButton.onclick = function (event) {
    event.preventDefault();
    const note = 60 + scalesMap[currentScale][0] + currentSong[2][0];
    playNote(note);
}

playRootNoteButton.onclick = function (event) {
    event.preventDefault();
    const note = 60 + scalesMap[currentScale][0];
    playNote(note);
}

function getRandomNote() {
    let r = Math.floor(Math.random() * notes.length);
    return notes[r];
}

function getRandomScale() {
    let r = Math.floor(Math.random() * scales.length);
    return scales[r];
}

function getRandomSong() {
    let r = Math.floor(Math.random() * songStart.length);
    return songStart[r];
}

function playNote(note) {
    synth.send([0x90, note, 100]);
    setTimeout(stopNote, NOTE_DURATION, note);
}

function getRandomClef() {
    if (Math.random() < 0.5) {
        return "treble";
    } else {
        return "bass";
    }
}

function stopNote(note) {
    synth.send([0x90, note, 0]);
}

window.onload = init;