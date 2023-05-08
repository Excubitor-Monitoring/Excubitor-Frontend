<script>
    import { host_config } from "/src/stores";
	import SidebarItem from "./SidebarItem/SidebarItem.svelte";
</script>

<div class="sidebar">
    {#each $host_config.modules as module}
        <SidebarItem module={module}/>
    {/each}
</div>

<style type="postcss">
    .sidebar {
        @apply flex flex-col items-center;
        @apply min-w-[15%] min-h-full overflow-hidden text-gray-400 bg-gray-900;
    }
</style>