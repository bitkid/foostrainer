<script lang="ts">
    import {onMount} from 'svelte'
    import {base} from "$app/paths"
    import {SynthWrapper} from "$lib/SynthWrapper"
    import {player} from "./store"
    // @ts-ignore
    import WebAudioTinySynth from 'webaudio-tinysynth'
    import "../app.css"
    import PageTitle from "$lib/components/PageTitle.svelte";

    onMount(() => {
        player.set(new SynthWrapper(new WebAudioTinySynth({quality: 1, useReverb: 0})))
    })
</script>

<nav class="m-5">
    <ul class="flex">
        <li class="mr-6">
            <a class="text-blue-500 hover:text-blue-700" href="{base}/">Home</a>
        </li>
        <li class="mr-6">
            <a class="text-blue-500 hover:text-blue-700" href="{base}/fork">Stimmgabel</a>
        </li>
        <li class="mr-6">
            <a class="text-blue-500 hover:text-blue-700" href="{base}/songs">Liedanf&aumlnge</a>
        </li>
        <li class="mr-6">
            <a class="text-blue-500 hover:text-blue-700" href="{base}/scale">Skalen</a>
        </li>
        <li class="mr-6">
            <a class="text-blue-500 hover:text-blue-700" href="{base}/chords">Akkorde</a>
        </li>
        <li class="mr-6">
            <a class="text-blue-500 hover:text-blue-700" href="{base}/intervals">Intervalle</a>
        </li>
    </ul>
</nav>

<div class="container">
    <PageTitle/>
    <slot/>
</div>

<style lang="postcss">
    :global(h2) {
        @apply text-center text-xl py-10;
    }

    :global(h3) {
        @apply text-center text-xl py-3;
    }
</style>
