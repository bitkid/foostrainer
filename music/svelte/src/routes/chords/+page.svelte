<script lang="ts">
    import NotePanel from "$lib/components/NotePanel.svelte";
    import {onMount} from "svelte";
    import Button from "$lib/components/Button.svelte";

    let notePanel: NotePanel

    onMount(() => notePanel.drawLines(undefined, "treble"))
</script>

<div class="m-5">
    <Button content="Dur"/>
    <Button content="Moll"/>
    <Button content="Vermindert"/>
    <Button content="&Uuml;berm&auml;&szlig;ig"/>
    <Button content="L&ouml;sung"/>
</div>
<NotePanel bind:this={notePanel}/>
