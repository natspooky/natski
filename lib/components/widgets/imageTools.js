import Button from '../button.js';

export function Rotate() {
	const rotate = (self) => {};

	return Button({
		icon: 'rotate',
		classes: 'widget widget-button fadeout',
		action: {
			func: rotate,
			var: 'self',
		},
	});
}
