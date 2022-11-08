import mongoose from "mongoose";
import { DB_NAME, DB_URI } from "../config/env";
import { PictureState } from "../schemas/picture";
import { Snapshot, SnapshotModel } from "../schemas/snapshot";
import { downsizeImage } from "./image";

export const initMongoose = async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(DB_URI, { dbName: DB_NAME });
  }
};

export const getNewestSnapshot = async () => {
  return await SnapshotModel.findOne({}).sort({ date: -1 }).exec();
};

export const getAllSnapshots = async () => {
  return await SnapshotModel.find({});
};

export const getSnapshotById = async (id: string) => {
  return await SnapshotModel.find({ id });
};

export const saveSnapshot = async (data: PictureState) => {
  const snapshot: Snapshot = {
    id: data.id,
    count: data.count,
    image: await downsizeImage(data.image),
    date: new Date(),
  };

  return await new SnapshotModel(snapshot).save();
};
