import Button from '../button.js';

export function ImageResize() {
	return {
		tag: 'section',
		children: [Rotate(), Shrink(), Zoom()],
		classes: 'widget widget-container fadeout',
	};
}

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

export function Zoom() {
	const rotate = (self) => {};

	return Button({
		icon: 'magnify_plus',
		classes: 'widget widget-button fadeout',
		action: {
			func: rotate,
			var: 'self',
		},
	});
}

export function Shrink() {
	const rotate = (self) => {};

	return Button({
		icon: 'play', //'magnify_minus',
		classes: 'widget widget-button fadeout',
		action: {
			func: rotate,
			var: 'self',
		},
	});
}

export function Download() {
	const rotate = (self) => {};

	return Button({
		icon: 'battery_half',
		classes: 'widget widget-button fadeout',
		action: {
			func: rotate,
			var: 'self',
		},
	});
}
