import "dotenv/config";

export const PORT = process.env.PORT!;
export const DB_ENABLED = process.env.DB_ENABLED === "true";
export const DB_URI = process.env.DB_URI!;
export const DB_NAME = process.env.DB_NAME!;
export const IMAGE_FOLDER_PATH = process.env.IMAGE_FOLDER_PATH!;
