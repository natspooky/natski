import Button from '../button.js';

export default function BackButton() {
	const close = () => {
		window.frameManager.loadHistory();
	};

	return Button({
		icon: 'circle_arrow_left',
		classes: 'widget widget-button fadeout',
		action: {
			func: close,
		},
	});
}
