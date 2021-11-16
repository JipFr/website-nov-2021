<script>
	// Props
	export let projects = [];

	// Import components
	import Box from '$lib/util/Box.svelte';
	import TechTag from '$lib/util/TechTag.svelte';

	function getDate(d) {
		const dateObj = new Date(d);
		const date = dateObj.getDate().toString().padStart(2, '0');
		const month = months[dateObj.getMonth()];
		const year = dateObj.getFullYear();
		return `${date} ${month} ${year}`;
	}

	// Other stuff
	const months = [
		'jan',
		'feb',
		'mar',
		'apr',
		'may',
		'jun',
		'jul',
		'aug',
		'sep',
		'oct',
		'nov',
		'dec'
	];
</script>

<div class="list">
	{#each projects as project}
		<a href={`/${project.slug}`}>
			<Box doHover={true}>
				<div class="box-inner" style={`--shadow-color: ${project.color || 'inherit'}`}>
					<div class="core">
						<h3 class="project-title">{project.title}</h3>
						<p class="date">{getDate(project.date)}</p>
						<p class="description">{project.description}</p>
						<p class="tech">
							{#each project.tech.split(', ') as tech}
								<TechTag {tech} />
							{/each}
						</p>
					</div>
					<aside class="box-aside">
						<div class="icon-wrapper" style={`background: ${project['icon-background']}`}>
							<img src={project.icon} alt />
						</div>
					</aside>
				</div>
			</Box>
		</a>
	{/each}
</div>

<style lang="scss">
	a {
		display: block;
		color: inherit;
		text-decoration: none;
		height: 100%;
		> * {
			height: 100%;
		}
	}
	.list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		grid-gap: 20px;
	}
	.project-title {
		font-size: 1.25rem;
		display: flex;
		align-items: center;
		&::before {
			content: '';
			display: inline-block;
			margin-right: 10px;
			margin-top: -2px;
			width: 0.5em;
			height: 0.5em;
			border-radius: 50%;
			background: var(--shadow-color);
		}
	}
	p.date,
	p.description {
		color: var(--text-secondary);
	}
	p.description,
	p.tech {
		margin-top: 10px;
		line-height: 1.5rem;
	}
	p.tech {
		margin-left: -3px;
	}
	.box-inner {
		display: grid;
		grid-template-columns: 1fr 100px;
		grid-gap: 30px;
		.icon-wrapper {
			padding: 10px;
			background: var(--shadow-color);
			height: 100%;
			border-radius: 6px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.icon-wrapper img {
			width: 50px;
			height: 50px;
			object-fit: contain;
		}
	}
	@media (max-width: 900px) {
		.list {
			grid-template-columns: 100%;
		}
		.box-inner {
			grid-template-columns: 100%;
		}
		.box-aside {
			display: none;
		}
		.project-title::before {
			display: none;
		}
	}
</style>
