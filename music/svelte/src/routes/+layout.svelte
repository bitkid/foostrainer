<script lang="ts">
    import {onMount} from 'svelte'
    import {SynthWrapper} from "$lib/SynthWrapper"
    import {player} from "./store"
    // @ts-ignore
    import WebAudioTinySynth from 'webaudio-tinysynth'
    import PageTitle from "$lib/components/PageTitle.svelte";
    import "carbon-components-svelte/css/all.css";
    import {base} from "$app/paths"
    import {
        Column,
        Content,
        Grid,
        Header,
        HeaderNav,
        HeaderNavItem,
        Row,
        SideNav,
        SideNavItems,
        SideNavLink,
        SkipToContent
    } from "carbon-components-svelte"

    let isSideNavOpen = false
    onMount(() => {
        player.set(new SynthWrapper(new WebAudioTinySynth({quality: 1, useReverb: 0})))
        document.documentElement.setAttribute("theme", "g10")
    })
</script>

<Header bind:isSideNavOpen company="MATHILDA" expandedByDefault={false} platformName="Music">
    <svelte:fragment slot="skip-to-content">
        <SkipToContent/>
    </svelte:fragment>
    <HeaderNav>
        <HeaderNavItem href="{base}/" text="Home"/>
        <HeaderNavItem href="{base}/fork" text="Stimmgabel"/>
        <HeaderNavItem href="{base}/songs" text="Liedanf&auml;nge"/>
        <HeaderNavItem href="{base}/scale" text="Skalen"/>
        <!--<HeaderNavItem href="{base}/intervals" text="Intervalle"/>-->
    </HeaderNav>
    <SideNav bind:isOpen={isSideNavOpen}>
        <SideNavItems>
            <SideNavLink href="{base}/" text="Home"/>
            <SideNavLink href="{base}/fork" text="Stimmgabel"/>
            <SideNavLink href="{base}/songs" text="Liedanf&auml;nge"/>
            <SideNavLink href="{base}/scale" text="Skalen"/>
            <!--<SideNavLink href="{base}/intervals" text="Intervalle"/>-->
        </SideNavItems>
    </SideNav>
</Header>

<Content style="padding: 0">
    <Grid fullWidth padding>
        <Row>
            <Column>
                <PageTitle/>
            </Column>
        </Row>
        <slot/>
    </Grid>
</Content>
