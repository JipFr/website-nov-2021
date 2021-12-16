<script>
	import { browser } from '$app/env';

	let canvas;
	let head;
	let catHead;
	let player = null;
	let catPlayer = null;
	let running = false;
	const keys = {};

	const headOffset = 0.1;
	const catOffset = -0.1;

	function activate() {
		const pos = head.getBoundingClientRect();
		player = {
			x: pos.x,
			y: pos.y,
			width: head.scrollWidth,
			height: head.scrollHeight,
			accel: 0.1,
			maxSpeed: 5,
			speed: 1,
			rotation: -Math.PI / 2 - headOffset
		};
		requestAnimationFrame(() => {
			if (!running) update();
			head.classList.add('hidden');
		});
	}

	function activateCat() {
		const pos = catHead.getBoundingClientRect();
		catPlayer = {
			x: pos.x,
			y: pos.y,
			width: catHead.scrollWidth,
			height: catHead.scrollHeight,
			accel: 0.1,
			maxSpeed: 15,
			speed: 1,
			rotation: -Math.PI / 2 - catOffset
		};
		requestAnimationFrame(() => {
			if (!running) update();
			catHead.classList.add('hidden');
		});
	}
	function update() {
		if (!running) running = true;
		// Update head position
		if (player) {
			// Check controls
			if (keys.a) {
				player.rotation -= 0.02;
			}
			if (keys.d) {
				player.rotation += 0.02;
			}
			if (keys.w) {
				player.speed += player.accel;
			}
			if (keys.s) {
				player.speed -= player.accel;
			}
			check(player);
		}
		if (catPlayer) {
			// Check controls
			if (keys.arrowleft) {
				catPlayer.rotation -= 0.02;
			}
			if (keys.arrowright) {
				catPlayer.rotation += 0.02;
			}
			if (keys.arrowup) {
				catPlayer.speed += catPlayer.accel;
			}
			if (keys.arrowdown) {
				catPlayer.speed -= catPlayer.accel;
			}
			if (catPlayer.speed > catPlayer.maxSpeed) {
				catPlayer.speed = catPlayer.maxSpeed;
			} else if (catPlayer.speed < -catPlayer.maxSpeed) {
				catPlayer.speed = -catPlayer.maxSpeed;
			}
			check(catPlayer);
		}
		draw();
		requestAnimationFrame(update);
	}
	function check(entity) {
		if (entity.speed > entity.maxSpeed) {
			entity.speed = entity.maxSpeed;
		} else if (entity.speed < -entity.maxSpeed) {
			entity.speed = -entity.maxSpeed;
		}
		// Add speed
		const addX = entity.speed * Math.cos(entity.rotation);
		const addY = entity.speed * Math.sin(entity.rotation);
		entity.x += addX;
		entity.y += addY;
		// Don't allow going past the edge
		if (entity.x - (entity.width + entity.height) > canvas.scrollWidth) {
			entity.x = -entity.width * 2;
		}
		if (entity.x + (entity.width + entity.height) < 0) {
			entity.x = canvas.width + entity.width * 2;
		}
		if (entity.y - (entity.width + entity.height) > canvas.scrollHeight) {
			entity.y = -entity.height * 2;
		}
		if (entity.y + (entity.width + entity.height * 2) < 0) {
			entity.y = canvas.height + entity.height;
		}
	}
	function draw() {
		canvas.width = canvas.scrollWidth;
		canvas.height = canvas.scrollHeight;
		// Draw head
		if (player) drawT(player, head, headOffset);
		// Draw cat head
		if (catPlayer) drawT(catPlayer, catHead, catOffset);
	}
	function drawT(el, img, offset) {
		const ctx = canvas.getContext('2d');
		ctx.save();
		ctx.translate(el.x + el.width / 2, el.y + el.height / 2);
		ctx.rotate(el.rotation + Math.PI / 2 + offset);
		ctx.drawImage(img, -el.width / 2, -el.height / 2, el.width, el.height);
		ctx.restore();
	}
	function keydown(evt) {
		if (player || catPlayer) {
			if (evt.key.includes('Arrow')) evt.preventDefault();
			keys[evt.key.toLowerCase()] = true;
		}
	}
	function keyup(evt) {
		if (player || catPlayer) {
			if (evt.key.includes('Arrow')) evt.preventDefault();
			keys[evt.key.toLowerCase()] = false;
		}
	}

	if (browser) {
		document.addEventListener('keydown', keydown);
		document.addEventListener('keyup', keyup);
	}
</script>

<div class="hero">
	<img class="jip" src="/jip-body.png" alt="Jip with a cat on his shoulder" />
	<img bind:this={head} class="head" src="/jip-head.png" alt on:click={activate} />
	<img bind:this={catHead} src="/cat-head.png" class="cat" alt on:click={activateCat} />
	{#if player || catPlayer}
		<canvas bind:this={canvas} />
	{/if}
</div>

<style lang="scss" scoped>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: 9000;
		pointer-events: none;
	}
	.hero {
		position: relative;
		min-height: 360px;
		.jip {
			width: 270px;
			border-radius: 10px;
			display: block;
		}
		.head {
			width: 110px;
			position: absolute;
			bottom: 41%;
			left: 28px;
			transform: scale(1);
			transition: bottom 200ms, transform 200ms;
		}
		.cat {
			width: 73px;
			position: absolute;
			bottom: 26%;
			left: 148px;
			transform: scale(1);
			transition: transform 200ms;
		}
		&::before {
			content: '';
			display: block;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 60%;
			background: var(--hero-bg);
			border-radius: 10px;
			z-index: -1;
			transition: height 200ms;
		}
	}
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
