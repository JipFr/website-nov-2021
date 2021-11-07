<script>
	export let start;

	$: startDate = new Date(start);
	$: sinceThen = Date.now() - startDate.getTime();

	setInterval(() => {
		sinceThen = Date.now() - startDate.getTime();
	}, 1000);

	function pad(n) {
		return n.toString().padStart(2, '0');
	}

	$: days = Math.floor(sinceThen / (1000 * 60 * 60 * 24));
	$: hours = Math.floor((sinceThen % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	$: minutes = Math.floor((sinceThen % (1000 * 60 * 60)) / (1000 * 60));
	$: seconds = Math.floor((sinceThen % (1000 * 60)) / 1000);
	$: str = `${days>0?`${pad(days)}:`:''}${hours>0?`${pad(hours)}:`:''}${minutes>0?`${pad(minutes)}:`:''}${pad(seconds)}`
</script>

<div class="timer">
	{#each str.split('') as letter}
		<span class="timer-letter" data-letter={letter}>{letter}</span>
	{/each}
</div>

<style>
	.timer {
		font-size: 2.5rem;
		font-family: monospace;
		display: flex;
		margin-top: 20px;
		margin-bottom: 60px;
	}
	.timer .timer-letter:first-child {
		margin-left: 0;
	}
	.timer-letter:not([data-letter=":"]) {
		padding: 5px 10px;
		margin: 0 5px;
		background: rgba(151, 141, 72, 0.1);
		border-radius: 4px;
	}

	@media (max-width: 800px) {
		.timer {
			font-size: 1.5rem;
		}
		.timer-letter:not([data-letter=":"]) {
			margin: 0 2px;
			padding: 2px 5px;
		}
	}
</style>