<script context="module">
	export const prerender = true;
</script>

<script>
	export let title;
	export let description;
	export let left;
	export let image;
	export let date;

	import Title from '$lib/util/Title.svelte';
	import Image from '$lib/util/Image.svelte';
	import Description from '$lib/util/Description.svelte';

	import Container from '$lib/layout/Container.svelte';

	import { getDate } from '../../helpers';
</script>

<svelte:head>
	<Title {title} />
	<Description {description} />
	<Image {image} />
</svelte:head>

<Container>
	<div class="post is-md-post">
		<h1 class:left>{title}</h1>
		{#if date}
			<h2 class="date">{getDate(date)}</h2>
		{/if}
		<slot />
		<link rel="stylesheet" href="/one-dark.css" />
	</div>
</Container>

<style lang="scss">
	h1:not(.left) {
		width: 100%;
		text-align: center;
	}

	h2.date {
		font-size: 1.1rem;
		width: 100%;
		text-align: center;
		color: var(--text);
		margin: 20px 0;
		margin-bottom: 40px;
		font-weight: normal;
	}

	.post.is-md-post :global(iframe) {
		width: 100%;
		height: 500px;
		border: 1px solid var(--border);
	}

	.post.is-md-post :global(pre code) {
		font-size: 0.8rem;
	}

	@media (max-width: 700px) {
		h1:not(.left) {
			text-align: left;
			font-size: 1.2rem;
		}
		h2.date {
			text-align: left;
			font-size: 1rem;
		}
	}
</style>
