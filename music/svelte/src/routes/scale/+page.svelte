<script lang="ts">
    import {Formatter, RenderContext, Renderer, Stave, Voice} from "vexflow";
    import {onMount} from 'svelte';
    import {SongBeginning} from "$lib/SongBeginning";
    import {majorIntervals, majorScalesMap} from "$lib/MusicData.js";
    import {ScaleHelper} from "$lib/ScaleHelper";
    import {RandomHelper} from "$lib/RandomHelper";

    let scale = majorScalesMap.get(RandomHelper.getRandomScale())!!;
    let context: RenderContext;
    let divContent = scale.note;

    onMount(() => {
        const renderer = new Renderer("output", Renderer.Backends.SVG);
        renderer.resize(600, 150);
        context = renderer.getContext();
        drawEmpty(undefined);
    });

    function drawEmpty(signature: string | undefined): Stave {
        context.clear();
        const stave = new Stave(0, 0, 550);
        stave.setClef("treble").setTimeSignature("4/4");
        if (signature !== undefined)
            stave.setKeySignature(signature);
        stave.setContext(context).draw();
        return stave;
    }

    function showSong() {
        const stave = drawEmpty(scale.note);
        const scaleNotes = ScaleHelper.getNotesForScale(scale);
        const listOfNotes = majorIntervals.map((i: number): number => {
            return 60 + scale.offset + i;
        });
        const listOfStaveNotes = listOfNotes.map((x) => SongBeginning.getStaveNoteForValue(x, scaleNotes));
        listOfStaveNotes.push(SongBeginning.getStaveNoteForValue(listOfNotes[0] + 12, scaleNotes));
        const voice = new Voice({num_beats: 8, beat_value: 4});
        voice.addTickables(listOfStaveNotes);
        new Formatter().joinVoices([voice]).format([voice], 400);
        voice.draw(context, stave);
    }

    function changeSong() {
        scale = majorScalesMap.get(RandomHelper.getRandomScale())!!;
        divContent = scale.note;
        drawEmpty(undefined);
    }

</script>

<h1>Skalen notieren</h1>
<button id="showSong" on:click={showSong} type="button">L&ouml;sung</button>
<button id="changeSong" on:click={changeSong} type="button">Nochmal!</button>
<br>
<div id="song"><h2>{divContent}</h2></div>
<br>
<div id="output"></div>