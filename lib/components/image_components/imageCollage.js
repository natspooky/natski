import Img from './img.js';

export default function ImageCollage({ srcSet, classes }) {
	return {
		tag: 'div',
		classes: classes,
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
