<script>
	import { onMount } from "svelte";
	import Sidebar from "./Sidebar/Sidebar.svelte";
	import { host_config } from "/src/stores";

    onMount(() => {
        $host_config.plugins?.forEach(plugin => {
			console.log(plugin);
		});
    })
</script>

<div class="container">
	<Sidebar/>
    <div>

	</div>
</div>

<style type="postcss">
	.container {
		@apply flex;
		@apply min-h-screen;
	}
</style>