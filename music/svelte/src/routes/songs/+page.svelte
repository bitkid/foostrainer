<script lang="ts">
    import {Formatter, RenderContext, Renderer, Stave, StaveNote, Voice} from "vexflow";
    import {onMount} from 'svelte';
    import {bundesHymneSong, SongBeginning} from "$lib/MusicData";
    import {player} from "../store";

    const currentSong = new SongBeginning("treble", "Gb", bundesHymneSong);

    const secret = "???";

    let context: RenderContext;
    let playing: boolean = false;
    let divContent = secret

    onMount(() => {
        const renderer = new Renderer("output", Renderer.Backends.SVG);
        renderer.resize(500, 150);
        context = renderer.getContext();
        drawEmpty(undefined);
    });

    function drawEmpty(signature: string | undefined): Stave {
        context.clear();
        const stave = new Stave(0, 0, 450);
        stave.setClef(currentSong.clef).setTimeSignature("4/4");
        if (signature !== undefined)
            stave.setKeySignature(signature);
        stave.setContext(context).draw();
        return stave;
    }

    function drawNotePanel() {
        const stave = drawEmpty(currentSong.scale);
        let notes = currentSong.getStaveNotes();
        const voice = new Voice({num_beats: 4, beat_value: 4});
        voice.addTickables(notes);
        const nrOfRests = 4 - notes.length;
        for (let i = 0; i < nrOfRests; i++) {
            voice.addTickable(new StaveNote({keys: ["b/4"], duration: "qr"}));
        }
        new Formatter().joinVoices([voice]).format([voice], 350);
        voice.draw(context, stave);
    }

    function playSong() {
        const notes = currentSong.getMidiNotes();
        playing = true;
        notes.forEach((value, index) => {
            if (index == notes.length - 1)
                setTimeout($player.play.bind($player), index * 700, value, function () {
                    playing = false;
                });
            else
                setTimeout($player.play.bind($player), index * 700, value);
        });
    }

    function playRoot() {
        const note = currentSong.getScaleRootMidiNote();
        playing = true;
        $player.play(note, function () {
            playing = false
        });
    }

    function playFirst() {
        const note = currentSong.getMidiNotes()[0];
        playing = true;
        $player.play(note, function () {
            playing = false
        });
    }

    function showSong() {
        drawNotePanel();
        divContent = currentSong.getSongDescription();
    }

    function changeSong() {
        divContent = secret;
        currentSong.randomize();
        drawEmpty(undefined);
    }

</script>

<h1>SONGS</h1>
<button disabled={playing} id="playSong" on:click={playSong} type="button">Play song</button>
<button disabled={playing} id="playFirst" on:click={playFirst} type="button">Play first note</button>
<button disabled={playing} id="playRoot" on:click={playRoot} type="button">Play root note</button>
<button id="showSong" on:click={showSong} type="button">Show song</button>
<button id="changeSong" on:click={changeSong} type="button">Change song</button>
<br>
<div id="song"><h2>{divContent}</h2></div>
<br>
<div id="output"></div>