<script context="module">
	export const prerender = true;
</script>

<script>
	export let title;

	import Container from '$lib/layout/Container.svelte';
</script>

<svelte:head>
	<title>Post — Jip Frijlink</title>
</svelte:head>

<Container>
	<div class="post is-md-post">
		<h1>{title}</h1>
		<slot />
	</div>
</Container>
