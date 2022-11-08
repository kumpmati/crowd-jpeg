import mongoose from "mongoose";

export const SnapshotSchema = new mongoose.Schema({
  id: String,
  image: Buffer,
  count: Number,
  date: Date,
});

export const SnapshotModel = mongoose.model("backup", SnapshotSchema);

export type Snapshot = {
  id: string;
  image: Buffer;
  date: Date;
  count: number;
};
