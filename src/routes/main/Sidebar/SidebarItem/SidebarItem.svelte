<script>
	import { goto } from "$app/navigation";
	import { unsubAll } from "../../../../socket";
	import { current_plugin } from "../../../../stores";

    export let component; 

    function click(){

        if($current_plugin != component){
            unsubAll();
            current_plugin.set(component);
        }
        
    }
</script>

<div class="sidebarItem" on:click={click}>
    {component.tab_name}
</div>

<style type="postcss">
    .sidebarItem{
        @apply flex items-center;
        @apply w-full h-12 px-3 mt-2 rounded;
        @apply bg-cyan-950;
    }

    .sidebarItem:hover{
        @apply bg-gray-700 text-gray-300;
    }
</style>