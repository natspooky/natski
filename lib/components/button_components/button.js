import IS from '../image_components/IS.js';
import { className } from '../../../apis/encore/element-creator/ec.min.js';

export default function Button({
	action,
	customAction,
	icon,
	customIcon,
	name,
	classes,
	children,
	href,
}) {
	return {
		tag: 'button',
		classes: className('component-button', classes),
		events: {
			click: action,
			...customAction,
		},
		attributes: {
			'aria-label': name ? name : 'icon button',
		},
		children: {
			tag: 'a',
			attributes: {
				href: href,
			},
			children: children
				? children
				: [
						IS({
							icon: icon,
							customIcon: customIcon,
						}),
						name
							? {
									tag: 'p',
									children: {
										tag: 'text',
										text: name,
									},
							  }
							: {
									tag: 'p',
									attributes: {
										style: 'font-size: 0',
									},
									children: {
										tag: 'text',
										text: 'icon button',
									},
							  },
				  ],
		},
	};
}
