<a sveltekit:prefetch href="/">← Terug naar de home pagina</a>

<div class="box">
	<h1>Hoe lang ligt de vloer bij Jip en Julian er al uit?</h1>
	<h3>Aanschouw: een livestream van de gang in kwestie!</h3>
</div>

<!-- svelte-ignore a11y-media-has-caption -->
<!-- <video
	on:click={hijack}
	controls
	autoplay
	src="https://ia601602.us.archive.org/11/items/Rick_Astley_Never_Gonna_Give_You_Up/Rick_Astley_Never_Gonna_Give_You_Up.mp4"
	style="width: 100%"
/> -->
<div on:click={hijack} class="img">
	<img src="https://cdn.discordapp.com/attachments/834523769137135666/895780340847755325/image0.png" alt="Livestream" style="width: 100%">
	<audio src="/fnaf.mp4" autoplay controls loop hidden></audio>
</div>
<div class="black">{now}</div>

<style lang="scss">
	.img {
		position: relative;
	}
	.img img {
		display: block;
	}
	.img::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url(https://upload.wikimedia.org/wikipedia/commons/7/7e/Random_static.gif);
		background-size: cover;
		opacity: 0.05;
	}
	.black {
		box-sizing: border-box;
		width: 100%;
		padding: 5px;
		background: black;
		font-family: monospace;
		text-align: right;
		color: white;
		font-size: 20px;
		font-variant-numeric: tabular-nums;
		text-transform: uppercase;
		white-space: break-spaces;
	}
</style>

<script>

	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	let now;
	setNow()
	setInterval(setNow, 200)

	function setNow() {
		let d = new Date();
		now = `${days[d.getDay()].slice(0,3)} ${months[d.getMonth()].slice(0,3)} ${d.getDate().toString().padStart(2,'0')} ${d.getFullYear()}   ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}.${d.getMilliseconds().toString().padStart(3,'0')}`
	}

	function hijack() {
		if(typeof document !== "undefined") {
			document.querySelector('audio')?.play?.()
			setInterval(() => {
				document.querySelector('audio')?.play?.()
			}, 1000)
			const f = (document?.body?.requestPointerLock || document?.body?.mozRequestPointerLock)
			if (f) {
				document.querySelector('audio')?.play?.()
				f.call(document.body)
			}
			document.addEventListener('keyup', () => {
				document.querySelector('audio')?.play?.()
			})
		}
	}
	hijack()
</script>
