<script context="module">
	// import utility functions
	import { getProjects } from '../helpers';

	export const prerender = true;

	/** @type {import('@sveltejs/kit').Load} */
	export async function load() {
		const projects = await getProjects();

		return {
			props: {
				projects: projects.filter((v) => v.metadata.featured)
			}
		};
	}
</script>

<script>
	import Container from '$lib/layout/Container.svelte';
	import TechItem from '$lib/TechItem.svelte';
	import Collapsible from '$lib/util/Collapsible.svelte';
	import Title from '$lib/util/Title.svelte';
	import Hero from '$lib/Hero.svelte';
	import ProjectList from '$lib/ProjectList.svelte';

	export let projects;
</script>

<svelte:head>
	<Title />
</svelte:head>

<Container>
	<h1>About me</h1>
	<p class="paragraph">
		Hello there! I am a full-stack web developer from the Netherlands. I started in 2016, and since
		then I've worked on countless projects, both for myself and for clients.
	</p>

	<h2>Find me online</h2>

	<p class="paragraph">
		I have a GitHub account that can be found on <a
			href="https://github.com/jipfr"
			target="_blank"
			class="anchor">github.com/jipfr</a
		>. You can e-mail me at
		<a class="anchor" href="mailto:jip@frij.link" target="_blank">jip@frij.link</a>.
	</p>

	<h2>Featured projects</h2>

	<p class="paragraph">
		These are some of my recent projects worth showcasing. To check out all of them, <a
			class="anchor"
			href="/projects"
		>
			click here!
		</a>
	</p>

	<ProjectList {projects} />

	<h2>I have experience with</h2>

	<div class="tech-list">
		<TechItem
			title="TypeScript / JS"
			subtitle="Level 3"
			iconSource="/img/tech/typescript.svg"
			bg="rgba(48, 122, 196, var(--bg-opacity))"
		/>
		<TechItem
			title="Node.js"
			subtitle="Level 3"
			iconSource="/img/tech/nodejs.svg"
			bg="rgba(87, 157, 70, var(--bg-opacity))"
		/>
		<TechItem
			title="Nuxt / Vue"
			subtitle="Level 3"
			iconSource="/img/tech/nuxt.png"
			bg="rgba(37, 198, 145, var(--bg-opacity))"
		/>
		<TechItem
			title="HTML"
			subtitle="Level 3"
			iconSource="/img/tech/html.png"
			bg="rgba(225, 75, 43, var(--bg-opacity))"
		/>
		<TechItem
			title="(S)CSS"
			subtitle="Level 3"
			iconSource="/img/tech/scss.png"
			bg="rgba(202, 100, 153, var(--bg-opacity))"
		/>
		<TechItem
			title="Svelte"
			subtitle="Level 2"
			iconSource="/img/tech/svelte.svg"
			bg="rgba(253, 54, 18, var(--bg-opacity))"
		/>
		<TechItem
			title="React"
			subtitle="Level 2"
			iconSource="/img/tech/react.svg"
			bg="rgba(28, 218, 254, var(--bg-opacity))"
		/>
		<TechItem
			title="Tailwind"
			subtitle="Level 2"
			iconSource="/img/tech/tailwind.svg"
			bg="rgba(25, 183, 211, var(--bg-opacity))"
		/>
	</div>

	<Collapsible title="Explanation about levels">
		<p class="paragraph">To categorise my knowledge, I have the following levels</p>

		<ol class="paragraph">
			<li>I've used this technology in the past and I'm able to figure it out from there</li>
			<li>I have written an app or website using this technology</li>
			<li>I'm confident with this technology</li>
		</ol>
	</Collapsible>

	<p class="paragraph flex">
		<img
			class="web-century"
			src="/uploads/web-century.png"
			alt="Selected website of the century"
		/>*
	</p>

	<div class="two-cols">
		<div>
			<h2>Things I like</h2>
			<ul>
				<li>Svelte</li>
				<li>Exploring my neighbourhood</li>
				<li><a class="anchor" href="/cats">Cats</a></li>
				<li>Movies & TV shows</li>
				<li><a class="anchor" href="https://millmint.net/posts/" target="_blank">Vekllei</a></li>
			</ul>
		</div>
		<div>
			<h2>Things I don't like</h2>
			<ul>
				<li>Cat haters</li>
				<li>People who can't argue their opinions</li>
				<li>
					<a
						class="anchor"
						href="https://developer.mozilla.org/en-US/docs/Web/CSS/env()"
						target="_blank"
					>
						Web apps that don't account for phones' safe area
					</a>
				</li>
			</ul>
		</div>
	</div>
	<Hero />

	<p class="paragraph">
		* The aforementioned web experts are the 3 spiders in the corner of my room.
	</p>
</Container>

<style lang="scss">
	.tech-list {
		display: grid;
		grid-gap: 10px;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		margin: 20px 0;
	}

	.two-cols {
		display: grid;
		grid-gap: 40px;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}
	ul {
		margin-top: 10px;
	}
	.web-century {
		width: 100%;
		max-width: 300px;
		border: 1px solid var(--border);
		border-radius: 10px;
	}
	.flex {
		display: flex;
	}
</style>
