import { className } from '../../../../apis/encore/element-creator.js';

export default function Button({ children, classes, ...props }) {
	return {
		...props,
		tag: 'button',
		classes: className('button', classes),
		children,
	};
}
