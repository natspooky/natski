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

function NavButton({ href, fn, param, children, style }) {
	return {
		tag: 'button',
		style: {
			position: 'relative',
			border: '0px',
			backgroundColor: 'transparent',
			display: 'inline-block',
			...style,
		},
		events: {
			click: {
				callback:
					fn ??
					((event) => {
						event.preventDefault();
						window.open(href, '_self');
					}),
				param: param ?? 'event',
			},
		},
		children: href
			? {
					tag: 'a',
					style: {
						position: 'relative',
						top: '0',
						left: '0',
						width: '100%',
						height: '100%',
					},
					attributes: {
						tabindex: '-1',
						href,
					},
					children,
				}
			: children,
	};
}

function NavIconButton({ name, fn, param, href }) {
	return NavButton({
		children: Icon({
			name,
			style: {
				position: 'relative',
				display: 'block',
				margin: 'auto',
				height: '25px',
				width: '25px',
				backgroundColor: 'var(--background)',
			},
		}),
		fn,
		param,
		href,
		style: {
			height: '50px',
			width: '30px',
			margin: '0px 15px',
		},
	});
}

function NavTextButton({ fn, param, href, name }) {
	return NavButton({
		children: { tag: 'span', children: name },
		fn,
		param,
		href,
		style: {
			height: '35px',
			padding: '0px 15px',
			backgroundColor: 'var(--accent)',
			borderRadius: 'var(--border-radius-max)',
			cornerShape: 'var(--border-shape)',
		},
	});
}

function NavMainBar() {
	return {
		tag: 'div',
		style: {
			position: 'relative',
			width: '100%',
			height: '50px',

			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		children: [
			NavIconButton({ name: 'ARC', href: '/' }),
			//NavTextButton({ name: 'hello', href: '/' }),
			NavIconButton({ name: 'avatar', href: '/' }),
		],
	};
}

function NavSubSection() {
	return {
		tag: 'section',
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
					borderRadius: 'var(--border-radius-4)',
					cornerShape: 'var(--border-shape)',
					transform: 'translateX(-50%)',
				},
		children: [NavMainBar(), NavSubSection()],
	};
}

export default Nav;
