<script context="module">
	// import utility functions
	import { getBlogPosts } from '../helpers';

	export const prerender = true;

	/** @type {import('@sveltejs/kit').Load} */
	export async function load() {
		const blogPosts = await getBlogPosts();

		return {
			props: {
				blogPosts
			}
		};
	}
</script>

<script>
	// Import modules
	import Title from '$lib/util/Title.svelte';
	import Container from '$lib/layout/Container.svelte';
	import BlogList from '$lib/BlogList.svelte';
	import CodeViewer from '$lib/util/CodeViewer.svelte';
	export let blogPosts;

	const myHtml = `<main>
	<div class="roadmap-container">
		<canvas></canvas>
		<div class="content">
			<div class="item">
				<div class="item-wrapper">
					<div class="dot left-dot"></div>
					<div class="item-content">This is my div</div>
					<div class="dot right-dot"></div>
				</div>
			</div>
			<div class="item">
				<div class="item-wrapper">
					<div class="dot left-dot"></div>
					<div class="item-content">This is my div</div>
					<div class="dot right-dot"></div>
				</div>
			</div>
			<div class="item">
				<div class="item-wrapper">
					<div class="dot left-dot"></div>
					<div class="item-content">This is my div</div>
					<div class="dot right-dot"></div>
				</div>
			</div>
			<div class="item">
				<div class="item-wrapper">
					<div class="dot left-dot"></div>
					<div class="item-content">This is my div</div>
					<div class="dot right-dot"></div>
				</div>
			</div>
			<div class="item">
				<div class="item-wrapper">
					<div class="dot left-dot"></div>
					<div class="item-content">This is my div</div>
					<div class="dot right-dot"></div>
				</div>
			</div>
			<div class="item">
				<div class="item-wrapper">
					<div class="dot left-dot"></div>
					<div class="item-content">This is my div</div>
					<div class="dot right-dot"></div>
				</div>
			</div>
		</div>
	</div>
</main>`;
	const myCss = `body {
	font-family: Arial;
	background: #181818;
	color: white;
}
main {
	width: 100%;
}

canvas {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
}

.roadmap-container {
	width: 80%;
	margin: 60px auto;
	max-width: 800px;
}

.item-wrapper {
	display: flex;
	align-items: center;
}

.dot {
	--color: #00e472;
	min-width: 1.5rem;
	width: 1.5rem;
	height: 1.5rem;
	background: var(--color);
	border-radius: 50%;
	box-shadow: 0 0 20px var(--color);
}
.item:nth-child(3) .dot {
	--color: red;
}

.left-dot {
	margin-right: 40px;
}
.right-dot {
	margin-left: 40px;
}

.item-wrapper {
	max-width: 300px;
}

.content > .item {
	display: flex;
	justify-content: flex-start;
	color: gray;
	margin: 90px 0;
}

.content > .item:nth-child(even) {
	justify-content: flex-end;
}

.content > .item:nth-child(even) .right-dot {
	display: none;
}
.content > .item:nth-child(odd) .left-dot {
	display: none;
}

main {
	position: relative;
}

main::before {
	content: "";
	display: block;
	position: absolute;
	width: 100%;
	padding-bottom: 134%;
	background-image: url("https://designcourse.com/textures/roadmap.svg");
	background-size: cover;
	z-index: -1;
}

@media (max-width: 600px) {
	.content > .item .left-dot {
		display: block !important;
	}
	.content > .item .right-dot {
		display: none;
	}
	.content > .item:nth-child(even) {
		justify-content: flex-start;
	}
}
`;
	const myJs = `function doRoadmapLines() {
	const visibleDots = Array.from(document.querySelectorAll(".item .dot")).filter(
		(dotElement) => {
			return dotElement.scrollWidth > 0 && dotElement.scrollHeight > 0; // Only return visible dots
		}
	);

	// Get canvas element
	const canvas = document.querySelector("canvas");
	canvas.width = canvas.scrollWidth;
	canvas.height = canvas.scrollHeight;
	const ctx = canvas.getContext("2d");

	// Loop over dots, draw lines

	const canvasBox = canvas.getBoundingClientRect();

	for (let i = 0; i < visibleDots.length; i++) {
		const dot = visibleDots[i];
		const nextDot = visibleDots[i + 1];

		if (nextDot) {
			// Find the position of the current and next dot
			const dotPosition = getOffset(dot, canvasBox);
			const nextDotPosition = getOffset(nextDot, canvasBox);

			// Draw the line
			ctx.beginPath();

			ctx.lineWidth = 2;
			ctx.strokeStyle = getComputedStyle(dot).backgroundColor;

			ctx.moveTo(
				dotPosition.left + dotPosition.width / 2,
				dotPosition.top + dotPosition.height / 2
			);
			ctx.lineTo(
				nextDotPosition.left + nextDotPosition.width / 2,
				nextDotPosition.top + nextDotPosition.height / 2
			);
			ctx.setLineDash([15, 15]);

			ctx.stroke();
		}
	}
}

doRoadmapLines();
window.addEventListener("resize", doRoadmapLines);

function getOffset(el, offset = {}) {
	const rect = el.getBoundingClientRect();
	return {
		left: rect.left - (offset.left || 0),
		top: rect.top - (offset.top || 0),
		width: rect.width || el.offsetWidth,
		height: rect.height || el.offsetHeight
	};
}
`;
</script>

<svelte:head>
	<Title title="Blog" />
</svelte:head>

<Container>
	<h1>Blog</h1>

	<CodeViewer html={myHtml} css={myCss} js={myJs} />

	<p class="paragraph">
		I like to write about things that I find interesting. Here are some of my most recent posts.
	</p>

	<BlogList {blogPosts} />
</Container>
