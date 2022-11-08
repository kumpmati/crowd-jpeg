import { DB_IMAGE_KEY } from '$lib/config';
import { getPicture, initMongoose, updatePicture } from '$lib/server/services/mongoose';
import { canReset } from '$lib/utils/reset';
import sharp from 'sharp';
import type { PageServerLoad } from './$types';

type Props = {
	count: number;
	pic: string | null;
	secret: string | null;
};

export const load: PageServerLoad<Props> = async ({ setHeaders, fetch }) => {
	setHeaders({
		'Cache-Control': 'max-age=5' // attempt to cache for 5 seconds
	});

	await initMongoose();

	const doc = await getPicture(DB_IMAGE_KEY);
	const count = doc?.count ?? 0;

	if (!doc) {
		await fetch('/api/reset');
		return {
			count: 0,
			pic: null,
			secret: null
		};
	}

	const sizeDelta = Math.random() > 0.5 ? -5 : 5;

	const updatedPicture = await sharp(doc.image)
		// resize the image every time to ensure it degrades a little every time
		.resize({ width: 1280 + sizeDelta, height: 853 + sizeDelta })
		.jpeg({ quality: 40 })
		.toBuffer();

	const updatedDoc = await updatePicture(DB_IMAGE_KEY, updatedPicture);

	return {
		count: updatedDoc?.count ?? 0,
		pic: updatedPicture.toString('base64'),
		secret: canReset(count) ? updatedDoc?.resetSecret ?? null : null
	};
};
