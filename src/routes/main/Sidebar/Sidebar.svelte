<script>
	import { host_config } from '/src/stores';
	import SidebarCategory from './SidebarCategory/SidebarCategory.svelte';
	import logo from './logo.svg';
</script>

<div class="sidebar">
	<img src={logo} alt="" class="w-1/3 py-5" />
	{#each $host_config.modules as module}
		<SidebarCategory {module} />
	{/each}
</div>

<style type="postcss">
	.sidebar {
		@apply flex flex-col items-center;
		@apply min-w-[15%] min-h-full overflow-y-auto text-white bg-gray-900 p-2;
	}
</style>
