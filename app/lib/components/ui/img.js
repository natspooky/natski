import { useSuspense, merge } from '../../../apis/encore/element-creator.js';
import { fileName } from '../../../apis/dependencies/file-utils.js';

export default function Img({
	src,
	width,
	height,
	awaitLoad,
	loading,
	fallback,
	...props
}) {
	const image = merge(
		{
			tag: 'img',
			attributes: {
				width,
				height,
				src,
				alt: fileName(src),
				draggable: false,
			},
		},
		props,
	);

	return awaitLoad
		? useSuspense(
				() => {
					return image;
				},
				loading,
				fallback,
		  )
		: image;
}
