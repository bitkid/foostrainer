<script lang="ts">
    import {majorIntervalHalfTone, minorIntervalHalfTone, ScaleType} from "$lib/MusicData.js"
    import {ScaleHelper} from "$lib/ScaleHelper"
    import {RandomHelper} from "$lib/RandomHelper"
    import NotePanel from "$lib/components/NotePanel.svelte";
    import {onMount} from "svelte";
    import {Button, ButtonSet, Column, Row, Tooltip} from "carbon-components-svelte";
    import {FaceNeutral, FaceSatisfied, View} from "carbon-icons-svelte";

    let scale = RandomHelper.getRandomMajorScale()
    let divContent = "Gesuchte Skala: " + ScaleHelper.getFullScaleName(scale)
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

        notePanel.drawLinesAndNotes(listOfStaveNotes, "treble", scale)
    }

    function newMajorScale() {
        scale = RandomHelper.getRandomMajorScale()!!
        divContent = "Gesuchte Skala: " + ScaleHelper.getFullScaleName(scale)
        notePanel.drawLines(undefined, "treble")
    }

    function newMinorScale() {
        scale = RandomHelper.getRandomMinorScale()!!
        divContent = "Gesuchte Skala: " + ScaleHelper.getFullScaleName(scale)
        notePanel.drawLines(undefined, "treble")
    }

</script>

<Row>
    <Column>
        <p>
            Schreib die Skala mit den richtigen Vorzeichen in dein Notenheft!
        </p>
        <Tooltip triggerText="Mehr Informationen">
            <p>
                Für diese Übung brauchst Du ein Notenheft. Drücke den Dur
                <FaceSatisfied/>
                Knopf um eine zufällige Durskala auszuwählen oder den
                Moll
                <FaceNeutral/>
                Knopf um eine zufällige Mollskala auszuwählen. Schreibe die Vorzeichen der Skala in Dein Heft und
                notiere
                alle Noten
                der Skala inklusive der Oktave. Markiere dabei die Halbtonschritte. Anzeigen
                <View/>
                zeigt Dir die richtige Lösung.
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
            <Button icon={FaceSatisfied} on:click={newMajorScale} size="small">Dur</Button>
            <Button icon={FaceNeutral} on:click={newMinorScale} size="small">Moll</Button>
        </ButtonSet>
    </Column>
</Row>
<Row>
    <Column>
        <ButtonSet>
            <Button icon={View} kind="tertiary" on:click={showScale} size="small">Anzeigen</Button>
        </ButtonSet>
    </Column>
</Row>
<NotePanel bind:this={notePanel}/>
