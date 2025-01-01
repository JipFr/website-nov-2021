<script>
	export let attachments;

	const MAX_COLS = 3;

	function isVideo(attachment) {
		const url = attachment.url.toLowerCase().split('?')[0];
		return url.endsWith('.mp4') || url.endsWith('.mov');
	}

	let columns = [];

	function createColumns() {
		columns = [];
		let i = 0;
		while (i < attachments.length) {
			columns.push([]);
			let no_of_rows = 1;

			if (attachments.length >= 3 && i == 0) no_of_rows = 2;

			for (let j = 0; j < no_of_rows; j++) {
				if (!attachments[i + j]) break;
				if (isVideo(attachments[i + j])) {
					no_of_rows = 1;
					break;
				}
			}

			for (let j = 0; j < no_of_rows; j++) {
				if (!attachments[i + j]) break;
				columns[columns.length - 1].push(attachments[i]);
				i++;
			}
		}
	}

	$: attachments, createColumns();
</script>

<div class="media-grid">
	{#each columns as col}
		{#each col as attachment}
			{#if isVideo(attachment)}
				<video src={attachment.url} controls muted class:span-two={col.length == 1} />
			{:else}
				<img
					loading="lazy"
					src={`//wsrv.nl/?url=${encodeURIComponent(attachment.url)}&w=300`}
					alt={attachment.name}
					draggable="false"
					class:span-two={col.length == 1}
				/>
			{/if}
		{/each}
	{/each}
</div>

<style lang="scss">
	.media-grid {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		grid-template-rows: repeat(var(--rows), 100px);
		grid-auto-flow: column;
		gap: 5px;

		.span-two {
			grid-row: span 2;
		}

		img,
		video {
			width: 100%;
			display: block;
			height: 100%;
			background: var(--border);
			object-fit: cover;
			border-radius: 4px;

			&:not(.span-two) {
				aspect-ratio: 1/1;
			}
		}
	}
</style>
