<script>
	import ArrowLeftIcon from '$lib/icons/ArrowLeft.svelte';

	export let href = '#';
</script>

<a {href} class="link">
	<ArrowLeftIcon />
	<slot />
</a>

<style lang="scss">
	.link {
		margin: 40px 0;
		display: grid;
		grid-template-columns: auto 1fr;
		grid-gap: 10px;
		align-items: center;

		&:hover :global(svg) {
			background: var(--anchor);
			color: white;
		}

		:global(svg) {
			padding: 5px;
			box-sizing: content-box;
			border-radius: 4px;
			display: block;
		}
	}
</style>
