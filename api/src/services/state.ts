import { getCached } from "./cache";
import { degradeImage, loadImageFromDisk } from "./image";
import { v4 as uuid } from "uuid";
import produce from "immer";
import { addToQueue } from "./queue";
import { PictureState } from "../schemas/picture";
import { getNewestSnapshot } from "./database";

// in-memory state
let _state: PictureState = {
  id: uuid(),
  count: 0,
  image: null,
  resetSecret: uuid(),
};

/**
 * Attempts to load the latest state from the database
 */
export const restoreState = async () => {
  const newest = await getNewestSnapshot();

  _state.id = newest?.id;
  _state.count = newest?.count ?? 0;
  _state.image = newest?.image ?? null;
  _state.resetSecret = uuid();

  console.log("restored state to newest snapshot");
};

export const getCurrentState = () => {
  return _state;
};

/**
 * Increments the count by 1 and degrades the image a little.
 */
export const advanceState = async () => {
  addToQueue(async () => {
    const nextState = await produce(getCurrentState(), async (prev) => {
      // load image if it doesn't exist
      if (!prev.image) {
        const image = await getCached("original_image", loadImageFromDisk);
        prev.image = image;
      }

      const newImage = await degradeImage(prev.image);
      if (!newImage) return;

      prev.count += 1;
      prev.image = newImage;
    });

    // update state
    _state = nextState;
  });

  return getCurrentState();
};

/**
 * Sets count to 0, restores the image quality and regenerates the secret and id.
 */
export const resetState = async (id: string, secret: string) => {
  const currentState = getCurrentState();

  const isValid = id === currentState.id && secret === currentState.resetSecret;
  if (!isValid) return null;

  addToQueue(async () => {
    const nextState = await produce(getCurrentState(), async (prev) => {
      const image = await getCached("original_image", loadImageFromDisk);

      prev.count = 0;
      prev.image = image;
      prev.resetSecret = uuid();
      prev.id = uuid();
    });

    // update state
    _state = nextState;
  });

  return getCurrentState();
};
