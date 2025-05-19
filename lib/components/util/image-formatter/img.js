export default async function Img(URL) {
	const img = new Image();
	img.src = URL;
	await img.decode();
	return img;
}
