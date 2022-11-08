import { RESET_INTERVAL } from "../config/state";
import { PictureState } from "../schemas/picture";

export const cleanPictureResponse = (data: PictureState) => {
  const canReset = data.count % RESET_INTERVAL === 0;

  return {
    id: data.id,
    count: data.count,
    image: data.image?.toString("base64"),
    resetSecret: canReset ? data.resetSecret : null,
  };
};
