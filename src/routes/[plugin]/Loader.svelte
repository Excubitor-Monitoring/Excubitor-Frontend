<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import Sidebar from "./Sidebar/Sidebar.svelte";
	import { host_config } from "/src/stores";



	let plugin = $host_config.plugins?.find(plugin => plugin.name == $page.params.plugin);

	onMount(() => {
        import(`http://localhost:8000${plugin.url}`)
    })
	
</script>

<div class="container">
	<Sidebar/>
    <div>
		<svelte:element this={plugin.tag}></svelte:element>
	</div>
</div>

<style type="postcss">
	.container {
		@apply flex;
		@apply min-h-screen;
	}
</style>