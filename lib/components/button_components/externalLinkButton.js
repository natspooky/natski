import Button from './button.js';

export default function ExternalLinkButton({
	routing,
	icon,
	customIcon,
	name,
	classes,
	children,
}) {
	const link = (ev) => {
		ev.preventDefault();
		window.open(routing.route, routing.display);
	};

	return Button({
		icon: icon,
		customIcon: customIcon,
		name: name,
		href: routing.route,
		classes: classes,
		children: children,
		action: {
			callback: link,
			param: 'event',
		},
	});
}
