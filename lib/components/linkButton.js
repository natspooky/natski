import IS from './IS.js';

export default function LinkButton({
	routing,
	icon,
	customIcon,
	name,
	classes,
}) {
	const link = () => {
		if (routing.subpage) window.parent.frameManager.incrementSubPage();
		window.parent.frameManager.changeHash(routing.route);
	};

	return {
		tag: 'button',
		classes: classes,
		events: {
			click: {
				func: link,
			},
		},
		children: [
			IS({
				icon: icon,
				customIcon: customIcon,
			}),
			name
				? {
						tag: 'p',
						innerHTML: name,
				  }
				: {
						tag: 'p',
						innerHTML: 'button',
						attributes: {
							style: 'font-size: 0',
						},
				  },
		],
	};
}
