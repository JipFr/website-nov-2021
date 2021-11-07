<script context="module">
	export const prerender = true;
</script>

<script>
	import Container from '$lib/layout/Container.svelte';
</script>

<svelte:head>
	<title>Contributions — Jip Frijlink</title>
</svelte:head>

<Container>
	<div class="post">
		<h1>Contributions</h1>
		<p class="paragraph">
			These are the things I've contributed to projects that aren't quite worth a listing in
			"projects", but I thought were still worthy of being shared. On this page are also some
			smaller projects not worty of being shown in the project list.
		</p>

		<h2>Millmint.net</h2>

		<p class="paragraph">
			Millmint is a website largely dedicated to the Vekllei project and its author, Hobart. I
			contributed a few things a few things to the website and in- and outside of Hacktoberfest.
		</p>

		<p class="paragraph">
			First, I added a small preview for search results. If the string you were looking for shows up
			in a post, it will show you what it found.
		</p>

		<img
			src="/img/contributions/millmint/search.png"
			alt="Search on the MillMint website. The query is 'Tzipora' and various results are shown with the represented string"
		/>

		<p class="paragraph">
			I was then in a voice call with the author of the website and Vekllei, and he asked if it
			would perhaps be possible to give each page a tint regarding to the featured image. Of course
			it is!
		</p>

		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img
			src="/img/contributions/millmint/tint.png"
			alt="The tint is applied to the page from the featured image"
		/>

		<p class="paragraph">After that, we gave the same treatment to all the stories' cards.</p>

		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img
			src="/img/contributions/millmint/cards.png"
			alt="A list of stories' cards on the Millmint website, where each card has a slight tint in accordance to the color of the art piece"
		/>
	</div>
</Container>
