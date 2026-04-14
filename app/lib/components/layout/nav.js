import { className, useState } from '../../../apis/encore/element-creator.js';
import isMobile from '../../../apis/dependencies/mobile-utils.js';
import Icon from '../ui/icon.js';

function Link({ name, src, text, target, href }) {
	const linkHandler = (event) => {
		event.preventDefault();
		window.open(href, target ?? '_self');
	};
	return {
		tag: 'button',
		style: {
			position: 'relative',
			height: '40px',
			width: '40px',
			margin: '5px 7px',
			backgroundColor: 'transparent',
			border: '0px',
		},
		events: {
			click: {
				callback: linkHandler,
				param: 'event',
			},
		},
		children: {
			tag: 'a',
			attributes: {
				tabindex: -1,
				draggable: false,
				href,
			},
			children: [
				Icon({
					name,
					src,
					style: {
						position: 'relative',
						display: 'block',
						margin: 'auto',
						height: '25px',
						width: '25px',
						backgroundColor: 'var(--background)',
					},
				}),
				{
					tag: 'span',
					text,
				},
			],
		},
	};
}

function NavMainBar() {
	return {
		tag: 'div',
		style: {},
		children: Link({
			name: 'NATSKI',
			href: '/',
			style: {
				position: 'relative',
				height: '40px',
				width: '40px',
				margin: '5px',
				'.className icon-system': {
					position: 'relative',
					display: 'block',
					height: '30px',
					width: '30px',
					backgroundColor: 'var(--background)',
				},
			},
		}),
	};
}

function Nav() {
	return {
		tag: 'nav',
		style: isMobile
			? {
					position: 'fixed',
					width: 'calc(100% - 20px)',
					top: '10px',
					left: '10px',
					height: '50px',
					backgroundColor: 'var(--darken)',
					borderRadius: 'var(--border-radius-3)',
					cornerShape: 'var(--border-shape)',
				}
			: {
					position: 'fixed',
					width: 'min(400px, 90%)',
					top: '0',
					left: '50%',
					margin: '30px auto 0px auto',
					height: '50px',
					backgroundColor: 'var(--darken)',
					borderRadius: 'var(--border-radius-max)',
					cornerShape: 'var(--border-shape)',
					transform: 'translateX(-50%)',
				},
		children: [NavMainBar()],
	};
}

export default Nav;
