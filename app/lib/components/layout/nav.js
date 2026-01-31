import { className, useState } from '../../../apis/encore/element-creator.js';
import { IconLink } from '../ui/link.js';

function NavButton(data) {
	const style = {
		position: 'relative',
		'.active': { backgroundColor: 'red' },
	};

	return IconLink({ ...data, style });
}

function LengthOverflowContainer({ children }) {
	return {
		tag: 'div',
		style: {
			overflow: 'hidden',
			width: '100%',
			height: '100%',
			position: 'relative',
		},
		children,
	};
}

function Nav() {
	const buttonData = [{ name: 'bunga' }];

	const pathName = new URL(window.location.href).pathname;

	return {
		tag: 'nav',
		style: {
			position: 'fixed',
			width: '100%',
			height: '60px',
			'::before': {
				content: `''`,
				position: 'absolute',
				width: '100%',
				height: '100%',
			},
		},
		children: LengthOverflowContainer({
			children: buttonData.map((data) => {
				if (data.href === pathName)
					return NavButton({ ...data, classes: 'active' });
				return NavButton(data);
			}),
		}),
	};
}

export default Nav;
