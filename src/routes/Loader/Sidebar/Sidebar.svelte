<script>
	import SidebarItem from "./SidebarItem/SidebarItem.svelte";
</script>

<div class="sidebar">
    <SidebarItem/>
    <SidebarItem/>
    <SidebarItem/>
    <SidebarItem/>
    <SidebarItem/>
    <SidebarItem/>
    <SidebarItem/>
    <SidebarItem/>
    <SidebarItem/>
</div>

<style type="postcss">
    .sidebar {
        @apply flex flex-col items-center;
        @apply min-w-[15%] min-h-full overflow-hidden text-gray-400 bg-gray-900;
    }
</style>