<script context="module">
	export const prerender = true;
</script>

<script>
	import Container from '$lib/layout/Container.svelte';
	import Collapsible from '$lib/util/Collapsible.svelte';
</script>

<svelte:head>
	<title>Cats — Jip Frijlink</title>
</svelte:head>

<Container>
	<h1>Cats</h1>

	<p class="paragraph">
		I obviously need to back up the fact that I like cats, so here's some evidence.
	</p>

	<Collapsible title="Pudding">
		{#each Array(15) as _, i}
			<div class="image">
				<img src={`/img/cats/pudding-${i + 1}.jpeg`} class="post-img" loading="lazy" alt />
			</div>
		{/each}
	</Collapsible>

	<Collapsible title="Kip (yes, really)">
		{#each Array(21) as _, i}
			<div class="image">
				<img src={`/img/cats/shin-${i + 1}.jpeg`} class="post-img" loading="lazy" alt />
			</div>
		{/each}
	</Collapsible>
</Container>
