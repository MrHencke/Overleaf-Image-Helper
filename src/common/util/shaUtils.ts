export const sha256FromImage = async (image: File): Promise<string> => {
	var reader = new FileReader();
	reader.readAsBinaryString(image);
	return await new Promise(
		(resolve) =>
			(reader.onloadend = async () => {
				let hash = '';
				let result = reader.result;
				if (result instanceof ArrayBuffer)
					hash = await sha256(result);
				if (typeof result == 'string') 
					hash = await sha256(new TextEncoder().encode(result));
				resolve(hash);
			})
	);
};

const sha256 = async (data: ArrayBuffer): Promise<string> => {
	const hash = await crypto.subtle.digest('SHA-256', data)
	const hashArray = Array.from(new Uint8Array(hash))
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
	return hashHex.substring(0, 8)
};