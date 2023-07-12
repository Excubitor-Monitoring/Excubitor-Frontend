<script>
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import {host, host_config} from '/src/stores';
	import Loader from "./Loader.svelte";
	import Error from "../Error/ErrorContainer.svelte";
	
	let styles = [];

	$:{
		if($host == null) goto("/");
		else{
			$host_config.modules.forEach(module => {
				module.components.forEach(component => {
					import(`${$host}/${component.js}`)
				})
			});

		}
	}
	
</script>

{#if $host != null}
	<Loader/>
	<Error/>
{/if}