import { DB_IMAGE_KEY } from '$lib/config';
import { getPicture, initMongoose, updatePicture } from '$lib/server/services/mongoose';
import { error } from '@sveltejs/kit';
import sharp from 'sharp';

export const processPicture = async () => {
	await initMongoose();

	const doc = await getPicture(DB_IMAGE_KEY);
	if (!doc) throw error(404, 'pic not found');

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
