<script>
	export let attachments;

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
			let no_of_rows = Math.floor(Math.random() * 2) + 1;

			if (attachments.length >= 3 && i == 0) no_of_rows = 2;

			for (let j = 0; j < no_of_rows; j++) {
				if (!attachments[i + j]) break;
			}

			for (let j = 0; j < no_of_rows; j++) {
				if (!attachments[i + j]) break;
				columns[columns.length - 1].push(attachments[i]);
				i++;
			}
		}
	}

	$: attachments, createColumns();

	let modal = false;
</script>

<svelte:head>
	{#if modal}
		<div class="modal" on:click={() => (modal = false)}>
			<div class="modal-content" on:click={(e) => e.stopPropagation()}>
				{#if isVideo(modal)}
					<video src={modal.url} controls autoplay />
				{:else}
					<img loading="lazy" src={modal.url} alt={modal.name} />
				{/if}
			</div>
			<style>
				html,
				body {
					overflow: hidden;
				}
			</style>
		</div>
	{/if}
</svelte:head>

<div class="media-grid" class:just-one={columns.length === 1}>
	{#each columns as col}
		{#each col as attachment}
			{#if isVideo(attachment)}
				<div class="video-with-overlay" class:span-two={col.length == 1}>
					<video src={attachment.url} muted on:click={() => (modal = attachment)} />
				</div>
			{:else}
				<img
					loading="lazy"
					src={`//wsrv.nl/?url=${encodeURIComponent(attachment.url)}&w=300`}
					alt={attachment.name}
					draggable="false"
					class:span-two={col.length == 1}
					on:click={() => (modal = attachment)}
				/>
			{/if}
		{/each}
	{/each}
</div>

<style lang="scss">
	.media-grid {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
		grid-template-rows: repeat(2, minmax(0px, 1fr));
		grid-auto-flow: column;
		gap: 5px;

		.span-two {
			grid-row: span 2;
			height: 100%;
		}

		.video-with-overlay {
			position: relative;
			&::before {
				content: '';
				display: block;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 50px;
				height: 50px;
				border-radius: 40px;
				background: rgba(0, 0, 0, 0.5);
				background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-play-circle'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpolygon points='10 8 16 12 10 16 10 8'%3E%3C/polygon%3E%3C/svg%3E");
				background-size: 24px;
				background-position: center;
				background-repeat: no-repeat;
			}
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

	.modal {
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;

		img,
		video {
			min-width: 200px;
			min-height: 200px;
			max-width: 100%;
			max-height: calc(100vh - 8px);
			object-fit: contain;
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-loader'%3E%3Cline x1='12' y1='2' x2='12' y2='6'%3E%3C/line%3E%3Cline x1='12' y1='18' x2='12' y2='22'%3E%3C/line%3E%3Cline x1='4.93' y1='4.93' x2='7.76' y2='7.76'%3E%3C/line%3E%3Cline x1='16.24' y1='16.24' x2='19.07' y2='19.07'%3E%3C/line%3E%3Cline x1='2' y1='12' x2='6' y2='12'%3E%3C/line%3E%3Cline x1='18' y1='12' x2='22' y2='12'%3E%3C/line%3E%3Cline x1='4.93' y1='19.07' x2='7.76' y2='16.24'%3E%3C/line%3E%3Cline x1='16.24' y1='7.76' x2='19.07' y2='4.93'%3E%3C/line%3E%3C/svg%3E");
			background-repeat: no-repeat;
			background-position: center;
			border-radius: 4px;
		}
	}
</style>
