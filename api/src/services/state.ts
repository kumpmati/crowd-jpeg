import { PictureState } from "../types/picture";
import { getCached } from "./cache";
import { degradeImage, loadImageFromDisk } from "./image";
import { v4 as uuid } from "uuid";
import produce from "immer";
import { addToQueue } from "./queue";

// in-memory state
let _state: PictureState = {
  id: uuid(),
  count: 0,
  data: null,
  resetSecret: uuid(),
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
      if (!prev.data) {
        const image = await getCached("original_image", loadImageFromDisk);
        prev.data = image;
      }

      prev.count += 1;
      prev.data = await degradeImage(prev.data);
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
      prev.data = image;
      prev.resetSecret = uuid();
      prev.id = uuid();
    });

    // update state
    _state = nextState;
  });

  return getCurrentState();
};
