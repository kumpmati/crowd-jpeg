export const blobToBase64 = async (input: Blob): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.result) {
				resolve(reader.result?.toString());
			} else {
				reject('failed to load');
			}
		};

		reader.readAsDataURL(input);
	});
};
