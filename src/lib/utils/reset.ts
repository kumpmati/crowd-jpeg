import { RESET_INTERVAL, RESET_THRESHOLD } from '$lib/config';

export const canReset = (num: number): boolean =>
	num > RESET_THRESHOLD && num % RESET_INTERVAL < RESET_THRESHOLD;
