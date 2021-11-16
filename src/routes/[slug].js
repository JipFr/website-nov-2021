import fs from 'fs';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
	const { slug } = params;

	if (fs.existsSync(`./src/routes/projects/${slug}.svx`)) {
		return {
			status: 301,
			headers: {
				location: `/projects/${slug}`
			}
		};
	}
}
