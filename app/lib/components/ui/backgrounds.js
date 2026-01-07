import { className, useId } from '../../../apis/encore/element-creator.js';
import Canvas from './canvas.js';
import isMobile from '../../../apis/dependencies/mobile-utils.js';

function GradientSparkle({ particles, waves }) {
	const canvasID = useId();

	class Particles {
		#speed;
		#position;
		constructor(height) {
			this.#speed = Math.random() * 9;
			this.#position = {
				x: 0,
				y: Math.random() * height,
			};
		}

		draw() {
			this.#position.x += this.#speed;
		}

		get position() {
			return this.#position;
		}
	}

	const particleContainer = [];

	const draw = ({ constext: ctx, canvas }) => {};
	const append = () => {};
	const resize = () => {};
	const setup = () => {};

	return {
		tag: 'span',
		classes: className('gradient-sparkle'),
		children: [
			particles && false
				? Canvas({
						name: canvasID,
						draw,
						append,
						resize,
						setup,
						settings: {
							fps: 30,
							diagnostics: true,
						},
						classes: 'sparkle-canvas',
						//events,
				  })
				: {},
			waves
				? {
						tag: 'span',
						classes: 'grad-wave-container',
						children: [
							{
								tag: 'span',
								classes: 'grad-wave wave-front',
							},
							{
								tag: 'span',
								classes: 'grad-wave wave-back',
							},
						],
				  }
				: {},
		],
	};
}

function Waves() {
	return {
		tag: 'span',
		classes: 'grad-wave-container',
		children: [
			{
				tag: 'span',
				classes: 'grad-wave wave-front',
			},
			{
				tag: 'span',
				classes: 'grad-wave wave-back',
			},
		],
	};
}

function DottedFade() {}

export { GradientSparkle, Waves };
