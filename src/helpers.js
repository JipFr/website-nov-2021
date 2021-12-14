// Other stuff
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export function getDate(d) {
	const dateObj = new Date(d);
	const date = dateObj.getDate().toString().padStart(2, '0');
	const month = months[dateObj.getMonth()];
	const year = dateObj.getFullYear();
	return `${date} ${month} ${year}`;
}

export async function getProjects() {
	const t = import.meta.glob('./routes/projects/*.svx');

	return await Promise.all(Object.entries(t).map(async (v) => [v[0], await v[1]()])).then((p) => {
		const mappedAndSortedProjects = p
			.map((v) => {
				return {
					slug: v[0].split('/').pop().replace('.svx', ''),
					...v[1]
				};
			})
			.sort((a, b) => {
				return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
			});

		return mappedAndSortedProjects;
	});
}

export async function getBlogPosts() {
	const t = import.meta.glob('./routes/blog/*.svx');

	return await Promise.all(Object.entries(t).map(async (v) => [v[0], await v[1]()])).then((p) => {
		const mappedAndSortedProjects = p
			.map((v) => {
				return {
					slug: v[0].split('/').pop().replace('.svx', ''),
					...v[1]
				};
			})
			.sort((a, b) => {
				return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
			});

		return mappedAndSortedProjects;
	});
}
