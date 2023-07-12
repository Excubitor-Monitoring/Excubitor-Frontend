<script>
	import SidebarItem from '../SidebarItem/SidebarItem.svelte';
	export let module;

	let expanded = false;
</script>

<div class="w-full">
    <div class="category" on:click={() => expanded = !expanded}>
        <div class="flex justify-between w-full"> 
            <div><h2>{module.name}</h2></div> 
            <div>
                {#if expanded}
                    ˄
                {:else}
                    ˅
                {/if}
            </div>
        </div>
    </div>
	<div class="">
		{#if expanded}
			{#each module.components as component}
				<SidebarItem {component} />
			{/each}
		{/if}
	</div>
</div>

<style type="postcss">

    .category{
        @apply flex items-center cursor-pointer select-none;
        @apply w-full h-12 px-3 mt-2 rounded;
        @apply bg-teal-600;
    }

    .category:hover{
        @apply bg-teal-700;
    }

</style>