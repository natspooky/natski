import { render, useState } from '../../../apis/encore/element-creator.js';

import GameLayout from '../../layouts/gameLayout.js';
import GamePage from '../../components/layout/game/gamePage.js';

const emoji = ['🌻', '🌷', '🌹', '🌸', '🌺', '🌼', '🌿', '🌾', '🍀', '☘️'];

const randomEmoji = (getter) => {
	const emoj = emoji[Math.floor(Math.random() * emoji.length)];

	if (!getter) return emoj;
	if (emoj == getter) return randomEmoji(getter);
	return emoj;
};

function HoverFlower() {
	let canChange = true;

	const [state, getState, setState] = useState((getter) => getter, '🟫');

	return {
		tag: 'h1',
		style: {
			width: 'fit-content',
			height: 'fit-content',
			display: 'block',
		},
		events: {
			mouseenter: {
				callback: () => {
					if (canChange) {
						setState(randomEmoji(getState()));
						canChange = false;
					}
				},
			},
			mouseleave: {
				callback: () => {
					canChange = true;
				},
			},
		},
		children: state,
	};
}

function Garden(num) {
	const [state] = useState((getter) => {
		return new Array(getter).fill(0).map(HoverFlower);
	}, num);

	return {
		tag: 'div',
		style: {
			position: 'relative',
			height: '100%',
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexWrap: 'wrap',
		},
		children: state,
	};
}

function page() {
	window.components.layout = GameLayout;

	return GamePage({
		title: 'Garden',
		description: 'Balls',
		gameWindow: Garden(100),
	});
}

render(document.body, page, { useIcons: true });
