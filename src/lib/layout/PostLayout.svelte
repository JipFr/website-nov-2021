<script context="module">
	export const prerender = true;
</script>

<script>
	export let title;
	export let description;

	import Title from '$lib/util/Title.svelte';

	import Container from '$lib/layout/Container.svelte';
	import Description from '$lib/util/Description.svelte';
</script>

<svelte:head>
	<Title {title} />
	<Description {description} />
</svelte:head>

<Container>
	<div class="post is-md-post">
		<h1>{title}</h1>
		<slot />
	</div>
</Container>
