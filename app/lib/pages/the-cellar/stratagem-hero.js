import { render } from '../../../apis/encore/element-creator.js';
import SimpleCanvas from '../../../apis/simple/simple-canvas.js';
import GameLayout from '../../layouts/gameLayout.js';
import GamePage from '../../components/layout/game/gamePage.js';

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
				active: false,
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
	});

	canvas.append(canvas.render.bind(canvas));

	return {
		tag: 'div',
		style: {
			height: '100%',
			width: '100%',
			'.game-canvas': {
				width: '100%',
				height: '100%',
				position: 'relative',
			},
		},
		children: [
			canvas.element,
			{
				tag: 'section',
				classes: 'game-ui',
			},
		],
	};
}

function page() {
	window.components.layout = GameLayout;

	return GamePage({
		title: 'Stratagem Hero',
		description: 'based on Helldivers 2',
		gameWindow: GameWindow(),
	});
}

render('root', page, { useIcons: true });
