<script context="module">
	// import utility functions
	import { getBlogPosts } from '../getProjects';

	export const prerender = true;

	/** @type {import('@sveltejs/kit').Load} */
	export async function load() {
		const blogPosts = await getBlogPosts();

		return {
			props: {
				blogPosts
			}
		};
	}
</script>

<script>
	// Import modules
	import Title from '$lib/util/Title.svelte';
	import Container from '$lib/layout/Container.svelte';
	import BlogList from '$lib/BlogList.svelte';
	export let blogPosts;
</script>

<svelte:head>
	<Title title="Blog" />
</svelte:head>

<Container>
	<h1>Blog</h1>

	<p class="paragraph">
		I like to write about things that I find interesting. Here are some of my most recent posts.
	</p>

	<BlogList {blogPosts} />
</Container>
