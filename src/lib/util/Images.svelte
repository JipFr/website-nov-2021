<script>
	import Zooming from 'zooming';
	import { onMount } from 'svelte';

	export let images = {};

	onMount(() => {
		const zooming = new Zooming({
			onBeforeOpen: (el) => {
				el.style.height = 'auto';
			},
			onBeforeClose: (el) => {
				el.style.height = '200px';
			},
			onClose: (el) => {
				el.style.height = '200px';
			},
			bgColor: 'var(--body)'
		});

		zooming.listen('.img-zoomable');
	});
</script>

<div class="images">
	{#each Object.entries(images) as [i, image]}
		<img src={image.src} alt={image.alt || ''} class="img-zoomable" />
	{/each}
</div>

<style lang="scss">
	.images {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-gap: 10px;

		:global(img.img-zoomable) {
			margin: 0;
			width: 100%;
			height: 200px;
			object-fit: cover;
			border-radius: 4px;
		}
	}
</style>
