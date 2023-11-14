import {writable} from 'svelte/store';
import type {SynthWrapper} from "$lib/SynthWrapper";

export let player = writable<SynthWrapper>()