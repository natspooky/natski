import {
	className,
	useState,
	useSuspense,
	useId,
} from '../../../apis/encore/element-creator.js';

export default function Butt({ classes, events, ...props }) {
	const click = (self) => {
		self.classList.toggle('active');
	};

	return {
		...props,
		tag: 'button',
		classes: className('cool-button', classes),
		events: {
			...events,
			click: [
				{
					callback: click,
					params: 'self',
				},
				events.click,
			],
		},
		children: new Array(3).fill(0).map((_, index) => {
			return { tag: 'span', classes: 'cool-button-inner-' + index + 1 };
		}),
	};
}
