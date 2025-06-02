import Img from './img.js';
import { className } from '../../../apis/encore/element-creator/ec.min.js';

export default function ImageCollage({ URLs, classes }) {
	return {
		tag: 'div',
		classes: classes, //className('image-collage', classes),
		children: URLs.map((URL) => {
			return {
				tag: 'span',
				children: Img({
					URL: URL,
					loading: 'lazy',
					draggable: false,
				}),
			};
		}),
	};
}
