import IS from '../image_components/IS.js';
import { className } from '../../../apis/encore/element-creator/ec.min.js';

function Link({ children, draggable, href }) {
	return {
		tag: 'a',
		attributes: {
			href,
			draggable,
		},
		children,
	};
}

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
	const buttonInnards = children ?? [
		icon || customIcon
			? IS({
					icon,
					customIcon,
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
						text: ariaLabel ?? 'unnamed button',
					},
			  },
	];

	return {
		tag: 'button',
		classes: className('button', classes),
		events: {
			click: action,
			...customAction,
		},
		attributes: {
			'aria-label': (ariaLabel || name) ?? 'unnamed button',
		},
		children: href
			? Link({
					children: buttonInnards,
					href,
					draggable: false,
			  })
			: buttonInnards,
		onCreate,
		onAppend,
	};
}
