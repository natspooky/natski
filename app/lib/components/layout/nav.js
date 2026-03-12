import { className, useState } from '../../../apis/encore/element-creator.js';
import { IconLink } from '../ui/link.js';
import { Button } from '../ui/button.js';
import isMobile from '../../../apis/dependencies/mobile-utils.js';

function Expandable() {}

function NavContents() {
	const buttons = [
		{
			name: 'home',
			icon: 'home',
			dropdown: false,
			href: '/',
		},
	];

	const pathName = new URL(window.location.href).pathname;

	return {
		tag: 'div',
		children: buttons.map(({ name, icon, dropdown, href }) => {
			return dropdown
				? Button()
				: IconLink({
						name,
						icon,
						href,
						style: {},
					});
		}),
	};
}

function Nav() {
	return {
		tag: 'nav',
		style: {
			position: 'fixed',
			width: '400px',
			top: '0',
			left: '50%',
			margin: '30px auto 0px auto',
			height: '50px',
			backgroundColor: 'var(--darken)',
			borderRadius: 'var(--border-radius-4)',
			transform: 'translateX(-50%)',
		},
		children: [NavContents()],
	};
}

export default Nav;
