import { RESET_INTERVAL } from "../config/state";
import { PictureState } from "../types/picture";

export const cleanPictureResponse = (data: PictureState) => {
  const canReset = data.count % RESET_INTERVAL === 0;

  return {
    id: data.id,
    count: data.count,
    data: data.data?.toString("base64"),
    resetSecret: canReset ? data.resetSecret : null,
  };
};
