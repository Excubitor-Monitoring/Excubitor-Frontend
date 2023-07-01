<script>
    import ErrorDisplay from "./ErrorDisplay.svelte";

    let container;

    window.addEventListener("ERR", event => {
        new ErrorDisplay({
            target: container,
            props: {...event.detail}
        })
    })
</script>

<div class="errorContainer" bind:this={container}></div>

<style>
    .errorContainer {
        @apply flex flex-col gap-5 fixed bottom-10 right-10 p-5;
    }
</style>