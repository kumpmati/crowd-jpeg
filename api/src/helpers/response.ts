import { RESET_INTERVAL } from "../config/state";
import { PictureState } from "../schemas/picture";

type CleanPictureState = Omit<PictureState, "image"> & {
  image: string | null;
};

export const cleanPictureResponse = (data: PictureState): CleanPictureState => {
  const canReset = data.count % RESET_INTERVAL === 0;

  return {
    id: data.id,
    count: data.count,
    image: data.image?.toString("base64") ?? null,
    meta: data.meta,
    resetSecret: canReset ? data.resetSecret : null,
  };
};
