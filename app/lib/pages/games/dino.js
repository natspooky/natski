import { render, useState } from '../../../apis/encore/element-creator.js';
import Canvas from '../../components/canvas.js';
import StandardLayout from '../../layouts/standardLayout.js';

class canvasObj {
	constructor({ width, height }) {}
}

class canvasEnemy extends canvasObj {}

class cactus extends canvasEnemy {}

class bird extends canvasEnemy {}

class dino extends canvasObj {}

function dinoGame() {
	const append = () => {};

	const draw = ({ canvas: cnv, context: ctx }) => {
		cnv.paintAll('white');

		const key = cnv.keyboard;

		if (key.pressing && key.keys[' ']) {
		}
	};

	const resize = () => {};

	const setup = () => {};

	return Canvas({
		name: 'Dino Game',
		draw,
		append,
		resize,
		setup,
		settings: {
			fps: 60,
			key: {
				active: true,
				passive: false,
			},
			diagnostics: true,
			detectWindowFocus: false,
			useRetina: false,
			size: {
				width: 800,
				height: 500,
			},
		},
		classes: 'dino-game-player',
	});
}

render(
	'root',
	() => {
		window.components.layout = StandardLayout;

		return dinoGame();
	},
	{
		useIcons: true,
	},
);
