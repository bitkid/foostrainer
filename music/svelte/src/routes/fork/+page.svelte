<script lang="ts">
    import {player} from "../store"
    import type {Note} from "$lib/MusicData"
    import {notes} from "$lib/MusicData"
    import {RandomHelper} from "$lib/RandomHelper"
    import {Accordion, AccordionItem, Button} from "carbon-components-svelte";
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
</script>

<Accordion>
    <AccordionItem title="Beschreibung">
        <p>
            Drücke den Play
            <Play/>
            Knopf und höre Dir den Ton an. Bestimme mit Hilfe der Stimmgabel
            <PartitionCollection/>
            den Ton und drücke den jeweiligen Knopf mit dem richtigen Ton. Für jeden richtig erratenen Ton gibts einen Punkt und Du steigst immer weiter auf in
            deinem Rang! Aber Vorsicht - liegst Du falsch musst Du wieder von vorne beginnen!
        </p>
    </AccordionItem>
    <AccordionItem open title="Status">
        <h4 style="text-align: center; margin: 1rem">{@html message}</h4>
        <p style="text-align: center;">Punkte: {spree}</p>
        <p style="text-align: center;">Rang: {@html rank}</p>
    </AccordionItem>
    <AccordionItem open title="Spiel">
        <Button disabled={playing} icon={Play} on:click={playSound}>Play</Button>
        <Button disabled={playing} icon={PartitionCollection} on:click={playASound}>Stimmgabel</Button>
        <div style="margin-top: 1rem">
            {#each notes as n}
                <Button kind="tertiary" iconDescription="Abspielen" on:click={() => {checkNote(n)}}>{n.name}</Button>
            {/each}
        </div>
    </AccordionItem>
</Accordion>
