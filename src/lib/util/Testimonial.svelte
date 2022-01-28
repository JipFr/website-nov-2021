<script>
	export let name;
	export let profilePicture;
	export let background;
	export let links = [];
	export let wide = false;
</script>

<div class="testimonial" class:wide>
	<div class="background" style={`--background-src: url(${background})`} />
	<div class="content">
		<div>
			<img class="profile-picture" src={profilePicture} alt />
			<h2>{name}</h2>
			<p>
				<slot />
			</p>
		</div>
		{#if links}
			<p>
				From
				{#each Object.entries(links) as [i, link]}
					{i == links.length - 1 ? ' and ' : ''}
					{#if i === links.length - 1}
						and{' '}
					{/if}
					<a href={link.to}>{link.text}</a>{#if i < links.length - 2},{/if}
				{/each}
			</p>
		{/if}
	</div>
</div>

<style lang="scss">
	.testimonial {
		border-bottom-left-radius: 16px;
		border-bottom-right-radius: 16px;
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 110px 1fr;
	}
	.background {
		width: 100%;
		height: 100%;
		background-image: var(--background-src);
		background-size: cover;
		background-position: center;
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
	}
	.content {
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		padding: 23px 50px;
		padding-top: 0;
		border: 1px solid var(--border);
		border-top: 0;
		border-bottom-left-radius: 16px;
		border-bottom-right-radius: 16px;

		.profile-picture {
			width: 90px;
			height: 90px;
			border-radius: 17px;
			border: 3px solid var(--body);
			margin: 0;
			transform: translateY(-45px);
		}

		h2 {
			margin: 0;
			margin-top: -20px;
		}

		p {
			margin-top: 0.9rem;
		}
	}

	.testimonial:not(.wide) .content {
		padding: 10px 23px;
		padding-top: 0;
	}

	@media (prefers-color-scheme: dark) {
		.content {
			border-color: var(--content);
		}
		.testimonial {
			background: var(--content);
		}
	}

	@media (max-width: 800px) {
		.testimonial .content {
			padding: 10px 23px;
			padding-top: 0;
		}
	}
</style>
