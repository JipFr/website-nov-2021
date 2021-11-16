<script>
	export let title;
	const divider = ' — ';
	const name = 'Jip Frijlink';

	const res = title ? title + divider + name : name;
</script>

<title>{res}</title>
<meta name="og:title" content={res} />
<meta name="twitter:title" content={res} />
