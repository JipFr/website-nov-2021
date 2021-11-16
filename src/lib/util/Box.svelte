<script>
	export let doHover;
</script>

<div class="box" {doHover}>
	<slot />
</div>

<style>
	.box {
		padding: 1.5rem;
		border-radius: 4px;
		background: var(--content);
		transform: scale(1);
		transition: transform 100ms;
	}
	.box[doHover]:hover {
		transform: scale(1.05);
	}
</style>
