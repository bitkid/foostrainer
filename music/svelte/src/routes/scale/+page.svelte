<script lang="ts">
    import {Formatter, RenderContext, Renderer, Stave, Voice} from "vexflow"
    import {onMount} from 'svelte'
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

    let scale = majorScalesMap.get(RandomHelper.getRandomMajorScale())!!
    let divContent = scale.note + " " + scale.type

    let context: RenderContext


    onMount(() => {
        const renderer = new Renderer("output", Renderer.Backends.SVG)
        renderer.resize(600, 150)
        context = renderer.getContext()
        drawEmpty(undefined)
    })

    function drawEmpty(signature: string | undefined): Stave {
        context.clear()
        const stave = new Stave(0, 0, 550)
        stave.setClef("treble").setTimeSignature("4/4")
        if (signature !== undefined)
            stave.setKeySignature(signature)
        stave.setContext(context).draw()
        return stave
    }

    function showScale() {
        const stave = drawEmpty(ScaleHelper.getKeySignature(scale))
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

        const voice = new Voice({num_beats: 8, beat_value: 4})
        voice.addTickables(listOfStaveNotes)
        new Formatter().joinVoices([voice]).format([voice], 400)
        voice.draw(context, stave)
    }

    function newMajorScale() {
        scale = majorScalesMap.get(RandomHelper.getRandomMajorScale())!!
        divContent = scale.note + " " + scale.type
        drawEmpty(undefined)
    }

    function newMinorScale() {
        scale = minorScalesMap.get(RandomHelper.getRandomMinorScale())!!
        divContent = scale.note + " " + scale.type
        drawEmpty(undefined)
    }

</script>

<h1>Skalen notieren</h1>
<button id="showSong" on:click={showScale} type="button">L&oumlsung</button>
<button id="changeSong" on:click={newMinorScale} type="button">Mollskala</button>
<button id="changeSong" on:click={newMajorScale} type="button">Durskala</button>
<br>
<div id="song"><h2>{divContent}</h2></div>
<br>
<div id="output"></div>