const config = {
	extensions: ['.svelte.md', '.svx'],

	layout: {
		_: './src/lib/layout/PostLayout.svelte'
	},

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [],
	rehypePlugins: []
};

export default config;
