import { render, useState } from '../../../apis/encore/element-creator.js';
import SimpleCanvas from '../../../apis/simple/simple-canvas.js';

function GameWindow() {
	const canvas = SimpleCanvas.create(
		'.stratagem',
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
		'Stratagem Hero',
	);

	const ctx = canvas.context;

	canvas.setup(() => {
		ctx.translate(canvas.width / 2, canvas.height / 2);
	});
	canvas.resize(() => {});
	canvas.draw(() => {
		canvas.paintAll('red');

		const key = canvas.key;
		if (key.pressing) {
		}
	});

	canvas.append(canvas.render.bind(canvas));

	return {
		tag: 'div',
		style: {
			height: '100vh',
			'.stratagem': {
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
