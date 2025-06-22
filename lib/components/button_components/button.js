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
								innerHTML: name,
						  }
						: {
								tag: 'p',
								innerHTML: 'icon button',
								attributes: {
									style: 'font-size: 0',
								},
						  },
			  ],
	};
}
