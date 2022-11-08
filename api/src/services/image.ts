import { readFile } from "fs/promises";
import { resolve } from "path";
import { IMAGE_FOLDER_PATH } from "../config/env";
import sharp from "sharp";

/**
 * Loads the clean image from disk
 */
export const loadImageFromDisk = async () => {
  const file = await readFile(
    resolve(process.cwd(), IMAGE_FOLDER_PATH, "./1.jpg")
  );

  return file;
};

/**
 * Takes in a base64-format image, and degrades it a little bit.
 * Returns the degraded image as a base64 string.
 */
export const degradeImage = async (image: Buffer): Promise<Buffer | null> => {
  const delta = Math.random() > 0.5 ? -2 : 2;

  const updatedPicture = await sharp(image)
    // resize the image every time to ensure it degrades a little every time
    .resize({ width: 1280 + delta, height: 720 + delta })
    .jpeg({ quality: 40 + delta })
    .toBuffer()
    .catch(() => null);

  return updatedPicture;
};

export const downsizeImage = async (image: Buffer | null): Promise<Buffer> => {
  if (!image) return Buffer.from([]);

  const updatedPicture = await sharp(image)
    .resize({ width: 1280 / 2, height: 720 / 2 })
    .toBuffer();

  return updatedPicture;
};
