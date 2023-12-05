<script lang="ts">
    import {base} from "$app/paths"
    import {page} from "$app/stores"

    const titleMap = new Map<string, string>()
    titleMap.set("/", "Home")
    titleMap.set(base, "Home")
    titleMap.set("/fork", "Stimmgabel Training")
    titleMap.set("/songs", "Liedanf&aumlnge")
    titleMap.set("/scale", "Skalen")
    titleMap.set("/chords", "Akkorde")
    titleMap.set("/intervals", "Intervalle")

    let title: string = titleMap.get("/")!!

    $: {
        const p = $page.url.pathname.slice($page.url.pathname.lastIndexOf('/'))
        title = titleMap.get(p)!!
    }
</script>

<h1>{@html title}</h1>
