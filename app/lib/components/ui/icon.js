import { merge } from '../../../apis/encore/element-creator.js';

export default function Icon({ src, name, classes, children, ...props }) {
	return {
		...props,
		tag: 'icon-system',
		classes,
		attributes: {
			name,
			src,
		},
		children,
	};
}
