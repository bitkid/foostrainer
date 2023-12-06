<script lang="ts">
    import NotePanel from "$lib/components/NotePanel.svelte";
    import {onMount} from "svelte";
    import {Button, Column, Grid, Row} from "carbon-components-svelte";
    import {FaceActivated, FaceDissatisfied, FaceNeutral, FaceSatisfied, View} from "carbon-icons-svelte";

    let notePanel: NotePanel

    onMount(() => notePanel.drawLines(undefined, "treble"))
</script>

<Grid>
    <Row>
        <Column>
            <p>Noch in Arbeit!</p>
        </Column>
    </Row>
    <Row>
        <Column>
            <Button icon={FaceSatisfied} iconDescription="Dur"/>
            <Button icon={FaceNeutral} iconDescription="Moll"/>
            <Button icon={FaceDissatisfied} iconDescription="Vermindert"/>
            <Button icon={FaceActivated} iconDescription="Übermäßig"/>
            <Button icon={View} iconDescription="L&ouml;sung"/>
        </Column>
    </Row>
    <Row>
        <Column>
            <NotePanel bind:this={notePanel}/>
        </Column>
    </Row>
</Grid>
