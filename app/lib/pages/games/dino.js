import { render, useState } from '../../../apis/encore/element-creator.js';
import SimpleCanvas from '../../../apis/simple/simple-canvas.js';
import StandardLayout from '../../layouts/standardLayout.js';

function dinoGame() {
	const canvas = SimpleCanvas.create('#canvas', {
		fps: 60,
		autoClear: true,
		autoResize: true,
		setupOnResize: true,
		useCursor: false,
		useTouch: false,
		useWheel: false,
		useScroll: false,
		useKey: false,
		diagnostics: false,
		detectWindowFocus: true,
		debugConsole: false,
	});
	const ctx = canvas.context;

	const resize = ({ width, height }) => {};

	const append = () => {
		canvas.render();
	};

	const draw = () => {
		canvas.paintAll('red');
	};

	canvas.resize(resize);
	canvas.append(append);
	canvas.draw(draw);

	canvas.element.style.width = '100%';
	canvas.element.style.height = '100vh';

	return canvas.element;
}

render(
	'root',
	() => {
		//window.components.layout = StandardLayout;

		return dinoGame();
	},
	{
		useIcons: true,
	},
);
