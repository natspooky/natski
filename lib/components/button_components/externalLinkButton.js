import Button from './button.js';

export default function ExternalLinkButton({
	routing,
	icon,
	customIcon,
	name,
	classes,
	children,
}) {
	const link = () => {
		window.open(routing.route, routing.display);
	};

	return Button({
		icon: icon,
		customIcon: customIcon,
		name: name,
		classes: classes,
		children: children,
		action: {
			func: link,
		},
	});
}
