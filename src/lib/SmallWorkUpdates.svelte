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

	const spiralFactorThingie = 1;

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
			updates = data.map((t) => {
				return {
					...t,
					spiralI: 0,
					spiral: getSpiralCoordinates(0, 0, spiralFactorThingie)
				};
			});
		})
		.catch((err) => {
			console.error(err);
		});

	$: updates, checkOverlaps();

	function checkOverlaps(startIndex = 1) {
		if (!updates || updates.length === 0) return;

		for (let i = startIndex; i < updates.length; i++) {
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
						updates[k].spiralI += 5;
						updates[k].spiral = getSpiralCoordinates(
							updates[k].spiralI / 10,
							0,
							spiralFactorThingie
						);
					}
					requestAnimationFrame(() => checkOverlaps(i));
					return;
				}
			}
		}
		visible = true;
	}

	function getSpiralCoordinates(t, a = 0, b = 1) {
		// The radial distance from the origin
		const r = a + b * t;

		// Convert polar coordinates (r, theta) to Cartesian coordinates (x, y)
		const x = r * Math.cos(t);
		const y = r * Math.sin(t);

		return { x, y };
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
			style={[`left: ${update.spiral.x}px`, `top: ${update.spiral.y}px`].join(';')}
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
			position: absolute;
			transform: translate(-50%, -50%);
		}
	}
	.update {
		overflow: hidden;

		opacity: 0;
		transition: opacity 300ms;

		padding: 10px;

		&.visible {
			opacity: 1;
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
		}

		.update-inner {
			position: relative;
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
</style>
