<script>
	export let title;
	export let message;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="error"
	on:click={(event) => {
		event.currentTarget.remove();
	}}
>
	<div
		class="time"
		on:animationend={(event) => {
			event.currentTarget.parentNode.remove();
		}}
	/>
	<div class="lower-container">
		{#if title}
			<h1 class="title">
				{title}
			</h1>
		{/if}
		<p class="error-message">
			{message}
		</p>
	</div>
</div>

<style>
	.title {
		@apply font-bold mb-2;
	}

	.error {
		@apply flex flex-col bg-gray-50 shadow-lg rounded-xl w-96 overflow-hidden duration-150;

		animation: vanish 5s linear;
		animation-timing-function: cubic-bezier(0.95, 0.05, 0.795, 0.035);
	}

	.lower-container {
		@apply p-5;
	}

	.time {
		@apply bg-red-500 h-2 w-0 duration-0;

		animation: shrink 5s linear;
	}

	.error:hover {
		animation-play-state: paused;
	}

	.error:hover > .time {
		animation-play-state: paused;
	}

	@keyframes shrink {
		0% {
			width: 100%;
		}
		100% {
			width: 0;
		}
	}

	@keyframes vanish {
		0% {
			opacity: 100%;
		}
		75% {
			translate: 0;
		}
		85% {
			opacity: 100%;
		}
		100% {
			opacity: 50%;
			translate: 25vw;
		}
	}
</style>
