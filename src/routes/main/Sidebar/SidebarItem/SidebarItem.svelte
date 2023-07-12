<script>
	import { goto } from "$app/navigation";
	import { unsubAll } from "../../../../socket";
	import { current_plugin } from "../../../../stores";

    export let component;

    let marked = false;

    function click(){

        if($current_plugin != component){
            unsubAll();
            current_plugin.set(component);
        }
        
    }

    $: {
        if($current_plugin == component) marked = true;
        else marked = false;
    }

</script>

{#if marked}
    <div class="sidebarItem border-2 border-cyan-200" on:click={click}>
        {component.tab_name}
    </div>
{:else}
    <div class="sidebarItem" on:click={click}>
        {component.tab_name}
    </div>
{/if}


<style type="postcss">
    .sidebarItem{
        @apply flex items-center cursor-pointer select-none;
        @apply w-full h-12 px-3 mt-2 rounded;
        @apply bg-cyan-600;
    }

    .sidebarItem:hover{
        @apply bg-cyan-700;
    }
</style>