export async function getProjects() {
	const t = import.meta.glob('../static/content/projects/*.md');

	return await Promise.all(Object.entries(t).map(async (v) => [v[0], await v[1]()])).then((p) => {
		const mappedAndSortedProjects = p
			.map((v) => {
				return {
					slug: v[0].split('/').pop().replace('.md', ''),
					...v[1].attributes
				};
			})
			.sort((a, b) => {
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			});

		return mappedAndSortedProjects;
	});
}
