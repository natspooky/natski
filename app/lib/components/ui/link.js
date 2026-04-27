import { useState } from '../../../apis/encore/element-creator.js';

const linkHandler = (event, href, target) => {
	event.preventDefault();
	if(window.components.)
	window.open(href, target ?? '_self');
};

function Link({ children, style, href, target }) {
	return {
		tag: 'button',
		events: {
			click: {
				callback: linkHandler,
				param: ['event', href, target],
			},
		},
		style: {
			...style,
		},
		children: {
			tag: 'a',
			style: {
				appearance: 'none',
				textDecoration: 'none',
				position: 'relative',
			},
			attributes: {
				tabindex: '-1',
				draggable: false,
				href,
			},
			children,
		},
	};
}

export { Link };
