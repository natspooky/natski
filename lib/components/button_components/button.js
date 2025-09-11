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
	ariaLabel,
	onCreate,
	onAppend,
}) {
	return {
		tag: 'button',
		classes: className('component-button', classes),
		events: {
			click: action,
			...customAction,
		},
		attributes: {
			'aria-label': (name || ariaLabel) ?? 'unnamed button',
		},
		children: {
			tag: 'a',
			attributes: {
				href: href,
				draggable: false,
			},
			children: children ?? [
				icon || customIcon
					? IS({
							icon: icon,
							customIcon: customIcon,
					  })
					: {},
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
		onCreate,
		onAppend,
	};
}
