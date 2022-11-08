import { writeFile } from "fs/promises";
import { resolve } from "path";
import { getAllSnapshots } from "./database";

export const startTimelapseService = async () => {
  const snapshots = await getAllSnapshots();

  snapshots.forEach(async (snap, i) => {
    if (!snap?.image) return;

    const path = resolve(process.cwd(), "./history", "image-" + i + ".jpg");
    await writeFile(path, snap.image, { encoding: "base64" });
  });
};
