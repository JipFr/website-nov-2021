<script context="module">
	export const prerender = true;
</script>

<script>
	import Timer from '$lib/timer.svelte';
</script>

<svelte:head>
	<title>Hoe lang ligt de vloer bij Jip en Julian er al uit?</title>
</svelte:head>

<div>
	<div class="box">
		<h1>Hoe lang ligt de vloer bij Jip en Julian er al uit?</h1>
		<h3>"Veel te lang" is hoe lang.</h3>
	</div>

	<p><b>Zo lang</b> ligt de vloer er al uit...</p>
	<Timer start="march 21 2021 13:48" />

	<p>En <b>zo lang</b> is de site al online...</p>
	<Timer start="october 8 2021 07:00" />

	<a sveltekit:prefetch href="/livestream">Klik hier voor een live stream van de gang →</a>

	<img src="https://i.imgur.com/xGpHKRt.png" alt="Geen vloer :(" title="Geen vloer :(" />
</div>

<style lang="scss">
	img {
		width: 100%;
		margin: 40px 0;
		border-radius: 6px;
		box-shadow: 3px 5px 15px rgba(0, 0, 0, 0.2);
	}
</style>
