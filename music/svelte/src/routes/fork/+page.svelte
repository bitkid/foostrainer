<script lang="ts">
    import {player} from "../store";
    import type {Note} from "$lib/MusicData";
    import {notes} from "$lib/MusicData";

    let currentNote: Note = getRandomNote();
    let divContent: string = ":-)";

    let playing: boolean = false;

    function playSound() {
        playing = true;
        $player.play(currentNote.midiNote, function () {
            playing = false;
        })
    }

    function getRandomNote(): Note {
        let r = Math.floor(Math.random() * notes.length);
        return notes[r];
    }

    function newNote() {
        currentNote = getRandomNote();
        divContent = ":-)";
    }

    function showNote() {
        divContent = currentNote.name;
    }
</script>
<h1>FORK</h1>
<button disabled={playing} id="play" on:click={playSound} type="button">Play note</button>
<button id="show" on:click={showNote} type="button">Show note</button>
<button id="change" on:click={newNote} type="button">Change note</button>
<br>
<div id="noteDiv"><h2>{divContent}</h2></div>