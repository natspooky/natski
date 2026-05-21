import { fileName } from '../../../apis/dependencies/file-utils.js';

function Img({ src, height, width, alt, attributes, ...props }) {
	return {
		tag: 'img',
		attributes: {
			width,
			height,
			src,
			alt: alt ?? fileName(src),
			draggable: false,
			...attributes,
		},
		...props,
	};
}

export default Img;
