import Button from './button.js';

export default function LinkButton({
	routing,
	icon,
	customIcon,
	name,
	classes,
	parent,
	children,
}) {
	const noEmbed = window.location === window.parent.location;

	const link = (ev) => {
		ev.preventDefault();
		if (routing.subpage) window.parent.frameManager.addHistory();
		window.parent.frameManager.hash = routing.route;
	};

	const linkParent = (ev) => {
		ev.preventDefault();
		window.frameManager.hash = routing.route;
		//if (routing.subpage) window.frameManager.addHistory();
	};

	const linkNoEmbed = (ev) => {
		ev.preventDefault();
		window.open(`${routing.route}.html?embed=false`, '_self');
	};

	return Button({
		icon: icon,
		customIcon: customIcon,
		name: name,
		classes: classes,
		children: children,
		href: routing.route,
		action: {
			callback:
				parent && noEmbed
					? linkParent
					: noEmbed
					? linkNoEmbed
					: parent
					? linkParent
					: link,
			param: 'event',
		},
	});
}
