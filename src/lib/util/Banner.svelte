<script>
	export let left;
</script>

<div class="banner">
	{#if left}
		<div>
			<strong>{left}</strong>
		</div>
	{/if}
	<slot />
</div>

<style lang="scss">
	.banner {
		width: 100%;
		padding: 15px;
		border-radius: 4px;
		display: grid;
		align-items: center;
		grid-gap: 5px;
		background: var(--header-bg);
		border-radius: 6px;
		margin: 20px 0;
	}
</style>
