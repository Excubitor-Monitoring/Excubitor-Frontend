<script>
	import { goto } from "$app/navigation";

    export let name = "MODUL"; 
</script>

<div class="sidebarItem" on:click={() => goto(`/${name}`)}>
    {name}
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