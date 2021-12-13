<script context="module">
	export const prerender = true;
</script>

<script>
	export let title;
	export let description;
	export let left;
	export let image;

	import Title from '$lib/util/Title.svelte';

	import Container from '$lib/layout/Container.svelte';
	import Description from '$lib/util/Description.svelte';
	import Image from '$lib/util/Image.svelte';
</script>

<svelte:head>
	<Title {title} />
	<Description {description} />
	<Image {image} />
</svelte:head>

<Container>
	<div class="post is-md-post">
		<h1 class:left>{title}</h1>
		<slot />
	</div>
</Container>

<style lang="scss">
	h1:not(.left) {
		width: 100%;
		text-align: center;
	}

	.post.is-md-post :global(iframe) {
		width: 100%;
		height: 500px;
		border: 1px solid var(--border);
	}

	.post.is-md-post :global(code) {
		background: var(--content);
		padding: 2px;
		border-radius: 4px;
	}
</style>
