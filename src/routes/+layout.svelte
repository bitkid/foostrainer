<script>
    import "../app.pcss";
    import {Navbar, NavBrand} from 'flowbite-svelte';
</script>
<Navbar title="yo">
    <NavBrand href="/">
        <span class="whitespace-nowrap text-xl font-semibold dark:text-white">Foostrainer</span>
    </NavBrand>
</Navbar>

<slot></slot>