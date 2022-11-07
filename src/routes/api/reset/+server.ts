import type { RequestHandler } from './$types';
import { getPicture, initMongoose, setPicture } from '$lib/server/services/mongoose';
import { error } from '@sveltejs/kit';
import { DB_IMAGE_KEY, RESET_INTERVAL, RESET_THRESHOLD } from '$lib/config';

export const GET: RequestHandler = async ({ fetch }) => {
	await initMongoose();

	const doc = await getPicture(DB_IMAGE_KEY).catch(() => null);
	const count = doc?.count ?? 0;

	if (!doc) {
		const cleanPicture = await fetch('/1.jpg').then(async (d) =>
			Buffer.from(await d.arrayBuffer())
		);
		await setPicture(DB_IMAGE_KEY, cleanPicture);
		return new Response('image refreshed');
	}

	const canReset = count > RESET_THRESHOLD && count % RESET_INTERVAL <= RESET_THRESHOLD;
	if (!canReset) {
		throw error(403, 'cannot reset');
	}

	const cleanPicture = await fetch('/1.jpg').then(async (d) => Buffer.from(await d.arrayBuffer()));

	await setPicture(DB_IMAGE_KEY, cleanPicture);

	return new Response('beluga has been reset');
};
