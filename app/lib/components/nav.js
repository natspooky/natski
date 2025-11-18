import {
	className,
	usePath,
	useState,
} from '../../apis/encore/element-creator.js';
import isMobile from '../../apis/dependencies/mobile-utils.js';
import LinkButton from './button_components/linkButton.js';
//import Button from './button_components/button.js';
import IS from './image_components/IS.js';

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
			icon ? IS({ icon }) : {},
		],
	};
}

export default function Nav() {
	const pageName = usePath();

	let setter;

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
		{
			name: 'Projects',
			icon: 'apps',
			href: 'aa',
		},
	];

	return {
		tag: 'nav',
		events: {
			mouseleave: {
				callback: () => setter(null),
			},
		},
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
									events: {
										mouseenter: {
											callback: () =>
												setter(['a', 1, 1, 1]),
										},
									},
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
			useState((navItems, setNavItems) => {
				setter = setNavItems;
				return {
					tag: 'div',
					classes: 'nav-dropdown',
					children: navItems?.map(() => {
						return { tag: 'text', text: 'aaaaaa1' };
					}),
				};
			}, null),
		],
	};
}

/*



*/
