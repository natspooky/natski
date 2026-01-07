import { render, useState } from '../../../apis/encore/element-creator.js';

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
		attributes: {
			style: 'width: fit-content; height: fit-content',
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
		attributes: {
			style: 'display: flex; width: 100%; height: 100%; align-items: center; justify-content: center',
		},
		children: {
			tag: 'div',

			attributes: {
				style: 'display: flex; width: min(600px, 90%); height: min(600px,90%); flex-wrap: wrap; align-items: center; justify-content: center',
			},
			children: state,
		},
	};
}

render(
	'root',
	() => {
		return Garden(195);
	},
	{
		useIcons: true,
	},
);
