import { getBackups, initMongoose } from '$lib/server/services/mongoose';
import type { PageServerLoad } from '.svelte-kit/types/src/routes/$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	await initMongoose();

	console.log('server load');

	const pics = await getBackups();
	return { pics };
};
