<script lang="ts">
    import {onMount} from 'svelte'
    import {player} from "../store"
    import {RandomHelper} from "$lib/RandomHelper"
    import NotePanel from "$lib/components/NotePanel.svelte"
    import {Accordion, AccordionItem, Button} from "carbon-components-svelte"
    import {Number_1, PartitionCollection, Play, Restart, View} from "carbon-icons-svelte"

    let currentSong = RandomHelper.getRandomSongBeginning()
    const secret = "In welcher Tonart ist der Liedanfang?"

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

<Accordion>
    <AccordionItem title="Beschreibung der Übung">
        <p>
            Für diese Übung brauchst Du ein Notenheft. Drücke den Play
            <Play/>
            Knopf und höre Dir den Liedanfang an. Mit dem First
            <Number_1/>
            Knopf kannst Du den ersten Ton immer wieder abspielen und mit Hilfe der Stimmgabel
            <PartitionCollection/>
            die Tonart bestimmen.
            Schreibe die Vorzeichen der Tonart in dein Heft und notiere den Liedanfang. Achte dabei darauf, ob
            die Noten im Bass- oder Violionschlüssel stehen. Lösung
            <View/>
            zeigt Dir die richtige Lösung und mit Nochmal!
            <Restart/>
            kannst Du es
            mit einem anderen Liedanfang in einer anderen Tonart nochmal probieren.
        </p>
    </AccordionItem>
    <AccordionItem open title="Übung">
        <Button disabled={playing} icon={Play} on:click={playSong} size="small">Play</Button>
        <Button disabled={playing} icon={Number_1} on:click={playFirst} size="small">First</Button>
        <Button disabled={playing} icon={PartitionCollection} on:click={playATone} size="small">Fork</Button>
    </AccordionItem>
    <AccordionItem open title="Lösung">
        <Button icon={View} kind="tertiary" on:click={showSong} size="small">Anzeigen</Button>
        <Button icon={Restart} kind="tertiary" on:click={changeSong} size="small">Nochmal!</Button>
        <h4 style="text-align: center; margin: 1rem">{divContent}</h4>
        <NotePanel bind:this={notePanel}/>
    </AccordionItem>
</Accordion>



