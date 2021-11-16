<script>
	export let description;
</script>

{#if description}
	<meta name="description" content={description} />
	<meta name="og:description" content={description} />
	<meta name="twitter:description" content={description} />
{/if}
