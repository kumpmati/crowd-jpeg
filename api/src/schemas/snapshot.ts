import mongoose, { Mongoose } from "mongoose";

export const SnapshotSchema = new mongoose.Schema({
  id: String,
  image: Buffer,
  count: Number,
  date: Date,
  meta: new mongoose.Schema({
    file: String,
    author: String,
    link: String,
  }),
});

export const SnapshotModel = mongoose.model("backup", SnapshotSchema);

export type Snapshot = {
  id: string;
  image: Buffer;
  date: Date;
  count: number;
  meta: {
    file: String;
    author: string;
    link: string;
  };
};
