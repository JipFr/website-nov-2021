<script>
	import Prism from 'prismjs';

	export let code = '';
	export let lang;

	$: highlighted = Prism.highlight(code, Prism.languages[lang], lang);
</script>

<pre class={`language-${lang}`}>
	<code class={`language-${lang}`}>
		{@html highlighted}
	</code>
</pre>

<link rel="stylesheet" href="/one-dark.css" />

<style>
	pre {
		max-width: 100%;
		max-height: 500px;
		overflow: scroll;
		font-size: 0.8rem;
	}
</style>
