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
