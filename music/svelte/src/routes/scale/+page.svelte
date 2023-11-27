<script lang="ts">
    import {SongBeginning} from "$lib/SongBeginning"
    import {
        majorIntervalHalfTone,
        majorScalesMap,
        minorIntervalHalfTone,
        minorScalesMap,
        ScaleType
    } from "$lib/MusicData.js"
    import {ScaleHelper} from "$lib/ScaleHelper"
    import {RandomHelper} from "$lib/RandomHelper"
    import NotePanel from "$lib/components/NotePanel.svelte";
    import Button from "$lib/components/Button.svelte";
    import {onMount} from "svelte";

    let scale = majorScalesMap.get(RandomHelper.getRandomMajorScale())!!
    let divContent = scale.note + " " + scale.type
    let notePanel: NotePanel

    onMount(() => notePanel.drawLines(undefined, "treble"))

    function showScale() {
        const scaleNotes = ScaleHelper.getNotes(scale)
        const listOfNotes = ScaleHelper.getIntervals(scale).map((i: number): number => {
            return 60 + scale.offset + i
        })

        listOfNotes.push(listOfNotes[0] + 12)
        const listOfStaveNotes = listOfNotes.map((x) => SongBeginning.getStaveNoteForValue(x, scaleNotes))

        const color = "red"
        if (scale.type == ScaleType.MINOR) {
            minorIntervalHalfTone.forEach((x) => {
                listOfStaveNotes[x[0] - 1].setStyle({fillStyle: color, strokeStyle: color})
                listOfStaveNotes[x[1] - 1].setStyle({fillStyle: color, strokeStyle: color})
            })
        } else {
            majorIntervalHalfTone.forEach((x) => {
                listOfStaveNotes[x[0] - 1].setStyle({fillStyle: color, strokeStyle: color})
                listOfStaveNotes[x[1] - 1].setStyle({fillStyle: color, strokeStyle: color})
            })
        }

        notePanel.drawLinesAndNotes(listOfStaveNotes, "treble", ScaleHelper.getKeySignature(scale))
    }

    function newMajorScale() {
        scale = majorScalesMap.get(RandomHelper.getRandomMajorScale())!!
        divContent = scale.note + " " + scale.type
        notePanel.drawLines(undefined, "treble")
    }

    function newMinorScale() {
        scale = minorScalesMap.get(RandomHelper.getRandomMinorScale())!!
        divContent = scale.note + " " + scale.type
        notePanel.drawLines(undefined, "treble")
    }

</script>

<div class="m-5">
    <Button content="Durskala" on:click={newMajorScale}/>
    <Button content="Mollskala" on:click={newMinorScale}/>
    <Button content="L&oumlsung" on:click={showScale}/>
</div>

<div><h2>{divContent}</h2></div>

<NotePanel bind:this={notePanel}/>