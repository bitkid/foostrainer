<script lang="ts">
    import {allPasses, allShots, FoosballRoutine} from "$lib/FoosballRoutine";
    import {Accordion, AccordionItem, Button, Card, Checkbox, Img, Label, Range} from 'flowbite-svelte'
    import {onMount} from "svelte"
    // @ts-ignore
    import EasySpeech from "easy-speech"

    let passes: string[] = ["1", "2", "3"]
    let shots: string[] = ["1", "2", "3", "4", "5", "6", "7"]

    let ballResetTime = 4
    let timeToSecondTouch = 2
    let passExecutionTime = 2
    let shotExecutionTime = 2
    let ballSetupTime = 3

    let startButtonDisabled = false
    let stopButtonDisabled = true

    let routine: FoosballRoutine

    let status = "Start training!"

    $: {
        if (routine) {
            routine.timeUntilSecondTouch = timeToSecondTouch
            routine.passExecutionTime = passExecutionTime
            routine.ballSetupTime = ballSetupTime
            routine.shotExecutionTime = shotExecutionTime
            routine.ballResetTime = ballResetTime
        }
    }

    onMount(async () => {
        await EasySpeech.init({maxTimeout: 5000, interval: 250})
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

<div class="p-1">
    <Card class="grid md:grid-cols-2" size="xl">
        <div class="p-4">
            <Label class="text-3xl pb-4">Foosball coach</Label>
            <div class="pb-4">
                This training helps you to learn timings on the 3 bar and the 5 bar. I recommend using 2 balls so that the reset process is faster.
                You can configure the passes and shots you want to train. You can also change different timings if the defaults are too fast/slow for you.
                To start the training setup the ball on your five bar like you would for a normal match and press START.
            </div>
            <Accordion class="pb-8" flush>
                <AccordionItem>
                    <span slot="header">HOW TO</span>
                    <ul class="list-decimal list-inside">
                        <li>Setup the ball on the 5 bar in kick-off position.</li>
                        <li>Start the training.</li>
                        <li>When you hear "start" start moving the ball on the 5 bar.</li>
                        <li>As soon as you hear a number execute the pass.</li>
                        <li>When you hear "go" you should be in your preferred shooting position.</li>
                        <li>As soon as you hear a number execute the shot.</li>
                        <li>Setup the ball immediately after the shot on the 5 bar.</li>
                    </ul>
                </AccordionItem>
            </Accordion>
            <div class="grid grid-cols-1 justify-items-center">
                <div>
                    <Button disabled={startButtonDisabled} on:click={() => start()} size="xl">START</Button>
                    <Button disabled={stopButtonDisabled} on:click={() => stop()} size="xl">STOP</Button>
                </div>
                <div>
                    <Label class="text-xl pb-8 pt-4">{@html status}</Label>
                </div>
                <div>
                    <Img caption="Passes and shots" src="images/shotsnpasses.jpg"/>
                </div>
            </div>
        </div>
        <div class="p-4">
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
            <Label><p class="font-bold">Time until 2nd touch:</p> {timeToSecondTouch} sec</Label>
            <Range bind:value={timeToSecondTouch} class="w-2/3" max={5} min={1}>Range</Range>

            <Label><p class="font-bold">Pass execution time:</p> {passExecutionTime} sec</Label>
            <Range bind:value={passExecutionTime} class="w-2/3" max={5} min={1}>Range</Range>

            <Label><p class="font-bold">Ball setup time:</p> {ballSetupTime} sec</Label>
            <Range bind:value={ballSetupTime} class="w-2/3" max={5} min={1}>Range</Range>

            <Label><p class="font-bold">Shot execution time:</p> {shotExecutionTime} sec</Label>
            <Range bind:value={shotExecutionTime} class="w-2/3" max={5} min={1}>Range</Range>

            <Label><p class="font-bold">Ball reset time:</p> {ballResetTime} sec</Label>
            <Range bind:value={ballResetTime} class="w-2/3" max={10} min={1}>Range</Range>
        </div>
    </Card>
</div>