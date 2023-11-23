<script lang="ts">
    import {onMount} from 'svelte'
    import {NotePanel} from "$lib/NotePanel";
    import type {StaveNote} from "vexflow";

    let noteDiv: HTMLDivElement
    let notePanel: NotePanel
    onMount(() => {
        notePanel = new NotePanel(noteDiv)
    })

    export function drawLines(signature: string | undefined, clef: string | undefined) {
        notePanel.drawLines(signature, clef)
    }

    export function drawLinesAndNotes(notes: StaveNote[], clef: string, keySignature: string) {
        notePanel.drawLinesAndNotes(notes, clef, keySignature)
    }
</script>

<div bind:this={noteDiv} class="m-2"></div>
