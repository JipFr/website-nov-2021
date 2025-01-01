<script context="module">
	export const prerender = true;
</script>

<script>
	import SmallWorkUpdates from '$lib/SmallWorkUpdates.svelte';
	import Title from '$lib/util/Title.svelte';
</script>

<svelte:head>
	<Title title="Tidbits" />
</svelte:head>

<SmallWorkUpdates />

<style global>
	main {
		display: flex;
	}
	body {
		display: grid;
		min-height: 100vh;
		grid-template-rows: auto 1fr;
		margin-bottom: 0;
	}
</style>
