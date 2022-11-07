import type { RequestHandler } from './$types';
import { getPicture, initMongoose, setPicture } from '$lib/server/services/mongoose';
import { error } from '@sveltejs/kit';
import { DB_IMAGE_KEY, RESET_THRESHOLD } from '$lib/config';

export const GET: RequestHandler = async ({ fetch }) => {
	await initMongoose();

	const doc = await getPicture(DB_IMAGE_KEY);
	const count = doc?.count ?? 1;

	const canReset = count > 5 && count % RESET_THRESHOLD <= 5;
	if (!canReset) {
		throw error(403, 'cannot reset');
	}

	const cleanPicture = await fetch('/landscape.jpg').then(async (d) => {
		return Buffer.from(await d.arrayBuffer());
	});

	await setPicture(DB_IMAGE_KEY, cleanPicture);

	return new Response('beluga has been reset');
};
