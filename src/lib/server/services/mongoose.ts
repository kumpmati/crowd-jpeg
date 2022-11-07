import { DB_NAME, DB_URI } from '$env/static/private';
import mongoose from 'mongoose';
import { PictureModel } from '../schemas/picture';
import { nanoid } from 'nanoid';
import { BackupModel, type Backup } from '../schemas/backup';

export const initMongoose = async () => {
	if (!mongoose.connection.readyState) {
		await mongoose.connect(DB_URI, { dbName: DB_NAME });
	}
};

export const getPicture = async (id: string) => {
	return await PictureModel.findOne({ id });
};

export const regeneratePictureSecret = async (id: string) => {
	return await PictureModel.findOneAndUpdate({ id }, { resetSecret: nanoid() });
};

export const updatePicture = async (id: string, data: Buffer) => {
	return await PictureModel.findOneAndUpdate(
		{ id },
		{ image: data, $inc: { count: 1 } },
		{ new: true }
	);
};

export const setPicture = async (id: string, data: Buffer) => {
	if (!(await getPicture(id).catch(() => null))) {
		return await new PictureModel({ id, image: data, count: 0, resetSecret: nanoid() }).save();
	}

	return await PictureModel.updateOne({ id }, { image: data, count: 1, resetSecret: nanoid() });
};

export const backupPicture = async (data: Omit<Backup, 'id' | 'date'>) => {
	const doc = new BackupModel(data);

	doc.id = nanoid(); // replace id before backup so that current one isn't affected
	doc.date = new Date();

	return await doc.save();
};

export const getBackups = async () => {
	const docs = await BackupModel.find({});
	return docs.map((d) => {
		const json = d.toJSON() as any;

		delete json['_id'];
		delete json['__v'];

		json.image = Buffer.from(json.image.data).toString('base64');

		return json;
	});
};
