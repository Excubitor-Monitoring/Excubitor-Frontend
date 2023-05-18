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
				import(`http://${$host}:8000/${module.js}`)
				if(module.css != undefined){

					let link = document.createElement("link");
					link.rel  = 'stylesheet';
					link.href = `http://${$host}:8000/${module.css}`
					document.getElementById("head")?.appendChild(link);
				}
			});

		}
	});
	
</script>

<Loader/>