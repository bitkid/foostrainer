<script lang="ts">
    import {onMount} from 'svelte'
    import {player} from "../store"
    import {RandomHelper} from "$lib/RandomHelper"
    import NotePanel from "$lib/components/NotePanel.svelte"
    import {Button, Column, Grid, Row} from "carbon-components-svelte"
    import {Number_1, PartitionCollection, Play, Restart, View} from "carbon-icons-svelte"

    let currentSong = RandomHelper.getRandomSongBeginning()
    const secret = ""

    let playing: boolean = false
    let divContent = secret
    let notePanel: NotePanel

    onMount(() => notePanel.drawLines(undefined, currentSong.clef))

    function drawNotePanel() {
        let notes = currentSong.getStaveNotes()
        notePanel.drawLinesAndNotes(notes, currentSong.clef, currentSong.scale)
    }

    function playSong() {
        const notes = currentSong.getMidiNotes()
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

    function playRoot() {
        const note = currentSong.getScaleRootMidiNote()
        playing = true
        $player.play(note, function () {
            playing = false
        })
    }

    function playFirst() {
        const note = currentSong.getMidiNotes()[0]
        playing = true
        $player.play(note, function () {
            playing = false
        })
    }

    function showSong() {
        drawNotePanel()
        divContent = currentSong.getSongDescription()
    }

    function changeSong() {
        divContent = secret
        currentSong = RandomHelper.getRandomSongBeginning()
        notePanel.drawLines(undefined, currentSong.clef)
    }

    function playATone() {
        playing = true
        $player.play(81, function () {
            playing = false
        })
    }
</script>

<Grid>
    <Row>
        <Column>
            <p>
                Für diese Übung brauchst Du ein Notenheft. Drücke den
                <Play/>
                Knopf und höre Dir den Liedanfang an.
                Mit dem
                <Number_1/>
                Knopf kannst Du den ersten Ton immer wieder abspielen und mit Hilfe der Stimmgabel, dem
                <PartitionCollection/>
                Knopf, die Tonart bestimmen.
                Schreibe die Vorzeichen der Tonart in dein Heft und notiere den Liedanfang. Achte dabei darauf, ob
                die Noten im Bass- oder Violionschlüssel stehen.
                <View/>
                zeigt Dir Lösung und mit
                <Restart/>
                kannst Du es
                mit einem anderen Liedanfang in einer anderen Tonart nochmal probieren.
            </p>
        </Column>
    </Row>
    <Row>
        <Column>
            <Button disabled={playing} icon={Play} iconDescription="Abspielen" on:click={playSong}/>
            <Button disabled={playing} icon={Number_1} iconDescription="Erste Note abspielen" on:click={playFirst}/>
            <Button disabled={playing} icon={PartitionCollection} iconDescription="Kammerton (A)" on:click={playATone}/>
            <Button icon={View} iconDescription="L&ouml;sung" on:click={showSong}/>
            <Button icon={Restart} iconDescription="Nochmal!" on:click={changeSong}/>
        </Column>
    </Row>
    <Row>
        <Column>
            <NotePanel bind:this={notePanel}/>
        </Column>
    </Row>
    <Row>
        <Column>
            <h2>{divContent}</h2>
        </Column>
    </Row>
</Grid>
