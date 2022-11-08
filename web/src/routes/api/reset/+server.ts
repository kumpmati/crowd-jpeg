import type { RequestHandler } from './$types';
import { DB_NAME } from '$env/static/private';

export const GET: RequestHandler = async ({ fetch, request }) => {
	const url = new URL(request.url);

	const id = url.searchParams.get('id');
	const secret = url.searchParams.get('secret');

	const requestPath = `${DB_NAME}/api/reset?id=${id}&secret=${secret}`;

	const response = await fetch(requestPath)
		.then(async (d) => d.json())
		.catch((err) => console.log(err));

	return new Response(response);
};
