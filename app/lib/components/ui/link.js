import { useState, useRef } from '../../../apis/encore/element-creator.js';

function Link({ children, style, href, target }) {
	const linkStorage = useRef(null);

	const linkClickHandler = async (event, href, target) => {
		event.preventDefault();

		const navigateViaJS = href == '/the-cellar' || '/';
		if (navigateViaJS && window.ecPageState) {
			document.title = href
				.replace('/', '')
				.split('-')
				.map((word) => {
					return word.slice(0, 1).toUpperCase() + word.slice(1);
				})
				.join(' ');
			window.history.pushState({}, '', href);

			const link = '/lib/pages' + href.replaceAll('.html', '') + '.js';
			console.log(link);
			const value = await import(link);

			window.ecPageState(value.default());

			console.log(value.default());

			return;
		}

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
				position: 'relative',
				width: '100%',
				height: '100%',
				appearance: 'none',
				textDecoration: 'inherit',
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
