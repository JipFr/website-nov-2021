<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				message: error.message,
				status // same as status: status
			}
		};
	}
</script>

<script>
	import Container from '$lib/layout/Container.svelte';

	import '../app.scss';

	export let status;
</script>

<main>
	<Container>
		<h1>Error {status}</h1>
		<p class="paragraph">Looks like something is out of whack!</p>

		<iframe
			width="560"
			height="315"
			src="https://www.youtube.com/embed/j5C6X9vOEkU"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
	</Container>
</main>
