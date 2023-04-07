<script>
	import Sidebar from "./Sidebar/Sidebar.svelte";
</script>

<div class="container">
    <Sidebar/>
    <svelte:component this={null}>
    </svelte:component>
</div>

<style type="postcss">
    .container {
        @apply flex;
        @apply min-h-screen;
    }
</style>