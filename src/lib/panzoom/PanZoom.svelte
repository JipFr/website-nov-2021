<script>
	import { onDestroy, onMount } from 'svelte';

	const startZoom = 0.4;
	$: camera = {
		x: 0,
		y: 0,
		zoom: startZoom
	};
	$: mouseIsDown = false;
	let canvas = null;
	let mostRecent = 0;

	let bounds = { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity };

	function onScroll(evt) {
		if (Array.from(evt.composedPath()).find((t) => t.classList.contains('canvas')))
			evt.preventDefault();
		if (!canvas) return;

		if ((evt.ctrlKey || evt.metaKey) && mostRecent < Date.now() - 10) {
			mostRecent = Date.now();

			let deltaY = evt.deltaY;
			if (Math.abs(deltaY) > 1) deltaY = Math.sign(deltaY) * 1;
			let newZoomLevel = camera.zoom + deltaY * -0.1;
			newZoomLevel = Math.min(5, Math.max(0.5, newZoomLevel));

			const rect = canvas.getBoundingClientRect();
			const focusX = evt.clientX - rect.left;
			const focusY = evt.clientY - rect.top;

			const offsetX = focusX + camera.x;
			const offsetY = focusY + camera.y;

			const newViewCenterX = focusX - offsetX * (newZoomLevel / camera.zoom);
			const newViewCenterY = focusY - offsetY * (newZoomLevel / camera.zoom);

			camera.x = Math.round(-newViewCenterX);
			camera.y = Math.round(-newViewCenterY);
			camera.zoom = newZoomLevel;

			requestAnimationFrame(setBounds);
		} else {
			camera.x += evt.deltaX;
			camera.y += evt.deltaY;
		}
		checkBounds();
	}

	function onMouseMove(evt) {
		if (!mouseIsDown) return;

		camera.x -= evt.movementX;
		camera.y -= evt.movementY;

		checkBounds();
	}

	function checkBounds() {
		setBounds();
		const canvasRect = canvas.getBoundingClientRect();

		const margin = 300;

		const leftEdge = bounds.left - margin;
		const topEdge = bounds.top - margin;
		const rightEdge = bounds.right - canvasRect.width + margin;
		const bottomEdge = bounds.bottom - canvasRect.height + margin;

		if (camera.x < leftEdge) camera.x = leftEdge;
		if (camera.y < topEdge) camera.y = topEdge;
		if (camera.x > rightEdge) camera.x = rightEdge;
		if (camera.y > bottomEdge) camera.y = bottomEdge;
	}

	function onMouseDown(evt) {
		// if (evt.button !== 1) return; // Middle mouse
		if (evt.button === 2) return; // Right mouse
		if (evt.target.closest('.editor-ignore-drag')) return;

		mouseIsDown = true;

		window.addEventListener('mouseup', onMouseUp);
		window.addEventListener('mousemove', onMouseMove);
	}

	function onMouseUp() {
		mouseIsDown = false;
		window.removeEventListener('mouseup', onMouseUp);
		window.removeEventListener('mousemove', onMouseMove);
	}

	onMount(animateZoomInOnMount);
	onMount(focusCenter);

	const endZoom = 0.8;
	function animateZoomInOnMount() {
		if (!canvas) return;

		const startTime = performance.now();
		const duration = 5000; // 1000ms

		function easeInOut(t) {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		}

		function animate(time) {
			const elapsed = time - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const eased = easeInOut(progress);

			camera.zoom = startZoom + (endZoom - startZoom) * eased;

			if (progress < 1) {
				requestAnimationFrame(animate);
			} else {
				camera.zoom = endZoom; // Ensure we end at the correct zoom level
			}
		}

		requestAnimationFrame(animate);
	}

	function focusCenter() {
		if (typeof window === 'undefined') return;
		window.addEventListener('wheel', onScroll, { passive: false });

		// Take all children to find the center-point we should set the camera to
		let firstChildSmallX = Infinity;
		let firstChildSmallY = Infinity;
		let firstChildLargeX = -Infinity;
		let firstChildLargeY = -Infinity;

		if (!canvas) return;
		const canvasRect = canvas.getBoundingClientRect();

		const container = canvas.querySelector('.node-container');
		if (!container) return;

		const child = container.children[0];
		if (!child) return;

		const rect = child.getBoundingClientRect();

		const left = rect.left - canvasRect.left;
		const top = rect.top - canvasRect.top;
		const right = left + rect.width;
		const bottom = top + rect.height;

		if (left < firstChildSmallX) firstChildSmallX = left;
		if (top < firstChildSmallY) firstChildSmallY = top;
		if (right > firstChildLargeX) firstChildLargeX = right;
		if (bottom > firstChildLargeY) firstChildLargeY = bottom;

		const centerX = (firstChildSmallX + firstChildLargeX) / 2;
		const centerY = (firstChildSmallY + firstChildLargeY) / 2;

		camera.x = centerX - canvasRect.width / 2;
		camera.y = centerY - canvasRect.height / 2;

		// Bounds
		setBounds();
		requestAnimationFrame(setBounds);
	}

	function setBounds() {
		if (!canvas) return;
		const canvasRect = canvas.getBoundingClientRect();
		bounds = { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity };

		const styles = getComputedStyle(canvas);
		const cameraX = parseInt(styles.getPropertyValue('--x'));
		const cameraY = parseInt(styles.getPropertyValue('--y'));

		const container = canvas.querySelector('.node-container');

		for (const child of Array.from(container.children)) {
			const rect = child.getBoundingClientRect();

			const left = rect.left - canvasRect.left - cameraX;
			const top = rect.top - canvasRect.top - cameraY;
			const right = left + rect.width;
			const bottom = top + rect.height;

			if (left < bounds.left) bounds.left = left;
			if (top < bounds.top) bounds.top = top;
			if (right > bounds.right) bounds.right = right;
			if (bottom > bounds.bottom) bounds.bottom = bottom;
		}
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
	style={`--x: ${camera.x * -1}px; --y: ${camera.y * -1}px; --zoom: ${camera.zoom};`}
>
	<div
		class="canvas-inner"
		style={`transform: translate3D(${camera.x * -1}px, ${camera.y * -1}px, 0) scale(var(--zoom));`}
	>
		<div class="relative bg-teal-400 node-container">
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	.canvas {
		width: 100%;
		height: 100%;
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
			transform-origin: 0 0;

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
