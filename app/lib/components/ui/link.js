import { useState } from '../../../apis/encore/element-creator.js';

const linkHandler = (event, href, target) => {
	event.preventDefault();

	if (window.components.state) {
		return;
	}

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
			appearance: 'none',
			border: '0px',
			backgroundColor: 'transparent',
			textDecoration: 'none',
			cursor: 'pointer',
			...style,
		},
		children: {
			tag: 'a',
			style: {
				appearance: 'none',
				textDecoration: 'inherit',
				position: 'relative',
				color: 'inherit',
				fontWeight: 'inherit',
				fontSize: 'inherit',
				':visited': {
					appearance: 'none',
					textDecoration: 'none',
				},
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

export default Link;
