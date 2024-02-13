<script>
    import "../app.pcss";
    import {Navbar, NavBrand} from 'flowbite-svelte';
</script>
<Navbar title="yo">
    <NavBrand href="/">
        <span class="whitespace-nowrap font-semibold dark:text-white text-2xl">Foostrainer</span>
    </NavBrand>
</Navbar>

<slot></slot>