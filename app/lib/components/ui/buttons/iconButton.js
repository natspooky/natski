import Button from './button.js';
import Icon from '../icon.js';

export default function IconButton({ name, src, children, ...props }) {
	return Button({
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
