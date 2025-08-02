import Button from '../button_components/button.js';

export default function ReloadButton() {
	const reload = () => {
		window.frameManager.startLoad();
		window.frameManager.frame.contentWindow.location.reload();
	};

	return Button({
		icon: 'undo',
		classes: 'widget widget-button fadeout',
		action: {
			callback: reload,
		},
	});
}
