import mongoose from 'mongoose';

export const BackupSchema = new mongoose.Schema({
	id: String,
	image: Buffer,
	count: Number,
	date: Date
});

export const BackupModel = mongoose.model('backup', BackupSchema);

export type Backup = {
	id: string;
	image: Buffer;
	count: number;
	date?: Date;
};
