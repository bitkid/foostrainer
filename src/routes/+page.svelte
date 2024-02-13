<script lang="ts">
    import {allPasses, allShots, FoosballRoutine} from "$lib/FoosballRoutine";
    import {Accordion, AccordionItem, Button, Checkbox, Img, Label, Range} from 'flowbite-svelte'
    import {onMount} from "svelte"

    let passes: string[] = ["1", "2", "3"]
    let shots: string[] = ["1", "2", "3", "4", "5", "6", "7"]

    let goalDelay = 2

    let startButtonDisabled = false
    let stopButtonDisabled = true

    let routine: FoosballRoutine

    let status = "Start training!"

    $: {
        if (routine)
            routine.resetTime = goalDelay
    }

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
        status = "Start training!"
    }
</script>

<div class="p-5">
    <Accordion>
        <AccordionItem open>
            <span slot="header">Train</span>
            <ul class="pb-2 list-decimal">
                <li>Optionally configure passes and shots you want to train.</li>
                <li>Put the ball into play on your five bar like you would for a normal match.</li>
            </ul>
            <Label class="text-xl pb-4 pt-4">{@html status}</Label>
            <Button disabled={startButtonDisabled} on:click={() => start()}>Start</Button>
            <Button disabled={stopButtonDisabled} on:click={() => stop()}>Stop</Button>
            <Img alt="table" caption="Passes and shots" class="pt-4" src="images/table.jpg"/>
        </AccordionItem>
        <AccordionItem>
            <span slot="header">Configure</span>
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
        </AccordionItem>
    </Accordion>
</div>