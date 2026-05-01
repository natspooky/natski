import { useSuspense, merge } from '../../../apis/encore/element-creator.js';
import { fileName } from '../../../apis/dependencies/file-utils.js';
import Icon from './icon.js';

function Img({ src, height, width, alt, suspense, ...props }) {
	const imageBase = merge(
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

	const suspenseStyle = {
		display: 'block',
		height: height ? `${height}px` : null,
		width: width ? `${width}px` : null,
	};

	return suspense
		? useSuspense(
				() => {
					return imageBase;
				},
				merge(
					{
						tag: 'span',
						style: suspenseStyle,
					},
					props,
				),
				merge(
					{
						tag: 'div',
						style: suspenseStyle,
						children: {
							tag: 'span',
							style: {
								height: '100%',
								width: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: 'black',
							},
							children: Icon({
								name: 'alert',
								style: {
									height: '50%',
									width: '50%',
									display: 'block',
									backgroundColor: 'white',
								},
							}),
						},
					},
					props,
				),
			)
		: imageBase;
}

export default Img;
