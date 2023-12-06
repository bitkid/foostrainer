<script lang="ts">
    import {SongBeginning} from "$lib/SongBeginning"
    import {majorIntervalHalfTone, majorScalesMap, minorIntervalHalfTone, minorScalesMap, ScaleType} from "$lib/MusicData.js"
    import {ScaleHelper} from "$lib/ScaleHelper"
    import {RandomHelper} from "$lib/RandomHelper"
    import NotePanel from "$lib/components/NotePanel.svelte";
    import {onMount} from "svelte";
    import {Accordion, AccordionItem, Button} from "carbon-components-svelte";
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

<Accordion>
    <AccordionItem title="Beschreibung der Übung">
        <p>
            Für diese Übung brauchst Du ein Notenheft. Drücke den Dur
            <FaceSatisfied/>
            Knopf um eine Durskala auszuwählen oder den
            Moll
            <FaceNeutral/>
            Knopf um eine Mollskala auszuwählen. Schreibe die Vorzeichen der Skala in Dein Heft und notiere alle Noten
            der Skala inklusive der Oktave. Markiere dabei die Halbtonschritte. Lösung
            <View/>
            zeigt Dir die richtige Lösung.
        </p>
    </AccordionItem>
    <AccordionItem open title="Übung">
        <Button icon={FaceSatisfied} on:click={newMajorScale} size="small">Dur</Button>
        <Button icon={FaceNeutral} on:click={newMinorScale} size="small">Moll</Button>
        <h4 style="text-align: center; margin: 1rem">{divContent}</h4>
    </AccordionItem>
    <AccordionItem open title="Lösung">
        <Button icon={View} kind="tertiary" on:click={showScale} size="small">Anzeigen</Button>
        <NotePanel bind:this={notePanel}/>
    </AccordionItem>
</Accordion>
