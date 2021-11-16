import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import mdPlugin from 'vite-plugin-markdown';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			plugins: [mdPlugin.default()]
		}
	},
	preprocess: sveltePreprocess()
};

export default config;
