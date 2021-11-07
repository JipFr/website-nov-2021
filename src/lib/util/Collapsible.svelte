<script>
	export let title;
</script>

<template>
	<details>
		<summary>
			<div class="summary-top">
				<span>{title}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="feather feather-chevron-down"
				>
					<polyline points="6 9 12 15 18 9" />
				</svg>
			</div>
		</summary>

		<div class="content">
			<slot />
		</div>
	</details>
</template>

<style lang="scss" scoped>
	details:not([open]) svg {
		transform: rotate(180deg);
	}
	summary:focus {
		outline: 0; // I hate doing this, but it looks horrible when clicked on otherwise
	}
	details > summary {
		list-style: none;
	}
	details > summary::-webkit-details-marker {
		display: none;
	}
	.summary-top {
		display: flex;
		justify-content: space-between;
		font-size: 1rem;
		padding-bottom: 10px;
		border-bottom: 1px solid var(--border);
		margin-bottom: 10px;

		svg {
			display: block;
		}
	}
</style>
