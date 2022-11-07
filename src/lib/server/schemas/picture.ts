import mongoose from 'mongoose';

export const PictureSchema = new mongoose.Schema({
	id: String,
	image: Buffer,
	count: Number
});

export const PictureModel = mongoose.model('picture', PictureSchema);
