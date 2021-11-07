<script>
	export let title;
	export let subtitle;
	export let iconSource;
	export let bg;
</script>

<div class="tech-item" style={`background-color: ${bg};`}>
	<div>
		<img src={iconSource} alt />
	</div>
	<div class="tech-item-core">
		<p class="title">{title}</p>
		<p class="subtitle">{subtitle}</p>
	</div>
</div>

<style lang="scss">
	.tech-item {
		padding: 10px;
		display: grid;
		grid-template-columns: 35px 1fr;
		grid-gap: 20px;
		align-items: center;
		border-radius: 6px;

		img {
			display: block;
			width: 100%;
			height: 35px;
			object-fit: contain;
		}

		p {
			margin: 0;
			color: var(--text-title);
		}

		.title {
			font-weight: bold;
		}

		.subtitle {
			opacity: 0.6;
		}
	}

	@media (prefers-color-scheme: dark) {
		.tech-item {
			background-color: var(--header-bg) !important; // Override style attribute
		}
	}
</style>
