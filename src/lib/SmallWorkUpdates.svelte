<script>
	import PanZoom from '$lib/panzoom/PanZoom.svelte';
	import MediaGrid from '$lib/MediaGrid.svelte';

	let visible = false;
	let updates = [];

	const spiralFactorThingie = 1;

	// Fetch
	fetch('https://work.jipfr.nl/')
		.then((res) => res.json())
		.then((data) => {
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
</script>

<PanZoom>
	{#each updates as update}
		<div
			class={['update', visible ? 'visible' : ''].join(' ')}
			style={[`left: ${update.spiral.x}px`, `top: ${update.spiral.y}px`].join(';')}
			bind:this={update.el}
		>
			<div>
				<div class="update-inner">
					<div>
						<h4 class="subtitle">
							<span class="id">#{updates.length - updates.indexOf(update)}</span>
							/ {formatDate(update.date)}
						</h4>
						<h3 class="title">
							{update.content}
						</h3>
					</div>
					<div class="media">
						<MediaGrid attachments={update.attachments} />
					</div>
				</div>
			</div>
		</div>
	{/each}
</PanZoom>

<style lang="scss">
	.point {
		width: 10px;
		height: 10px;
		position: absolute;
		background: red;
	}
	.update {
		position: absolute;
		overflow: hidden;
		transform: translate(-50%, -50%);

		opacity: 0;
		transition: opacity 300ms;

		padding: 10px;

		&.visible {
			opacity: 1;
		}

		.badge {
			position: absolute;
			top: -6px;
			left: -6px;
			background: var(--body);
			border: 1px solid var(--border);
			border-radius: 4px;
			padding: 2px 6px;
			font-weight: bold;
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

	.media {
		width: 300px;
	}
</style>
