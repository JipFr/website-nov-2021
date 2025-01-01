<script>
	import { onDestroy, onMount } from 'svelte';

	$: camera = {
		x: 0,
		y: 0,
		zoom: 1
	};
	$: mouseIsDown = false;
	let canvas = null;

	function onScroll(evt) {
		if (Array.from(evt.composedPath()).find((t) => t.classList.contains('canvas')))
			evt.preventDefault();
		if (!canvas) return;

		if (evt.ctrlKey || evt.metaKey) {
			let newZoomLevel = camera.zoom + (evt.deltaY > 0 ? -0.4 : 0.4);
			newZoomLevel = Math.min(5, Math.max(0.5, newZoomLevel));

			const rect = canvas.getBoundingClientRect();
			const focusX = evt.clientX - rect.left;
			const focusY = evt.clientY - rect.top;

			const offsetX = focusX - camera.x;
			const offsetY = focusY - camera.y;

			const newViewCenterX = focusX - offsetX * (newZoomLevel / camera.zoom);
			const newViewCenterY = focusY - offsetY * (newZoomLevel / camera.zoom);

			camera.x = Math.round(newViewCenterX);
			camera.y = Math.round(newViewCenterY);
			camera.zoom = newZoomLevel;
		} else {
			camera.x -= evt.deltaX;
			camera.y -= evt.deltaY;
		}
	}

	function onMouseMove(evt) {
		if (!mouseIsDown) return;

		camera.x += evt.movementX;
		camera.y += evt.movementY;
	}

	function onMouseDown(evt) {
		// if (evt.button !== 1) return; // Middle mouse
		if (evt.button === 2) return; // Right mouse
		if (evt.target.closest('.editor-ignore-drag')) return;

		mouseIsDown = true;

		function onMouseUp() {
			mouseIsDown = false;
			window.removeEventListener('mouseup', onMouseUp);
			window.removeEventListener('mousemove', onMouseMove);
		}

		window.addEventListener('mouseup', onMouseUp);
		window.addEventListener('mousemove', onMouseMove);
	}

	onMount(focusCenter);

	function focusCenter() {
		if (typeof window === 'undefined') return;
		window.addEventListener('wheel', onScroll, { passive: false });

		// Take all children to find the center-point we should set the camera to
		let smallestX = Infinity;
		let smallestY = Infinity;
		let largestX = -Infinity;
		let largestY = -Infinity;

		if (!canvas) return;
		const canvasRect = canvas.getBoundingClientRect();

		const container = canvas.querySelector('.node-container');
		if (!container) return;

		// for (const child of Array.from(container.children)) {
		console.log(container.children[0]);
		for (const child of [container.children[0]]) {
			const rect = child.getBoundingClientRect();

			const left = rect.left - canvasRect.left;
			const top = rect.top - canvasRect.top;
			const right = left + rect.width;
			const bottom = top + rect.height;

			if (left < smallestX) smallestX = left;
			if (top < smallestY) smallestY = top;
			if (right > largestX) largestX = right;
			if (bottom > largestY) largestY = bottom;
		}

		const centerX = (smallestX + largestX) / 2;
		const centerY = (smallestY + largestY) / 2;

		camera.x = canvas.scrollWidth / 2 - centerX;
		camera.y = canvas.scrollHeight / 2 - centerY;
	}

	onDestroy(() => {
		if (typeof window !== 'undefined') window.removeEventListener('wheel', onScroll);
	});
	// Listen for change in slot
	$: (() => {
		if (!canvas) return;
		const container = canvas.querySelector('.node-container');
		if (!container) return;

		const observer = new MutationObserver(() => {
			focusCenter();
		});

		observer.observe(container, { childList: true });
	})();
</script>

<div
	bind:this={canvas}
	on:mousedown={onMouseDown}
	class={['canvas', mouseIsDown ? 'cursor-grabbing' : ''].join(' ')}
	style={`--x: ${camera.x}px; --y: ${camera.y}px; --zoom: ${camera.zoom};`}
>
	<div
		class="canvas-inner"
		style={`transform: translate3D(${camera.x}px, ${camera.y}px, 0) scale(${camera.zoom})`}
	>
		<div class="relative bg-teal-400 node-container">
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	.canvas {
		width: 100%;
		height: 70vh;
		border: 1px dashed var(--border);
		user-select: none;
		display: inline-flex;
		overflow: hidden;

		background-color: var(--content);
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		background-position: var(--x) var(--y);
		background-size: calc(var(--zoom) * 5%);

		&.cursor-grabbing {
			cursor: grabbing;
		}

		> .canvas-inner {
			display: inline;
			height: max-content;
			transform-origin: top left;

			> div {
				position: relative;
				background: rgba(255, 255, 255, 0.1);
			}
		}
	}

	@media (prefers-color-scheme: dark) {
		.canvas {
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		}
	}
</style>
