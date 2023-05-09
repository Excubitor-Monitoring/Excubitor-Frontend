<script>
	import { goto } from "$app/navigation";
	import { unsubAll } from "../../../../socket";
	import { current_plugin } from "../../../../stores";

    export let module = "MODUL"; 

    function click(){

        unsubAll();

        current_plugin.set(module);
    }
</script>

<div class="sidebarItem" on:click={click}>
    {module.name}
</div>

<style type="postcss">
    .sidebarItem{
        @apply flex items-center;
        @apply w-full h-12 px-3 mt-2 rounded;
    }

    .sidebarItem:hover{
        @apply bg-gray-700 text-gray-300;
    }
</style>