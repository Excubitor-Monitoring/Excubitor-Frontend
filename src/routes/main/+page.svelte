<script>
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import {host, host_config} from '/src/stores';
	import Loader from "./Loader.svelte";
	
	let styles = [];

	onMount(() => {
		if(!$host) goto("/Login");
		else{
			$host_config.modules.forEach(module => {
				module.components.forEach(component => {
					import(`${$host}/${component.js}`)
				})
			});

		}
	});
	
</script>

<Loader/>