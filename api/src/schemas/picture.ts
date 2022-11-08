import mongoose from "mongoose";

export const PictureStateSchema = new mongoose.Schema({
  id: String,
  count: Number,
  image: Buffer,
  meta: new mongoose.Schema({
    file: String,
    author: String,
    link: String,
  }),
  resetSecret: String,
});

export const PictureStateModel = mongoose.model("picture", PictureStateSchema);

export type PictureState = {
  id: string;
  count: number;
  image: Buffer | null;
  meta: {
    file: string;
    author: string;
    link: string;
  };
  resetSecret: string | null;
};
