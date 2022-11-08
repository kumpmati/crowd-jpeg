import { PRIVATE_API_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch, request }) => {
	const url = new URL(request.url);

	const id = url.searchParams.get('id');
	const secret = url.searchParams.get('secret');

	const requestPath = `${PRIVATE_API_URL}/api/reset?id=${id}&secret=${secret}`;

	const response = await fetch(requestPath)
		.then(async (d) => d.json())
		.catch((err) => console.log(err));

	return new Response(response);
};
