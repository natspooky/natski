import Button from './button.js';

export default function LinkButton({
	routing,
	icon,
	customIcon,
	name,
	classes,
	children,
}) {
	const link = (ev) => {
		ev.preventDefault();
		window.open(routing.href, routing.display);
	};

	return Button({
		icon: icon,
		customIcon: customIcon,
		name: name,
		classes: classes,
		children: children,
		href: routing.href,
		action: {
			callback: link,
			param: 'event',
		},
	});
}
