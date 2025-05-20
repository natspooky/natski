import IS from './IS.js';

export default function LinkButton({
	routing,
	icon,
	customIcon,
	name,
	classes,
	parent,
}) {
	const link = () => {
		if (routing.subpage) window.parent.frameManager.addHistory();
		window.parent.frameManager.hash = routing.route;
	};

	const linkParent = () => {
		if (routing.subpage) window.frameManager.addHistory();
		window.frameManager.hash = routing.route;
	};

	return {
		tag: 'button',
		classes: classes,
		events: {
			click: {
				func: parent ? linkParent : link,
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
