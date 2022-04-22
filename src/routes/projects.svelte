<script context="module">
	// import utility functions
	import { getProjects } from '../helpers';

	export const prerender = true;

	/** @type {import('@sveltejs/kit').Load} */
	export async function load() {
		const projects = await getProjects();

		return {
			props: {
				projects
			}
		};
	}
</script>

<script>
	// Import modules
	import Title from '$lib/util/Title.svelte';
	import Container from '$lib/layout/Container.svelte';
	import ProjectList from '$lib/ProjectList.svelte';
	export let projects;
</script>

<svelte:head>
	<Title title="Projects" />
</svelte:head>

<Container>
	<h1>Projects</h1>

	<p class="paragraph">
		Down below are projects I've worked on. These aren't all projects I've ever done, and they don't
		include things I wasn't allowed to share.
	</p>

	<ProjectList {projects} />
</Container>
