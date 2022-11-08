import mongoose from "mongoose";

export const PictureStateSchema = new mongoose.Schema({
  id: String,
  count: Number,
  image: Buffer,
  resetSecret: String,
});

export const PictureStateModel = mongoose.model("picture", PictureStateSchema);

export type PictureState = {
  id: string;
  count: number;
  image: Buffer | null;
  resetSecret: string | null;
};
