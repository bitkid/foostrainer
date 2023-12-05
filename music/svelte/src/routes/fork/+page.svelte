<script lang="ts">
    import {player} from "../store"
    import type {Note} from "$lib/MusicData"
    import {notes} from "$lib/MusicData"
    import {RandomHelper} from "$lib/RandomHelper"
    import {Button, Column, Grid, Row} from "carbon-components-svelte";
    import {PartitionCollection, Play} from "carbon-icons-svelte";

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

    function getNoteName(note: Note): string {
        if (note.alternate === undefined) {
            return note.name
        } else {
            return note.name + " - " + note.alternate
        }
    }
</script>

<Grid>
    <Row>
        <Column>
            <p>
                Ein kleines Spielchen! Drücke den
                <Play/>
                Knopf und höre Dir den Ton an. Bestimme mit Hilfe der
                Stimmgabel, dem
                <PartitionCollection/>
                Knopf, den Ton und drücke den jeweiligen Knopf. Für jeden richtig
                erratenen Ton gibts einen Punkt und Du steigst immer weiter auf in deinem Rang! Aber Vorsicht - liegst
                Du falsch musst Du wieder von vorne beginnen!
            </p>
        </Column>
    </Row>
    <Row>
        <Column>
            <p>{@html message}</p>
        </Column>
    </Row>
    <Row>
        <Column>
            <Button disabled={playing} icon={Play} iconDescription="Abspielen" on:click={playSound}/>
            <Button disabled={playing} icon={PartitionCollection} iconDescription="Kammerton (A)"
                    on:click={playASound}/>
        </Column>
    </Row>
    <Row>
        <Column>
            {#each notes as n}
                <Button kind="ghost" iconDescription="Abspielen" on:click={() => {checkNote(n)}}>{n.name}</Button>
            {/each}
        </Column>
    </Row>
    <Row>
        <Column>
            <p>Punkte: {spree}</p>
        </Column>
    </Row>
    <Row>
        <Column>
            <p>Rang: {@html rank}</p>
        </Column>
    </Row>
</Grid>
