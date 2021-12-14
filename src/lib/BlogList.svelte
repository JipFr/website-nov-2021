<script>
	// Props
	export let blogPosts = [];

	import { getDate } from '../helpers';
</script>

<div class="list blog">
	{#each blogPosts as blogPost}
		<a href={`/blog/${blogPost.slug}`}>
			<div>
				<h2>{blogPost.metadata.title}</h2>
				<p>Posted on <strong>{getDate(blogPost.metadata.date)}</strong></p>
				{#if blogPost.metadata.tags}
					<div class="tags">
						{#each blogPost.metadata.tags.split(',') as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				{/if}
				<p>{blogPost.metadata.description}</p>
			</div>
			<div>
				<img src={blogPost.metadata.image} alt />
			</div>
		</a>
	{/each}
</div>

<style lang="scss">
	.blog :global(.box) {
		padding: 1rem;
	}

	.list {
		display: grid;
		grid-gap: 20px;
	}

	.blog a {
		width: calc(100% + 40px);
		text-decoration: none;
		display: grid;
		grid-template-columns: 1fr 250px;
		grid-gap: 40px;
		padding: 20px;
		border-bottom: 1px solid var(--border);
		margin-left: -20px;
		margin-right: -20px;
		transition: transform 100ms;

		&:hover {
			transform: scale(1.05);
		}
	}

	.blog h2 {
		margin: 0;
		color: var(--text-title);
		font-size: 1rem;
	}

	.blog .tags {
		color: var(--text);
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
		margin-top: 10px;

		.tag {
			background: var(--content);
			padding: 3px 6px;
			border-radius: 4px;
		}
	}

	.blog p {
		color: var(--text);
		margin-top: 10px;
	}

	.blog img {
		display: block;
		width: 100%;
		height: 200px;
		object-fit: cover;
		border: 1px solid var(--border);
	}
</style>
