<script lang="ts">
    let content: String

    $:({content} = $$props)
</script>

<button {...$$restProps} on:click>{@html content}</button>

<style lang="postcss">
    button {
        @apply m-0.5 bg-blue-500 font-bold py-1 px-2 rounded;
    }

    button:hover {
        @apply bg-blue-700;
    }

    button:disabled {
        @apply bg-yellow-700;
    }
</style>