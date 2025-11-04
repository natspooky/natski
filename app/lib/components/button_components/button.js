import IS from '../image_components/IS.js';
import { className } from '../../../apis/encore/element-creator.js';

function Link({ children, draggable, href }) {
	return {
		tag: 'a',
		attributes: {
			tabindex: '-1',
			href,
			draggable,
		},
		children,
	};
}
/*
export function Button({
	classes,
	href,
	draggable,
	icon,
	customIcon,
	...props
}) {
	//const childElements = children??

	return {
		tag: 'button',
		classes: className('button', classes),
		children: children ?? [
			icon || customIcon ? IS({ icon, customIcon }) : {},
		],
		...props,
	};
}
*/
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
	const buttonInner = children ?? [
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
					children: buttonInner,
					href,
					draggable: false,
			  })
			: buttonInner,
		onCreate,
		onAppend,
	};
}
