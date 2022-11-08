import type { PageServerLoad } from './$types';
import type { PictureState } from '$lib/types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad<PictureState> = async ({ fetch, request }) => {
	const url = new URL(request.url);

	const id = url.searchParams.get('id');

	const requestPath = `${PUBLIC_API_URL}/api?id=${id}`;

	const response = await fetch(requestPath)
		.then((d) => d.json())
		.catch((err) => console.log(err));

	return response;
};
