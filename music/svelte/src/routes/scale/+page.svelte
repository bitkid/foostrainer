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
    import {onMount} from "svelte";
    import {Button, Column, Grid, Row} from "carbon-components-svelte";
    import {FaceNeutral, FaceSatisfied, View} from "carbon-icons-svelte";

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

<Grid>
    <Row>
        <Column>
            <p>
                Für diese Übung brauchst Du ein Notenheft. Drücke den
                <FaceSatisfied/>
                Knopf um eine Durskala auszuwählen oder den
                <FaceNeutral/>
                um eine Mollskala auszuwählen. Schreibe die Vorzeichen der Skala in Dein Heft und notiere alle Noten
                der Skala inklusive der Oktave. Markiere dabei die Halbtonschritte.
                <View/>
                zeigt Dir Lösung.
            </p>
        </Column>
    </Row>
    <Row>
        <Column>
            <Button icon={FaceSatisfied} iconDescription="Durskala" on:click={newMajorScale}/>
            <Button icon={FaceNeutral} iconDescription="Mollskala" on:click={newMinorScale}/>
            <Button icon={View} iconDescription="L&ouml;sung" on:click={showScale}/>
        </Column>
    </Row>
    <Row>
        <Column><h2>{divContent}</h2></Column>
    </Row>
    <Row>
        <Column>
            <NotePanel bind:this={notePanel}/>
        </Column>
    </Row>
</Grid>
