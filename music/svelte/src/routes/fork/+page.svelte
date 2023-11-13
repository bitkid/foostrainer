<script lang="ts">
    import {player} from "../store";
    import type {Note} from "$lib/MusicData";
    import {notes} from "$lib/MusicData";
    import {RandomHelper} from "$lib/RandomHelper";

    let currentNote: Note = RandomHelper.getRandomNote();
    let playing: boolean = false;

    let spree = 0;
    let rank = "Blechohr";
    let message: string = "Viel Gl&uuml;ck!";

    function playSound() {
        playing = true;
        $player.play(currentNote.midiNote, function () {
            playing = false;
        })
    }

    function checkNote(note: Note) {
        if (currentNote.midiNote == note.midiNote) {
            spree++;
            message = "Nice!";
            if (spree == 1) {
                rank = "Fl&ouml;tentierchen"
            } else if (spree == 2) {
                rank = "Geigeneumel"
            } else if (spree == 3) {
                rank = "Paukenpingu";
            } else if (spree == 4) {
                rank = "Ameisenmozart";
            } else if (spree == 5) {
                rank = "Bachforelle";
            } else if (spree == 6) {
                rank = "Gnubert";
            } else {
                rank = "Michael Jackson";
            }
        } else {
            spree = 0;
            rank = "Blechohr";
            message = "Oh nein! Es w&auml;hre ein " + currentNote.name + " gewesen. Probiers nochmal!";
        }
        currentNote = RandomHelper.getRandomNote();
    }
</script>
<h1>Stimmgabel Training</h1>
<button disabled={playing} id="play" on:click={playSound} type="button">Ton abspielen</button>
<br>
<br>
<div id="notes">
    {#each notes as n}
        <button on:click={() => checkNote(n)}>{n.name}</button>
    {/each}
</div>
<br>
<div id="score">
    <h3>Punkte: {spree}</h3>
</div>
<div id="score">
    <h3>Rang: {@html rank}</h3>
</div>
<div id="message">
    <h3>{@html message}</h3>
</div>