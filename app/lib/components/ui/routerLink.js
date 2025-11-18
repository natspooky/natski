import {
	className,
	useState,
	useSuspense,
} from '../../../apis/encore/element-creator.js';

export default function RouterLink({
	classes,
	href,
	target,
	icon,
	customIcon,
	name,
	events,
	children,
	...props
}) {
	const routerAttach = (event) => {
		event.preventDefault();
		window.open(href, target ?? '_self');
	};

	return {
		...props,
		tag: 'button',
		classes: className('router-button', classes),
		events: {
			...events,
			click: [
				{
					callback: routerAttach,
					params: 'event',
				},
				events.click,
			],
		},
		children: [
			{
				tag: 'a',
				attributes: {
					tabindex: '-1',
					href,
					draggable: false,
				},
				children,
			},
			icon || customIcon ? IS({ icon, customIcon }) : {},
			name ? { tag: 'text', text: name } : {},
		],
	};
}

function glassButton({}) {
	return Glass({ children: Button({}) });
}
