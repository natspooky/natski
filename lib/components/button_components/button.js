import IS from '../image_components/IS.js';
import { className } from '../../../apis/encore/element-creator/ec.min.js';

export default function Button({
	action,
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
								innerHTML: 'button',
								attributes: {
									style: 'font-size: 0',
								},
						  },
			  ],
	};
}
