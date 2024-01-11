<script lang="ts">
    import {onMount} from 'svelte'
    import {player} from "../store"
    import {RandomHelper} from "$lib/RandomHelper"
    import NotePanel from "$lib/components/NotePanel.svelte"
    import {Button, ButtonSet, Column, Row, Tooltip} from "carbon-components-svelte"
    import {Number_1, PartitionCollection, Play, Restart, View} from "carbon-icons-svelte"

    let currentSong = RandomHelper.getRandomSongBeginning()
    const secret = "Welcher Liedanfang in welcher Tonart?"

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

<Row>
    <Column>
        <p>
            Schreibe den Liedanfang mit den richtigen Vorzeichen in dein Notenheft!
        </p>
        <Tooltip triggerText="Mehr Informationen">
            <p>
                Für diese Übung brauchst Du ein Notenheft. Drücke den Abspielen
                <Play/>
                Knopf und höre Dir den Liedanfang an. Mit dem Erste Note
                <Number_1/>
                Knopf kannst Du die erste Note immer wieder abspielen und mit Hilfe der Stimmgabel
                <PartitionCollection/>
                die Tonart bestimmen.
                Schreibe die Vorzeichen der Tonart in dein Heft und notiere den Liedanfang. Achte dabei darauf, ob
                die Noten im Bass- oder Violionschlüssel stehen. Anzeigen
                <View/>
                zeigt Dir die richtige Lösung und mit Nochmal!
                <Restart/>
                kannst Du es
                mit einem anderen Liedanfang in einer anderen Tonart nochmal probieren.
            </p>
        </Tooltip>
    </Column>
</Row>
<Row>
    <Column>
        <h4>{divContent}</h4>
    </Column>
</Row>
<Row>
    <Column>
        <ButtonSet>
            <Button disabled={playing} icon={Play} on:click={playSong}>Abspielen</Button>
            <Button disabled={playing} icon={Number_1} on:click={playFirst}>Erste Note</Button>
            <Button disabled={playing} icon={PartitionCollection} on:click={playATone}>Stimmgabel</Button>
        </ButtonSet>
    </Column>
</Row>
<Row>
    <Column>
        <ButtonSet>
            <Button icon={View} kind="tertiary" on:click={showSong}>Anzeigen</Button>
            <Button icon={Restart} kind="tertiary" on:click={changeSong}>Nochmal!</Button>
        </ButtonSet>
    </Column>
</Row>
<NotePanel bind:this={notePanel}/>



