import { DB_NAME, DB_URI } from '$env/static/private';
import mongoose from 'mongoose';
import { PictureModel } from '../schemas/picture';

export const initMongoose = async () => {
	if (!mongoose.connection.readyState) {
		await mongoose.connect(DB_URI, { dbName: DB_NAME });
	}
};

export const getPicture = async (id: string) => {
	return await PictureModel.findOne({ id });
};

export const updatePicture = async (id: string, data: Buffer) => {
	return await PictureModel.findOneAndUpdate(
		{ id },
		{ id, image: data, $inc: { count: 1 } },
		{ new: true }
	);
};

export const setPicture = async (id: string, data: Buffer) => {
	if (!(await getPicture(id).catch(() => null))) {
		return await new PictureModel({ id, image: data, count: 0 }).save();
	}

	return await PictureModel.updateOne({ id }, { image: data, count: 1 });
};
