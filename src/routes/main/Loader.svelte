<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import Sidebar from "./Sidebar/Sidebar.svelte";
	import { host_config, current_plugin } from "/src/stores";
</script>

<div class="container">
	<Sidebar/>
    <div>
		<svelte:element this={$current_plugin.tag}></svelte:element>
	</div>
</div>

<style type="postcss">
	.container {
		@apply flex;
		@apply min-h-screen;
	}
</style>