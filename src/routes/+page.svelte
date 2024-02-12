<script lang="ts">
    import {allPasses, allShots, FoosballRoutine} from "$lib/FoosballRoutine";
    import {Button, Checkbox, Label, Range} from 'flowbite-svelte'
    import {onMount} from "svelte"

    let passes: string[] = ["1", "2", "3"]
    let shots: string[] = ["1", "2", "3", "4", "5", "6", "7"]

    let goalDelay = 2

    let startButtonDisabled = false
    let stopButtonDisabled = true

    let routine: FoosballRoutine

    let status = "Start training!"

    onMount(() => {
        routine = new FoosballRoutine(passes, shots, (s: string) => {
            status = s
        })
    })

    function start() {
        routine.start()
        startButtonDisabled = true
        stopButtonDisabled = false
    }

    function stop() {
        routine.stop()
        startButtonDisabled = false
        stopButtonDisabled = true
    }
</script>

<div class="p-5">
    <ul class="pb-2">
        <li>Choose passes and shots you want to practice.</li>
        <li>Put the ball into play on your five bar like you would for a normal match.</li>
        <li>Click the "Start" button</li>
    </ul>
    <Label><p class="font-bold">Passes:</p></Label>
    <ul class="pb-2">
        {#each allPasses as s}
            <li class="p-1">
                <Checkbox checked bind:group={passes} value={s.shortName}>{s.name} ({s.shortName})</Checkbox>
            </li>
        {/each}
    </ul>
    <Label><p class="font-bold">Shots:</p></Label>
    <ul class="pb-2">
        {#each allShots as s}
            <li class="p-1">
                <Checkbox checked bind:group={shots} value={s.shortName}>{s.name} ({s.shortName})</Checkbox>
            </li>
        {/each}
    </ul>
    <Label><p class="font-bold">Goal reset delay:</p> {goalDelay} sec</Label>
    <Range bind:value={goalDelay} max={10} min={0}>Range</Range>
    <Label><p class="text-xl pb-4 pt-4">Training:</p></Label>
    <Label class="text-xl pb-4">{@html status}</Label>
    <Button disabled={startButtonDisabled} on:click={() => start()}>Start</Button>
    <Button disabled={stopButtonDisabled} on:click={() => stop()}>Stop</Button>
</div>