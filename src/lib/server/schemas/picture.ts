import mongoose from 'mongoose';

export const PictureSchema = new mongoose.Schema({
	id: String,
	image: Buffer,
	count: Number,
	resetSecret: String,
	date: {
		type: Date,
		required: false
	}
});

export const PictureModel = mongoose.model('picture', PictureSchema);

export type Picture = {
	id: string;
	image: any;
	count: number;
	resetSecret: string;
	date?: Date;
};
