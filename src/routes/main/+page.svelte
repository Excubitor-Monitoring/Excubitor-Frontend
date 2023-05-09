<script>
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import {host, host_config} from '/src/stores';
	import Loader from "./Loader.svelte";
	
	onMount(() => {
		if(!$host) goto("/Login");
		else{
			$host_config.modules.forEach(module => {
				import(`http://${$host}:8000/${module.url}`)
			});

		}
	});
	
</script>
<Loader/>