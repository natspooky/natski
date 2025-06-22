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

	return Button({
		icon: icon,
		customIcon: customIcon,
		name: name,
		classes: classes,
		children: children,
		action: {
			func:
				parent && noEmbed
					? linkParent
					: noEmbed
					? linkNoEmbed
					: parent
					? linkParent
					: link,
		},
	});
}
