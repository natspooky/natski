import {
	className,
	usePath,
	useState,
} from '../../apis/encore/element-creator.js';
import isMobile from '../../apis/dependencies/mobile-utils.js';
import Icon from './ui/icon.js';

function Button({ name, icon, classes, href, events }) {
	return {
		events: {
			click: {
				callback: () => {
					window.open(href, '_self');
				},
			},
			...events,
		},
		tag: 'button',
		classes: className(
			'navi-button',
			classes,
			isMobile ? 'icon-only' : null,
		),
		children: [
			name ? { tag: 'span', children: { tag: 'text', text: name } } : {},
			icon ? Icon({ name: icon }) : {},
		],
	};
}

export default function Nav() {
	const pageName = usePath().pathname;

	const linkArray = [
		{
			name: 'Home',
			icon: 'home',
			href: '/home',
		},

		{
			name: 'Docs',
			icon: 'document',
			href: '/docs',
		},
	];

	return {
		tag: 'nav',
		classes: className('navigator', isMobile ? 'nav-mobile' : null),
		children: [
			{
				tag: 'div',
				classes: 'nav-quick-select',
				children: [
					{
						tag: 'section',
						classes: 'nav-section nav-left',
						children: Button({
							icon: 'burger',
							name: 'Natski',
							classes: 'icon-only',
						}),
					},
					{
						tag: 'section',
						classes: 'nav-section nav-center',
						children: linkArray.map((item) => {
							if (
								pageName.slice(
									pageName.lastIndexOf('/') + 1,
								) ===
								item.href.slice(item.href.lastIndexOf('/') + 1)
							)
								return Button({
									...item,
									classes: 'active',
								});
							return Button({ ...item });
						}),
					},
					{
						tag: 'section',
						classes: 'nav-section nav-right',
						children: [
							Button({
								icon: 'magnify',
								classes: 'icon-only',
							}),
						],
					},
				],
			},
		],
	};
}
