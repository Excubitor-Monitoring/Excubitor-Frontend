<script>
	import SidebarItem from '../SidebarItem/SidebarItem.svelte';
	export let module;

	let expanded = false;
</script>

<div class="w-full">
    <div class="category" on:click={() => expanded = !expanded}>
        <h2>{module.name}</h2>
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
        @apply flex items-center;
        @apply w-full h-12 px-3 mt-2 rounded;
        @apply bg-cyan-700;
    }

    .category:hover{
        @apply bg-gray-700 text-gray-300;
    }

</style>