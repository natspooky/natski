import Button from '../button_components/button.js';
import Img from '../image_components/img.js';

function Prev() {
	const rotate = (self) => {};

	return Button({
		icon: 'prev',
		classes: 'widget widget-button',
		action: {
			func: rotate,
			var: 'self',
		},
	});
}

function Play() {
	const rotate = (self) => {};

	return Button({
		icon: 'play',
		classes: 'widget widget-button',
		action: {
			func: rotate,
			var: 'self',
		},
	});
}
function Next() {
	const rotate = (self) => {};

	return Button({
		icon: 'next',
		classes: 'widget widget-button',
		action: {
			func: rotate,
			var: 'self',
		},
	});
}
function Image() {
	const rotate = (self) => {};

	return Img({
		URL: '/icon/misc/kuru/0.png',
		classes: 'widget widget-image',
		draggable: false,
	});
}

export default function Audio() {
	return {
		tag: 'section',
		classes: 'widget widget-image-tools fadeout',
		children: [Prev(), Play(), Next(), Image()],
	};
}
