import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData();
	const username = form.get('username')?.toString();
	const password = form.get('password')?.toString();
	const message = username === password ? 'OK' : 'Failed';
	return { body: { message } };
};
