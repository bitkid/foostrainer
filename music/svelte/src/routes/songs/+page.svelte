<script lang="ts">
    import {onMount} from 'svelte'
    import {player} from "../store"
    import {RandomHelper} from "$lib/RandomHelper"
    import Button from "$lib/components/Button.svelte"
    import NotePanel from "$lib/components/NotePanel.svelte";

    let currentSong = RandomHelper.getRandomSongBeginning()
    const secret = "???"

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

<Button content="Abspielen" disabled={playing} on:click={playSong}/>
<Button content="Erster Ton" disabled={playing} on:click={playFirst}/>
<Button content="Grundton" disabled={playing} on:click={playRoot}/>
<Button content="Kammerton (A)" disabled={playing} on:click={playATone}/>
<Button content="L&oumlsung" on:click={showSong}/>
<Button content="Nochmal!" on:click={changeSong}/>
<div><h2>{divContent}</h2></div>
<NotePanel bind:this={notePanel}/>
