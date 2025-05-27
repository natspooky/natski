import LinkButton from '../linkButton.js';

export default function CloseButton() {
	return LinkButton({
		icon: 'circle_cross',
		classes: 'widget widget-button fadeout',
		routing: {
			subpage: false,
			route: '#/',
		},
		parent: true,
	});
}
