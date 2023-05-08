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

			// document.addEventListener("CPU.CpuInfo", (event) => {
			// 	console.log(event.detail);
			// })

			// document.dispatchEvent((new CustomEvent("SEND2SOCKET", {
			// 	detail: JSON.stringify({
			// 		op: "SUB",
			// 		target: "CPU.CpuInfo",
			// 		value: ""
			// 	})
			// })))

		}
	});
	
</script>
<Loader/>