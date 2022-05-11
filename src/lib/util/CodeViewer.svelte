<script>
	import Code from '$lib/util/Code.svelte';
	import { onMount } from 'svelte';

	export let html = '';
	export let css = '';
	export let js = '';

	let iframeWrapper = null;
	let codeViewer = null;
	let codeWidth = 0;
	let fromRight = 0;
	let mouseIsDown = false;
	let lang;
	let selectedCode;

	if (html) {
		lang = 'html';
		selectedCode = html;
	} else if (css) {
		lang = 'css';
		selectedCode = css;
	} else if (js) {
		lang = 'javascript';
		selectedCode = js;
	}

	$: iframeWrapper, updateIframe();

	function onMouseDown() {
		mouseIsDown = true;
	}
	function onMouseUp() {
		mouseIsDown = false;
	}

	function updateIframe() {
		if (typeof document !== 'undefined' && iframeWrapper) {
			const iframe = document.createElement('iframe');
			iframe.src = '/blank.html';
			iframe.setAttribute('frameborder', 0);

			iframe.onload = () => {
				if (html) {
					iframe.contentDocument.body.innerHTML = html;
				}

				if (css) {
					const style = document.createElement('style');
					style.innerHTML = css;
					iframe.contentDocument.body.appendChild(style);
				}

				if (js) {
					const script = document.createElement('script');
					script.innerHTML = js;
					iframe.contentDocument.body.appendChild(script);
				}
			};

			iframeWrapper.innerHTML = '';
			iframeWrapper.appendChild(iframe);
		}
	}

	function onMouseMove(evt) {
		let containerWidth = codeViewer.scrollWidth - 30;
		fromRight = containerWidth - codeWidth;

		if (mouseIsDown) {
			if (evt.movementX) {
				if (
					(evt.movementX > 0 && evt.clientX > codeViewer.querySelector('.mover').offsetLeft + 20) ||
					(evt.movementX < 0 && evt.clientX < codeViewer.querySelector('.mover').offsetLeft + 20)
				) {
					codeWidth = Math.min(Math.max(codeWidth + evt.movementX, 0), containerWidth);
				}
			} else {
				// Touch
				codeWidth = Math.min(
					Math.max(evt.touches[0].clientX - codeViewer.getBoundingClientRect().left - 20, 0),
					containerWidth
				);
			}
		}
	}

	function setTab(newLang) {
		lang = newLang;
		if (lang === 'html') {
			selectedCode = html;
		} else if (lang === 'css') {
			selectedCode = css;
		} else if (lang === 'js') {
			selectedCode = js;
		}
	}

	onMount(() => {
		codeViewer.classList.remove('hidden');
	});
</script>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} on:touchmove={onMouseMove} />

<div class="no-script">
	<p>To view this code, you need to enable JavaScript.</p>
</div>

<div class="code-viewer hidden" bind:this={codeViewer}>
	<div class="code-side" style={`--width: ${codeWidth}px; ${codeWidth < 250 && 'display: none;'}`}>
		<div class="tabs">
			{#if html}
				<div class="tab html" on:click={() => setTab('html')} class:active={lang === 'html'}>
					<img src="/img/tech/html.png" alt="HTML" />
					<span>HTML</span>
				</div>
			{/if}
			{#if css}
				<div class="tab css" on:click={() => setTab('css')} class:active={lang === 'css'}>
					<img src="/img/tech/css.svg" alt="CSS" />
					<span>CSS</span>
				</div>
			{/if}
			{#if js}
				<div class="tab js" on:click={() => setTab('js')} class:active={lang === 'js'}>
					<img src="/img/tech/js.png" alt="JavaScript" />
					<span>JS</span>
				</div>
			{/if}
		</div>
		<Code code={selectedCode} {lang} />
	</div>
	<div
		class="mover"
		on:mousedown={onMouseDown}
		on:touchstart={onMouseDown}
		on:mouseup={onMouseUp}
		on:touchend={onMouseDown}
	/>
	<div
		class="viewing-side"
		bind:this={iframeWrapper}
		style={`${fromRight < 100 && 'opacity: 0; max-height: 0; overflow: hidden;'}; ${
			mouseIsDown && 'pointer-events: none;'
		}`}
	/>
</div>

<style lang="scss">
	.no-script {
		width: 100%;
		padding: 30px;
		border-radius: 6px;
		background: var(--content);
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		text-align: center;
		box-sizing: border-box;

		img {
			width: 70%;
		}
	}
	.hidden {
		display: none !important;
	}
	.code-viewer {
		display: flex;
		width: 100%;
		min-height: 500px;
		margin: 30px 0;
		border: 1px solid var(--border);
		--code-bg: #282c34;
		background: var(--code-bg);

		.code-side {
			width: var(--width);
			min-width: var(--width);
			max-width: 300px;
		}

		.mover {
			min-width: 30px;
			width: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: col-resize;

			&::before {
				content: '';
				display: block;
				width: 3px;
				height: 80%;
				background: rgba(255, 255, 255, 0.1);
			}
		}

		.viewing-side {
			width: 100%;
		}
	}
	.viewing-side :global(iframe) {
		width: 100%;
		height: 100% !important;
	}

	.code-side {
		.tabs {
			display: flex;
			gap: 10px;
			padding: 10px;
			background: var(--code-bg);

			.tab {
				padding: 5px 10px;
				width: 100%;
				cursor: pointer;
				color: white;
				background: var(--code-bg);
				text-align: left;
				display: flex;
				flex-wrap: wrap;
				align-items: center;

				img {
					display: block;
					width: 1.2rem;
					height: 1.2rem;
					margin: 0;
					margin-right: 10px;
					border: 0;
				}

				span {
					display: block;
					margin: 5px 0;
					min-width: 50px;
				}

				&:hover {
					background: #1d2026;
				}

				&.active {
					background: #121417;
				}
			}
		}

		:global(pre) {
			margin: 0;
			margin-top: 10px;
			border-radius: 4px;
		}
	}

	@media (max-width: 800px) {
		.code-viewer {
			flex-wrap: wrap;
			background: transparent;
			border: 0;
		}
		.code-side {
			--width: 100% !important;
			display: block !important;
		}
		.mover {
			display: none !important;
		}
		.viewing-side {
			border-top: 20px solid var(--body);
			width: 100%;
			opacity: 1 !important;
			max-height: 80vh !important;
			border-radius: 4px;

			:global(iframe) {
				height: 80vh !important;
				border-radius: 6px;
			}
		}
		.tabs {
			border-radius: 4px;

			.tab {
				padding: 10px;
				border-radius: 4px;
			}
		}
	}
</style>
