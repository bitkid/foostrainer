<script lang="ts">
    import {onMount} from 'svelte'
    import {NotePanel} from "$lib/NotePanel";
    import type {StaveNote} from "vexflow";
    import {Column, Row} from "carbon-components-svelte";

    let noteDiv: HTMLDivElement
    let notePanel: NotePanel
    onMount(() => {
        notePanel = new NotePanel(noteDiv)
    })

    export function drawLines(signature: string | undefined, clef: string | undefined) {
        notePanel.drawLines(signature, clef)
    }

    export function drawLinesAndNotes(notes: StaveNote[], clef: string, keySignature: string | undefined) {
        notePanel.drawLinesAndNotes(notes, clef, keySignature)
    }
</script>

<Row>
    <Column>
        <div bind:this={noteDiv}></div>
    </Column>
</Row>
