<script lang="ts">
    import {onMount} from 'svelte';
    import {base} from "$app/paths";
    import {SynthWrapper} from "$lib/SynthWrapper";
    import {player} from "./store";
    import WebAudioTinySynth from 'webaudio-tinysynth';

    onMount(() => {
        player.set(new SynthWrapper(new WebAudioTinySynth({quality: 1, useReverb: 0})));
    });
</script>

<nav>
    <a href="{base}/">home</a>
    <a href="{base}/fork">fork</a>
    <a href="{base}/songs">songs</a>
</nav>

<slot/>
