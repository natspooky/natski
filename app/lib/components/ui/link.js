import { useState } from '../../../apis/encore/element-creator.js';

function Link({ children, style, href, target }) {
	const linkClickHandler = async (event, href, target) => {
		event.preventDefault();

		window.open(href, target ?? '_self');
	};

	return {
		tag: 'button',
		events: {
			click: {
				callback: linkClickHandler,
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
