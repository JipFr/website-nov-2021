<script>
	import Container from '$lib/layout/Container.svelte';
	import { page } from '$app/stores';
</script>

<header>
	<Container>
		<!-- Profile -->
		<div class="profile">
			<img src="https://github.com/jipfr.png" alt />
			<p class="name">Jip Frijlink</p>
		</div>

		<!-- Navigation -->
		<nav>
			<a sveltekit:prefetch class:active={$page.path === '/'} href="/"> About </a>
			<a sveltekit:prefetch class:active={$page.path === '/tidbits'} href="/tidbits"> Tidbits </a>
			<a sveltekit:prefetch class:active={$page.path === '/projects'} href="/projects">
				Projects
			</a>
			<a sveltekit:prefetch class:active={$page.path === '/testimonials'} href="/testimonials">
				Testimonials
			</a>
			<a sveltekit:prefetch class:active={$page.path === '/blog'} href="/blog"> Blog </a>
			<a sveltekit:prefetch class:active={$page.path === '/other-work'} href="/other-work">
				Other work
			</a>
		</nav>
	</Container>
</header>

<style lang="scss">
	header {
		background: var(--header-bg);
		color: var(--header-text-primary);
		padding-top: 80px;
		padding-bottom: 30px;
	}

	.profile {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-gap: 10px;
		align-items: center;

		img {
			border-radius: 50%;
			width: 2rem;
			height: 2rem;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			display: block;
		}

		.name {
			font-weight: bold;
			margin: 0;
			font-size: 1.5rem;
		}
	}

	nav {
		margin-top: 30px;

		a {
			color: var(--header-text-link);
			text-decoration: none;
			padding: 0 10px;
			padding-bottom: 10px;
			border-bottom: 2px solid transparent;

			&.active {
				border-bottom-color: var(--header-text-link);
			}
		}
	}

	@media (max-width: 900px) {
		header nav {
			display: flex;
			overflow-x: auto;
			// width: calc(100% + 15vw);
			max-width: 100vw;
			padding-left: 7.5vw;
			padding-right: 7.5vw;
			margin-left: -7.5vw;
			margin-right: -7.5vw;
			white-space: nowrap;
		}
	}
</style>
