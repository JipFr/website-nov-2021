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
	const t = import.meta.globEager('./routes/projects/*.svx');

	const items = Object.entries(t)
		.map((v) => {
			return {
				slug: v[0].split('/').pop().replace('.svx', ''),
				...v[1]
			};
		})
		.sort((a, b) => {
			return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
		});

	return items;
}

export async function getBlogPosts() {
	const t = import.meta.globEager('./routes/blog/*.svx');

	const items = Object.entries(t)
		.map((v) => {
			return {
				slug: v[0].split('/').pop().replace('.svx', ''),
				...v[1]
			};
		})
		.sort((a, b) => {
			return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
		});

	return items;
}
