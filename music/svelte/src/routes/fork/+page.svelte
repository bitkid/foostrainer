<script lang="ts">
    import {player} from "../store"
    import type {Note} from "$lib/MusicData"
    import {notes} from "$lib/MusicData"
    import {RandomHelper} from "$lib/RandomHelper"
    import Button from "$lib/components/Button.svelte";

    let currentNote: Note = RandomHelper.getRandomNote()
    let playing: boolean = false

    let spree = 0
    let rank = "Blechohr"
    let message: string = "Viel Gl&uumlck!"

    function playSound() {
        playing = true
        $player.play(currentNote.midiNote, function () {
            playing = false
        })
    }

    function playASound() {
        playing = true
        $player.play(81, function () {
            playing = false
        })
    }

    function checkNote(note: Note) {
        if (currentNote.midiNote == note.midiNote) {
            spree++
            message = "Nice!"
            if (spree == 1) {
                rank = "Fl&ouml;tentierchen"
            } else if (spree == 2) {
                rank = "Geigeneumel"
            } else if (spree == 3) {
                rank = "Paukenpingu"
            } else if (spree == 4) {
                rank = "Ameisenmozart"
            } else if (spree == 5) {
                rank = "Bachforelle"
            } else if (spree == 6) {
                rank = "Gnubert"
            } else if (spree == 7) {
                rank = "Trompetenb&auml;r"
            } else if (spree == 8) {
                rank = "Quietschente"
            } else if (spree == 9) {
                rank = "Hornbrille"
            } else if (spree == 10) {
                rank = "Cellobello"
            } else if (spree == 11) {
                rank = "Basspferdchen"
            } else if (spree == 12) {
                rank = "Gitarrenaal"
            } else {
                rank = "Michael Jackson"
            }
        } else {
            spree = 0
            rank = "Blechohr"
            message = "Oh nein! Es w&auml;hre ein " + currentNote.name + " gewesen. Probiers nochmal!"
        }
        currentNote = RandomHelper.getRandomNote()
    }
</script>

<div>
    <Button content="Ton abspielen" disabled={playing} id="play" on:click={playSound}/>
    <Button content="Kammerton (A)" disabled={playing} id="play" on:click={playASound}/>
</div>
<div>
    {#each notes as n}
        <Button on:click={() => checkNote(n)} content={n.name}/>
    {/each}
</div>
<div>
    <h3>Punkte: {spree}</h3>
</div>
<div>
    <h3>Rang: {@html rank}</h3>
</div>
<div>
    <h3>{@html message}</h3>
</div>