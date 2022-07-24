import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData();
	const name = form.get('name');
	// const file = form.get('file');
	return { body: { message: `File with name "${name}" saved` } };
};
