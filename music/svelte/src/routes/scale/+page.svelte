<script lang="ts">
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
    import {Button, Column, Row} from "carbon-components-svelte";
    import {FaceNeutral, FaceSatisfied, View} from "carbon-icons-svelte";

    let scale = majorScalesMap.get(RandomHelper.getRandomMajorScale())!!
    let divContent = "Gesuchte Skala: " + scale.note + " " + scale.type
    let notePanel: NotePanel

    onMount(() => notePanel.drawLines(undefined, "treble"))

    function showScale() {
        const scaleNotes = ScaleHelper.getNotes(scale)
        const listOfNotes = ScaleHelper.getIntervals(scale).map((i: number): number => {
            return 60 + scale.offset + i
        })

        listOfNotes.push(listOfNotes[0] + 12)
        const listOfStaveNotes = listOfNotes.map((x) => ScaleHelper.getStaveNoteForValue(x, scaleNotes))

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

<Row>
    <Column>
        <p>
            Für diese Übung brauchst Du ein Notenheft. Drücke den Dur
            <FaceSatisfied/>
            Knopf um eine zufällige Durskala auszuwählen oder den
            Moll
            <FaceNeutral/>
            Knopf um eine zufällige Mollskala auszuwählen. Schreibe die Vorzeichen der Skala in Dein Heft und notiere
            alle Noten
            der Skala inklusive der Oktave. Markiere dabei die Halbtonschritte. Anzeigen
            <View/>
            zeigt Dir die richtige Lösung.
        </p>
    </Column>
</Row>
<Row>
    <Column>
        <h4 style="text-align: center">{divContent}</h4>
    </Column>
</Row>
<Row>
    <Column>
        <Button icon={FaceSatisfied} on:click={newMajorScale}>Dur</Button>
        <Button icon={FaceNeutral} on:click={newMinorScale}>Moll</Button>
    </Column>
</Row>
<Row>
    <Column>
        <Button icon={View} kind="tertiary" on:click={showScale}>Anzeigen</Button>
    </Column>
</Row>
<NotePanel bind:this={notePanel}/>
