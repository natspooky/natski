import { render, useState } from '../../../apis/encore/element-creator.js';
import SimpleCanvas from '../../../apis/simple/simple-canvas.js';
import GameLayout from '../../layouts/standardLayout.js';
import StandardLayout from '../../ccomponents/';

function GameWindow() {
	const canvas = SimpleCanvas.create(
		'.game-canvas',
		{
			fps: Infinity,
			autoClear: true,
			autoResize: true,
			setupOnResize: true,
			cursor: {
				active: false,
				global: false,
				passive: true,
				correctTransform: true,
			},
			key: {
				active: true,
				passive: false,
			},
			touch: {
				active: false,
				global: false,
				passive: true,
				correctTransform: true,
			},
			useWheel: false,
			useScroll: false,
			diagnostics: true,
			detectWindowFocus: false,
			useRetina: true,
			canvas: {
				willReadFrequently: false,
				failIfMajorPerformanceCaveat: false,
			},
		},
		'Kuru Clicker',
	);

	const ctx = canvas.context;

	canvas.setup(() => {
		ctx.translate(canvas.width / 2, canvas.height / 2);
	});
	canvas.resize(() => {});
	canvas.draw(() => {
		canvas.paintAll('red');
	});

	canvas.append(canvas.render.bind(canvas));

	return {
		tag: 'div',
		style: {
			height: '100vh',
			'.game-canvas': {
				width: '100%',
				height: '100%',
				position: 'relative',
			},
		},
		children: canvas.element,
	};
}

render(
	'root',
	() => {
		return GameWindow();
	},
	{
		useIcons: true,
	},
);
