<script lang="ts">
    import NotePanel from "$lib/components/NotePanel.svelte";
    import {onMount} from "svelte";
    import {RandomHelper} from "$lib/RandomHelper";
    import {player} from "../store";
    import {Accidental, StaveNote} from "vexflow";
    import type {PotentialNote} from "$lib/MusicData";
    import {notesDisambiguation} from "$lib/MusicData";
    import {SongBeginning} from "$lib/SongBeginning";
    import {Button, Column, Grid, Row} from "carbon-components-svelte";
    import {Play, Restart, View} from "carbon-icons-svelte";

    const msg = ""

    let notePanel: NotePanel
    let divContent = msg

    let interval = RandomHelper.getRandomInterval()
    let rootNote = RandomHelper.getRandomPotentialNote()
    let playing = false

    onMount(() => drawStart())

    function drawStart() {
        notePanel.drawLinesAndNotes([getStaveNote(rootNote, 4)], "treble", undefined)
    }

    function getStaveNote(note: PotentialNote, oct: number): StaveNote {
        const k = note.noteLine + "/" + oct
        if (note.with === undefined) {
            return new StaveNote({
                keys: [k],
                duration: "q",
                clef: "treble"
            })
        } else {
            return new StaveNote({
                keys: [k],
                duration: "q",
                clef: "treble"
            }).addModifier(new Accidental(note.with))
        }
    }

    function playInterval() {
        const notes = [60 + rootNote.offset, 60 + rootNote.offset + interval.halfSteps]
        playing = true
        notes.forEach((value, index) => {
            if (index == notes.length - 1)
                setTimeout($player.play.bind($player), index * 700, value, function () {
                    playing = false
                })
            else
                setTimeout($player.play.bind($player), index * 700, value)
        })
    }

    function showSolution() {
        divContent = interval.name
        const relNote = 60 + rootNote.offset + interval.halfSteps;
        const potentialNotes = notesDisambiguation.get(relNote % 12)!!;
        let potentialNote;
        if (potentialNotes.length == 1) {
            potentialNote = potentialNotes[0]
        } else {
            const maybe = potentialNotes.filter((x) => x.with === rootNote.with)
            if (maybe.length == 1) {
                potentialNote = maybe[0]
            } else {
                potentialNote = potentialNotes[0]
            }
        }
        notePanel.drawLinesAndNotes([
            getStaveNote(rootNote, SongBeginning.getOctaveForValue(60 + rootNote.offset)),
            getStaveNote(potentialNote, SongBeginning.getOctaveForValue(relNote))
        ], "treble", undefined)
    }

    function newInterval() {
        interval = RandomHelper.getRandomInterval()
        rootNote = RandomHelper.getRandomPotentialNote()
        drawStart()
        divContent = msg
    }
</script>

<Grid>
    <Row>
        <Column>
            <p>
                Für diese Übung brauchst Du ein Notenheft. Drücke den
                <Play/>
                Knopf und höre Dir das Interval an.
                Hat der erste Ton bereits ein Vorzeichen notiere den zweiten Ton mit dem gleichen Vorzeichen.
                <View/>
                zeigt Dir Lösung und mit
                <Restart/>
                kannst Du es mit einem anderen Interval nochmal probieren.
            </p>
        </Column>
    </Row>
    <Row>
        <Column>
            <Button disabled={playing} icon={Play} iconDescription="Abspielen" on:click={playInterval}/>
            <Button icon={View} iconDescription="L&ouml;sung" on:click={showSolution}/>
            <Button icon={Restart} iconDescription="Nochmal!" on:click={newInterval}/>
        </Column>
    </Row>
    <Row>
        <Column>
            <NotePanel bind:this={notePanel}/>
        </Column>
    </Row>
    <Row>
        <Column>
            <h2>{@html divContent}</h2>
        </Column>
    </Row>
</Grid>

