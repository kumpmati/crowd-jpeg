import { processPicture } from '$lib/utils/resize';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return await processPicture();
};
