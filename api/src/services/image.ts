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
export const degradeImage = async (image: Buffer): Promise<Buffer> => {
  const sizeDelta = Math.random() > 0.5 ? -5 : 5;

  const updatedPicture = await sharp(image)
    // resize the image every time to ensure it degrades a little every time
    .resize({ width: 1280 + sizeDelta, height: 720 + sizeDelta })
    .jpeg({ quality: 40 })
    .toBuffer();

  return updatedPicture;
};
