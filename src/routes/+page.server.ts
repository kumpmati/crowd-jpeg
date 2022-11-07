import { DB_IMAGE_KEY } from '$lib/config';
import { getPicture, initMongoose, updatePicture } from '$lib/server/services/mongoose';
import sharp from 'sharp';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ setHeaders, fetch }) => {
	setHeaders({
		'Cache-Control': 'max-age=5' // attempt to cache for 5 seconds
	});

	await initMongoose();

	const doc = await getPicture(DB_IMAGE_KEY);
	if (!doc) {
		await fetch('/api/reset');
		return null;
	}

	const rnd = ~~(Math.random() * 10);

	const updatedPicture = await sharp(doc.image)
		// resize every time to ensure the image degrades a little
		.resize({ width: 1920 / 1.5 + rnd, height: 1281 / 1.5 + rnd })
		.jpeg({ quality: 60 })
		.toBuffer();

	const updatedDoc = await updatePicture(DB_IMAGE_KEY, updatedPicture);

	return {
		count: updatedDoc?.count ?? 0,
		pic: updatedPicture.toString('base64')
	};
};
