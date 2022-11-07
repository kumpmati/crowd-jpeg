import type { RequestHandler } from './$types';
import {
	getPicture,
	initMongoose,
	setPicture,
	regeneratePictureSecret,
	backupPicture
} from '$lib/server/services/mongoose';
import { error } from '@sveltejs/kit';
import { DB_IMAGE_KEY } from '$lib/config';

export const GET: RequestHandler = async ({ fetch, request }) => {
	await initMongoose();

	const { searchParams } = new URL(request.url);

	const doc = await getPicture(DB_IMAGE_KEY).catch(() => null);

	// create new picture if it doesn't exist
	if (!doc) {
		const cleanPicture = await fetch('/1.jpg').then(async (d) =>
			Buffer.from(await d.arrayBuffer())
		);
		await setPicture(DB_IMAGE_KEY, cleanPicture);
		return new Response('image refreshed');
	}

	const correctSecret = searchParams.get('secret') === doc.resetSecret;
	if (!correctSecret) {
		throw error(403, 'forbidden');
	}

	// back up the last state of the picture
	await backupPicture({ count: doc.count!, image: doc.image! });

	const cleanPicture = await fetch('/1.jpg')
		.then((d) => d.arrayBuffer())
		.then((d) => Buffer.from(d));

	// set new picture
	await setPicture(DB_IMAGE_KEY, cleanPicture);
	await regeneratePictureSecret(DB_IMAGE_KEY);

	return new Response('picture has been reset');
};
