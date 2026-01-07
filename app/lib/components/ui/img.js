import { useSuspense, merge } from '../../../apis/encore/element-creator.js';
import { fileName } from '../../../apis/dependencies/file-utils.js';

function Img({ src, height, width, alt, ...props }) {
	return merge(
		{
			tag: 'img',
			attributes: {
				width,
				height,
				src,
				alt: alt ?? fileName(src),
				draggable: false,
			},
		},
		props,
	);
}

function SuspenceImg(props) {
	return useSuspense(() => {
		return Img(props);
	});
}

function ImgCollage({}, images) {
	return { tag: 'div', children: {} };
}

function SuspenseCollage(props, images) {
	return useSuspense(() => {
		return ImgCollage(props, images);
	});
}

export { Img, ImgCollage, SuspenceImg, SuspenseCollage };
