<script lang="ts">
    import {base} from "$app/paths"
    import {page} from "$app/stores"

    const titleMap = new Map<string, string>()
    titleMap.set("/", "Home")
    titleMap.set(base, "Home")
    titleMap.set("/fork", "Stimmgabel Spiel")
    titleMap.set("/songs", "Liedanfänge notieren")
    titleMap.set("/scale", "Skalen notieren")
    titleMap.set("/chords", "Akkorde notieren")
    titleMap.set("/intervals", "Intervalle erkennen")

    let title: string = titleMap.get("/")!!

    $: {
        const p = $page.url.pathname.slice($page.url.pathname.lastIndexOf('/'))
        title = titleMap.get(p)!!
    }
</script>

<h2>{@html title}</h2>
