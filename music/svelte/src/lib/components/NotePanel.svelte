<script lang="ts">
    import {onMount} from 'svelte'
    import {NotePanel} from "$lib/NotePanel";
    import type {StaveNote} from "vexflow";
    import {Column, Row} from "carbon-components-svelte";
    import type {Scale} from "$lib/MusicData";

    let noteDiv: HTMLDivElement
    let notePanel: NotePanel
    onMount(() => {
        notePanel = new NotePanel(noteDiv)
    })

    export function drawLines(signature?: Scale, clef?: string) {
        notePanel.drawLines(signature, clef)
    }

    export function drawLinesAndNotes(notes: StaveNote[], clef: string, keySignature?: Scale) {
        notePanel.drawLinesAndNotes(notes, clef, keySignature)
    }
</script>

<Row>
    <Column>
        <div bind:this={noteDiv}></div>
    </Column>
</Row>
