import { jsonElementify } from '../../../../api/encore/element-creator/ec.min.js';
import Img from './img.js';

export default function ImageMenu() {
	const outputData = () => {};

	const startLoad = (self) => {
		let images; /*= self.parentNode.parentNode.children[0].map((image) => {
			return image.dataset['ImageURL'];
		});*/

		images = [
			'https://static.vecteezy.com/system/resources/previews/024/646/930/large_2x/ai-generated-stray-cat-in-danger-background-animal-background-photo.jpg',
		];

		Promise.all(images.map(Img)).then((images) => {
			images.forEach((image) => {
				let canvas = jsonElementify({
						tag: 'canvas',
						attributes: {
							height: image.height,
							width: image.height,
						},
					}),
					context = canvas.getContext('2d');

				document.body.appendChild(canvas);
				context.drawImage(image, 0, 0, image.width, image.height);
			});
		});
	};

	return {
		tag: 'div',
		children: [
			{
				tag: 'span',
				classes: 'drag-zone',
			},
			{
				tag: 'section',
				classes: 'button-container',
			},
		],
	};
}
