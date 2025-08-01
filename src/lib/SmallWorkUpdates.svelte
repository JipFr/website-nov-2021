<script>
	import PanZoom from '$lib/panzoom/PanZoom.svelte';
	import Div from '$lib/panzoom/Div.svelte';
	import MediaGrid from '$lib/MediaGrid.svelte';
	import { onMount } from 'svelte';

	let visible = false;
	let updates = [];

	let windowWidth = 1920;

	onMount(() => {
		windowWidth = window.innerWidth;
		window.addEventListener('resize', () => {
			if (windowWidth !== window.innerWidth) {
				windowWidth = window.innerWidth;
				checkOverlaps();
			}
		});
	});

	// Fetch
	fetch('https://work.jipfr.nl/')
		.then((res) => res.json())
		.then((data) => {
			data = [
				{
					id: 0,
					content: 'Tidbits',
					body: "Hello, and welcome to the tidbits page on my website! This is where I share things I'm working on."
				},
				...data
			];
			updates = data.map((t, i) => {
				return {
					...t,
					posIndex: i,
					pos: getGridCoordinates(i)
				};
			});
			visible = true;
		})
		.catch((err) => {
			console.error(err);
		});

	$: updates, redoPositions();

	function redoPositions() {
		if (!updates || updates.length === 0) return;

		for (let i = 0; i < updates.length; i++) {
			const update = updates[i];
			if (!update?.el) return;

			const rect = update.el.getBoundingClientRect();

			for (let j = 0; j < i; j++) {
				const prevUpdate = updates[j];
				if (!prevUpdate?.el) continue;

				const prevRect = prevUpdate.el.getBoundingClientRect();
				if (
					rect.left < prevRect.right &&
					rect.right > prevRect.left &&
					rect.top < prevRect.bottom &&
					rect.bottom > prevRect.top
				) {
					for (let k = i; k < updates.length; k++) {
						updates[k].pos = getGridCoordinates(updates[k].posIndex);
					}
					requestAnimationFrame(() => checkOverlaps(i));
					return;
				}
			}
		}
		visible = true;
	}

	function getGridCoordinates(index) {
		// Spiral grid coordinates: index 0 is center (0,0), then spiral outwards
		const cellSize = 300;
		if (index === 0) return { x: 0, y: 0 };

		let x = 0,
			y = 0,
			dx = 1,
			dy = 0,
			segmentLength = 1;
		let steps = 0,
			directionChanges = 0;

		for (let i = 1; i <= index; i++) {
			x += dx;
			y += dy;
			steps++;
			if (steps === segmentLength) {
				steps = 0;
				// Rotate direction: right -> up -> left -> down -> right ...
				const temp = dx;
				dx = -dy;
				dy = temp;
				directionChanges++;
				if (directionChanges % 2 === 0) {
					segmentLength++;
				}
			}
		}

		return {
			x: x * cellSize,
			y: y * cellSize
		};
	}

	function pad(num) {
		return num.toString().padStart(2, '0');
	}

	function formatDate(date) {
		const d = new Date(date);
		return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} at ${pad(
			d.getHours()
		)}:${pad(d.getMinutes())}`;
	}

	$: RenderComponent = windowWidth > 800 ? PanZoom : Div;
</script>

<svelte:component this={RenderComponent}>
	{#each updates as update}
		<div
			class={['update', visible ? 'visible' : ''].join(' ')}
			style={[
				`left: ${update.pos.x}px`,
				`top: ${update.pos.y}px`,
				`animation-delay: ${update.posIndex < 140 ? Math.max(0, 140 - update.posIndex) * 15 : 0}ms`
			].join(';')}
			bind:this={update.el}
		>
			<div>
				<div class="update-inner">
					<div>
						{#if updates[1] === update}
							<div class="badge">Latest</div>
						{/if}
						{#if update.date}
							<h4 class="subtitle">
								<span class="id">#{updates.length - updates.indexOf(update)}</span>
								/ {formatDate(update.date)}
							</h4>
						{/if}
						<h3 class="title">
							{update.content}
						</h3>
						{#if update.body}
							<p class="body">
								{update.body}
							</p>
						{/if}
					</div>
					{#if update.attachments}
						<div class="media">
							<MediaGrid attachments={update.attachments} />
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</svelte:component>

<style lang="scss">
	.point {
		width: 10px;
		height: 10px;
		position: absolute;
		background: red;
	}
	@media (min-width: 800px) {
		.update {
			width: 300px;
			height: 300px;
			position: absolute;
			transform: rotate(0) translate(-50%, -50%);
		}
	}
	.update {
		overflow: hidden;

		opacity: 0;
		transition: opacity 300ms;

		padding: 10px;

		&.visible {
			// opacity: 1;
			animation: stackIn 100ms ease-in-out forwards;
		}

		.badge {
			display: inline-block;
			background: var(--theme);
			color: white;
			border: 1px solid var(--border);
			border-radius: 4px;
			padding: 2px 6px;
			font-weight: bold;
			margin-bottom: 4px;
		}

		> div {
			position: relative;
			background: var(--body);
			border: 1px solid var(--border);
			padding: 20px;
			border-radius: 4px;
			height: 100%;
		}

		.update-inner {
			position: relative;
			height: 100%;
			display: grid;
			grid-template-rows: auto minmax(0, 1fr);
		}

		&,
		img {
			user-select: none;
		}

		.media {
			width: 100%;
		}
	}

	.update-inner {
		.subtitle {
			font-weight: normal;
		}
		.title {
			font-size: 1rem;
			font-weight: 600;
			margin-bottom: 0.5rem;
		}
	}

	@keyframes stackIn {
		from {
			opacity: 0;
			margin-top: -20px;
		}
		to {
			opacity: 1;
			margin-top: 0;
		}
	}
</style>
