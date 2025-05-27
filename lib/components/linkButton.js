import IS from './IS.js';

export default function LinkButton({
	routing,
	icon,
	customIcon,
	name,
	classes,
	parent,
}) {
	const noEmbed = window.location === window.parent.location;

	const link = () => {
		if (routing.subpage) window.parent.frameManager.addHistory();
		window.parent.frameManager.hash = routing.route;
	};

	const linkParent = () => {
		if (routing.subpage) window.frameManager.addHistory();
		window.frameManager.hash = routing.route;
	};

	const linkNoEmbed = () => {
		window.open(`${routing.route}.html?embed=false`, '_self');
	};

	return {
		tag: 'button',
		classes: classes,
		events: {
			click: {
				func:
					parent && noEmbed
						? linkParent
						: noEmbed
						? linkNoEmbed
						: parent
						? linkParent
						: link,
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
