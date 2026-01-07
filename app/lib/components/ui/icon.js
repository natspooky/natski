import { merge } from '../../../apis/encore/element-creator.js';

export default function Icon({ src, name, ...props }) {
	return merge(
		{
			tag: 'icon-system',
			attributes: {
				name,
				src,
			},
		},
		props,
	);
}
