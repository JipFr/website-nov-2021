<script>
	export let image;
</script>

{#if image}
	<meta name="image" content={image} />
	<meta name="og:image" content={image} />
	<meta name="twitter:image:src" content={image} />
{/if}
