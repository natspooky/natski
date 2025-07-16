import Img from './img.js';
import { className } from '../../../apis/encore/element-creator/ec.min.js';

export default function ImageCollage({ srcSet, classes }) {
	return {
		tag: 'div',
		classes: classes, //className('image-collage', classes),
		children: srcSet.map((src) => {
			return {
				tag: 'span',
				children: Img({
					src: src,
					loading: 'lazy',
					draggable: false,
				}),
			};
		}),
	};
}
