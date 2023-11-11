<script lang="ts">
    import {Formatter, RenderContext, Renderer, Stave, StaveNote, Voice} from "vexflow";
    import {onMount} from 'svelte';
    import type {Song} from "$lib/MusicData";
    import {notesNoSign, scales, scalesMap, songStart} from "$lib/MusicData";
    import {player} from "../store";

    let context: RenderContext;
    let currentClef: string = getRandomClef();
    let currentScale: string = getRandomScale();
    let currentSong: Song = getRandomSong();

    let playing: boolean = false;

    let divContent = ":-)"

    onMount(() => {
        const renderer = new Renderer("output", Renderer.Backends.SVG);
        renderer.resize(500, 150);
        context = renderer.getContext();
        drawEmpty(undefined);
    });

    function drawEmpty(signature: string | undefined): Stave {
        context.clear();
        const stave = new Stave(0, 0, 450);
        stave.setClef(currentClef).setTimeSignature("4/4");
        if (signature !== undefined)
            stave.setKeySignature(signature);
        stave.setContext(context).draw();
        return stave;
    }

    function drawNotePanel() {
        const stave = drawEmpty(currentScale);
        let notes = getNotesForCurrentSong().map((x) => getStaveNoteForValue(x));
        const voice = new Voice({num_beats: 4, beat_value: 4});
        voice.addTickables(notes);
        const nrOfRests = 4 - notes.length;
        for (let i = 0; i < nrOfRests; i++) {
            voice.addTickable(new StaveNote({keys: ["b/4"], duration: "qr"}));
        }
        new Formatter().joinVoices([voice]).format([voice], 350);
        voice.draw(context, stave);
    }

    function getStaveNoteForValue(val: number): StaveNote {
        let n = notesNoSign[val % 12];
        let octave = Math.floor(val / 12) - 1;
        let note;
        if (n.length === 1) {
            note = n[0];
        } else {
            let sign = scalesMap.get(currentScale)!!.accidental;
            if (sign === "#") {
                note = n[0];
            } else {
                note = n[1];
            }
        }
        return new StaveNote({keys: [note + "/" + octave], duration: "q"});
    }

    function getRandomClef(): string {
        if (Math.random() < 0.5) {
            return "treble";
        } else {
            return "bass";
        }
    }

    function getRandomScale(): string {
        let r = Math.floor(Math.random() * scales.length);
        return scales[r];
    }

    function getRandomSong(): Song {
        let r = Math.floor(Math.random() * songStart.length);
        return songStart[r];
    }

    function playSong() {
        const notes = getNotesForCurrentSong();
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
        const note = 60 + scalesMap.get(currentScale)!!.offset;
        playing = true;
        $player.play(note, function () {
            playing = false
        });
    }

    function playFirst() {
        const note = 60 + scalesMap.get(currentScale)!!.offset + currentSong.halfTones[0];
        playing = true;
        $player.play(note, function () {
            playing = false
        });
    }

    function getNotesForCurrentSong(): number[] {
        let scalesMapElement = scalesMap.get(currentScale)!!;
        return currentSong.halfTones.map((x) => 60 + scalesMapElement.offset + x);
    }

    function showSong() {
        drawNotePanel();
        divContent = currentSong.name + " in " + currentScale + " [" + currentSong.scaleTones + "]";
    }

    function changeSong() {
        divContent = ":-)";
        currentSong = getRandomSong();
        currentScale = getRandomScale();
        currentClef = getRandomClef();
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