<script>
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import {host} from '/src/stores';
	import Loader from "./Loader.svelte";
	
	onMount(() => {
		if(!$host) goto("/Login");
	});
	
</script>
<Loader/>