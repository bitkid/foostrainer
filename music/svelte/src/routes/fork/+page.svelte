<script lang="ts">
    import {player} from "../store"
    import type {Note} from "$lib/MusicData"
    import {notes} from "$lib/MusicData"
    import {RandomHelper} from "$lib/RandomHelper"
    import {Button, ButtonSet, Column, Row, Select, SelectItem, Tooltip} from "carbon-components-svelte";
    import {PartitionCollection, Play, View} from "carbon-icons-svelte";

    let currentNote: Note = RandomHelper.getRandomNote()
    let playing: boolean = false

    let spree = 0
    let rank = "Blechohr"
    let message: string = "Viel Gl&uumlck!"

    let selected = "C"
    let invalid = false

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

    function noteName(note: Note): string {
        if (note.german)
            return note.german
        return note.name
    }

    function checkNote() {
        const note = notes.find((x) => x.name == selected)!!
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
            invalid = true
            rank = "Blechohr"
            message = "Oh nein! Es w&auml;hre ein " + currentNote.name + " gewesen. Probiers nochmal!"
        }
        currentNote = RandomHelper.getRandomNote()
    }
</script>
<Row>
    <Column>
        <p>Bestimme die richtige Note und steige weiter im Rang auf! </p>
        <Tooltip triggerText="Mehr Informationen">
            <p>
                Drücke den Abspielen
                <Play/>
                Knopf und höre Dir die Note an. Bestimme mit Hilfe der Stimmgabel
                <PartitionCollection/>
                um welche Note es sich handelt und drücke den jeweiligen Knopf mit der richtigen Note. Für jede
                richtig
                erratene Note gibt es einen
                Punkt und Du steigst immer weiter auf in
                deinem Rang! Aber Vorsicht - liegst Du falsch musst Du wieder von vorne beginnen!
            </p>
        </Tooltip>
    </Column>
</Row>
<Row>
    <Column>
        <p>{@html message}</p>
        <p>Rang: {@html rank} ({spree} Punkte)</p>
    </Column>
</Row>
<Row>
    <Column>
        <ButtonSet>
            <Button disabled={playing} icon={Play} on:click={playSound}>Abspielen</Button>
            <Button disabled={playing} icon={PartitionCollection} on:click={playASound}>Stimmgabel</Button>
        </ButtonSet>
    </Column>
</Row>
<Row>
    <Column>
        <Select bind:selected invalid={invalid} labelText="Wähle eine Note:" on:change={(_) => invalid = false}
                size="xl">
            {#each notes as n}
                <SelectItem value="{n.name}" text="{noteName(n)}"/>
            {/each}
        </Select>
    </Column>
</Row>
<Row>
    <Column>
        <ButtonSet>
            <Button icon={View} kind="tertiary" on:click={checkNote}>Überprüfen</Button>
        </ButtonSet>
    </Column>
</Row>
