<script lang="ts">
    import {base} from "$app/paths"
    import {page} from "$app/stores"

    const titleMap = new Map<string, string>()
    titleMap.set("/", "Home")
    titleMap.set(base, "Home")
    titleMap.set("/fork", "Stimmgabel Training")
    titleMap.set("/songs", "Liedanf&aumlnge")
    titleMap.set("/scale", "Skalen")

    let title: string = titleMap.get("/")!!

    $: {
        const p = $page.url.pathname.slice($page.url.pathname.lastIndexOf('/'))
        title = titleMap.get(p)!!
    }
</script>

<h1 class="text-center text-2xl py-10">{@html title}</h1>
