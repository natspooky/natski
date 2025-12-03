import Link from './link.js';
import Icon from '../icon.js';

export default function IconButton({
	href,
	target,
	name,
	src,
	children,
	...props
}) {
	return Link({
		...props,
		href,
		target,
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
