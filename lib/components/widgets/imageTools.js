import Button from '../button_components/button.js';

function Rotate() {
	const rotate = (self) => {};

	return Button({
		icon: 'rotate',
		classes: 'widget widget-button',
		action: {
			callback: rotate,
			var: 'self',
		},
	});
}

function Zoom() {
	const rotate = (self) => {};

	return Button({
		icon: 'magnify_plus',
		classes: 'widget widget-button',
		action: {
			callback: rotate,
			var: 'self',
		},
	});
}

function Shrink() {
	const rotate = (self) => {};

	return Button({
		icon: 'magnify_minus',
		classes: 'widget widget-button',
		action: {
			callback: rotate,
			var: 'self',
		},
	});
}

function Download() {
	const rotate = (self) => {};

	return Button({
		icon: 'download',
		classes: 'widget widget-button',
		action: {
			callback: rotate,
			var: 'self',
		},
	});
}

export default function ImageTools() {
	return {
		tag: 'section',
		classes: 'widget widget-image-tools fadeout',
		children: [Rotate(), Shrink(), Zoom(), Download()],
	};
}
