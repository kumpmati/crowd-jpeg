export const DB_IMAGE_KEY = 'current_image';

// how to calculate if someone can reset:
// if (request number % RESET_INTERVAL) is under RESET_THRESHOLD,
// then resetting is allowed.
// Example: RESET_INTERVAL = 200; RESET_THRESHOLD = 2;
// request numbers that can reset: #200, #201

export const RESET_INTERVAL = 400;
export const RESET_THRESHOLD = 1;
