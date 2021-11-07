<script context="module">
	export const prerender = true;
</script>

<script>
	import Container from '$lib/layout/Container.svelte';
	import TechItem from '$lib/TechItem.svelte';
</script>

<svelte:head>
	<title>Jip Frijlink — home</title>
</svelte:head>

<Container>
	<h1>About me</h1>

	<p class="paragraph">
		Hello there! I am a full-stack web developer from the Netherlands. I know HTML, (S)CSS,
		JavaScript and TypeScript, Node.js, and Vue.
	</p>

	<h2>Find me online</h2>

	<p class="paragraph">
		I have a GitHub account where I share many of my projects at <a
			href="https://github.com/jipfr"
			target="_blank"
			class="anchor">@jipfr</a
		>. You can e-mail me at
		<a class="anchor" href="mailto:contact@jipfr.nl" target="_blank">contact@jipfr.nl</a>.
	</p>

	<h2>I have experience with</h2>

	<p class="paragraph">To categorise my knowledge, I have the following levels</p>

	<ol class="paragraph">
		<li>I've used this technology in the past and I'm able to figure it out from there</li>
		<li>I have written an app or website using this technology</li>
		<li>I'm confident with this technology</li>
	</ol>

	<div class="tech-list">
		<TechItem
			title="TypeScript / JS"
			subtitle="Level 3"
			iconSource="/img/tech/typescript.svg"
			bg="#deeeff"
		/>
		<TechItem title="Nuxt / Vue" subtitle="Level 3" iconSource="/img/tech/nuxt.png" bg="#EBF6F3" />
		<TechItem title="Svelte" subtitle="Level 2" iconSource="/img/tech/svelte.svg" bg="#ffe8e0" />
		<TechItem title="React" subtitle="Level 2" iconSource="/img/tech/react.svg" bg="#e8faff" />
		<TechItem
			title="Tailwind"
			subtitle="Level 2"
			iconSource="/img/tech/tailwind.svg"
			bg="#defaff"
		/>
		<TechItem title="HTML" subtitle="Level 3" iconSource="/img/tech/html.png" bg="#F3E9E6" />
		<TechItem title="(S)CSS" subtitle="Level 3" iconSource="/img/tech/scss.png" bg="#fcd7ea" />
	</div>
</Container>

<style lang="scss">
	.tech-list {
		display: grid;
		grid-gap: 10px;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	}
</style>
