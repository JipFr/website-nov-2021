<script context="module">
	export const prerender = true;
</script>

<script>
	// Import modules
	import Container from '$lib/layout/Container.svelte';
	import ProjectList from '$lib/ProjectList.svelte';

	// import utility functions
	import { getProjects } from '../getProjects';

	// Import all projects
	let projects = [];
	getProjects().then((p) => {
		projects = p;
	});
</script>

<svelte:head>
	<title>Projects — Jip Frijlink</title>
</svelte:head>

<Container>
	<h1>Projects</h1>

	<p class="paragraph">
		Down below are projects I've worked on. These aren't all projects I've ever done, and they don't
		include things I wasn't allowed to share.
	</p>

	<ProjectList {projects} />
</Container>
