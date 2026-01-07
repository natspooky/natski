import { className } from '../../../apis/encore/element-creator.js';
import Icon from './icon.js';

function Button({ children, classes, ...props }) {
	return {
		...props,
		tag: 'button',
		classes: className('button', classes),
		children,
	};
}

function IconButton({ name, src, children, ...props }) {
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

export { Button, IconButton };
