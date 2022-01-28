<script>
	import Testimonial from '$lib/util/Testimonial.svelte';
</script>

<div class="testimonials">
	<Testimonial
		wide
		name="Gary Simon"
		profilePicture="https://i.imgur.com/MhCLrb8.png"
		background="https://i.imgur.com/Dt4YUqw.png"
		links={[
			{
				to: '/projects/designcourse',
				text: 'DesignCourse'
			},
			{
				to: '/projects/designcourse-2',
				text: 'DesignCourse part 2'
			}
		]}
	>
		Jip Frijlink was able to handle transforming my UI designs without any issue, even the complex
		parts that I thought might not be possible. Additionally, he completed everything sooner than
		promised, and communication was excellent. A+!
	</Testimonial>

	<Testimonial
		wide
		name="Jonathan Barrow"
		profilePicture="https://github.com/jonbarrow.png"
		background="https://i.imgur.com/1LhCJyT.png"
		links={[
			{
				to: '/projects/pretendo',
				text: 'Pretendo'
			}
		]}
	>
		Jip provides an amazing work experience by providing fast, high quality, front end web
		development. He has been one of the best developers I have worked with. He was able to turn our
		early concepts into a professional site that I am always proud to show off. I am proud to call
		Jip the lead front end developer for <a href="https://pretendo.network" target="_blank">
			https://pretendo.network/
		</a>
	</Testimonial>

	<Testimonial
		wide
		name="mcpeachpies"
		profilePicture="https://yt3.ggpht.com/a/AATXAJzyx-g1k1TLoiDwfrt31PvtaOO1OsbKS8id6Kdk0Q=s100-c-k-c0xffffffff-no-rj-mo"
		background="https://github.com/mcpeachpies/mcpeachpies-website/raw/master/banner.jpg"
		links={[
			{
				to: '/projects/mcpeachpies',
				text: "mcpeachpies' website"
			},
			{
				text: 'one other project'
			}
		]}
	>
		It’s always a pleasure working on a project with Jip! His knowledge of scripting and design is
		fantastic, allowing flexible and streamline development. He brings so much to the table with his
		ability create something from the most vague of my ideas, while also being extremely open to
		feedback and learning new things. Highly recommend.
	</Testimonial>

	<Testimonial
		name="Alex Tetzlaff"
		profilePicture="https://i.imgur.com/YEBSSAP.jpg"
		background="https://i.imgur.com/5Uprx2s.png"
		links={[
			{
				text: 'MCContent'
			},
			{
				to: '/projects/heliumargon',
				text: 'HeliumArgon'
			}
		]}
	>
		Jip has met every expectation of mine when creating designs. He is also extremely flexible and
		has done so while being provided little information
	</Testimonial>

	<Testimonial
		name="AoElite"
		profilePicture="https://i.imgur.com/s2wcQYo.png"
		background="https://i.imgur.com/eRpLR9i.png"
		links={[
			{
				to: '/projects/pvp-legacy-website',
				text: 'PvP Legacy'
			},
			{
				to: '/projects/kit-viewer',
				text: 'Kit Viewer'
			}
		]}
	>
		Provided a smooth website and a custom visual display specifically made for my needs for a great
		price.
	</Testimonial>
</div>

<style lang="scss">
	.testimonials {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 20px 10px;

		> :global(.wide) {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 800px) {
		.testimonials {
			grid-template-columns: 1fr;
		}
	}
</style>
