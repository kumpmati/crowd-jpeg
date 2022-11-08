import { readFile } from "fs/promises";
import { resolve } from "path";
import { IMAGE_FOLDER_PATH } from "../config/env";
import sharp from "sharp";

export const IMAGE_AUTHORS: { file: string; author: string; link: string }[] = [
  {
    file: "./1.jpg",
    author: "Bailey Zindel",
    link: "https://unsplash.com/@baileyzindel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    file: "./2.jpg",
    author: "Daniela Cuevas",
    link: "https://unsplash.com/@danielacuevas?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    file: "./3.jpg",
    author: "John Mark Arnold",
    link: "https://unsplash.com/@johnmarkarnold?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    file: "./4.jpg",
    author: "Vincentiu Solomon",
    link: "https://unsplash.com/@vincentiu?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
];

let index = ~~(Math.random() * IMAGE_AUTHORS.length);

/**
 * Loads the clean image from disk
 */
export const loadImageFromDisk = async () => {
  const meta = IMAGE_AUTHORS[index++ % IMAGE_AUTHORS.length];

  const file = await readFile(
    resolve(process.cwd(), IMAGE_FOLDER_PATH, meta.file)
  );

  return {
    meta,
    data: file,
  };
};

/**
 * Takes in a base64-format image, and degrades it a little bit.
 * Returns the degraded image as a base64 string.
 */
export const degradeImage = async (image: Buffer): Promise<Buffer | null> => {
  const delta = Math.random() > 0.5 ? -2 : 2;

  const updatedPicture = await sharp(image)
    .sharpen({ m1: 0.2, sigma: Math.random() < 0.005 ? 0.5 : 0.2 })
    .webp({ quality: 40 })
    .gamma(Math.random() < 0.005 ? 1.3 : 1.15)
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
