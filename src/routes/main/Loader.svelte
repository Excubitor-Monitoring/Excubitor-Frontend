<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import Sidebar from "./Sidebar/Sidebar.svelte";
	import { host_config, current_plugin } from "/src/stores";

	let component_container;

	$:{
		const child = document.createElement($current_plugin.tag);
		//child.style = "min-height: 100%; min-width: 100%;"
		if(component_container) component_container.innerHTML = '';
		component_container?.appendChild(child);
	}
</script>

<div class="container">
	<Sidebar/>
    <div class="w-full h-full overflow-y-auto" bind:this={component_container} />
</div>

<style type="postcss">
	.container {
		@apply flex;
		@apply h-screen min-w-full;
	}
</style>