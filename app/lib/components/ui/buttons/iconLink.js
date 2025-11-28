import Link from './link.js';
import Icon from '../icon.js';

export default function IconButton({ name, src, children, ...props }) {
	return Link({
		...props,
		chilren: [
			Icon({
				name,
				src,
			}),
			{
				tag: 'p',
				children,
			},
		],
	});
}
