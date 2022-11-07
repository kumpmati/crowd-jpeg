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

	const sizeDelta = Math.random() > 0.5 ? -5 : 5;

	const updatedPicture = await sharp(doc.image)
		// resize the image every time to ensure it degrades a little every time
		.resize({ width: 1280 + sizeDelta, height: 854 + sizeDelta })
		.jpeg({ quality: 40 })
		.toBuffer();

	const updatedDoc = await updatePicture(DB_IMAGE_KEY, updatedPicture);

	return {
		count: updatedDoc?.count ?? 0,
		pic: updatedPicture.toString('base64')
	};
};
