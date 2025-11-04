import { className, useId } from '../../../apis/encore/element-creator.js';
import Canvas from '../canvas.js';
import isMobile from '../../../apis/dependencies/mobile-utils.js';
import IS from '../image_components/IS.js';

function GradientSparkle({ particles, waves }) {
	const canvasID = useId();

	class Particles {
		#position;
		constructor() {}

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
			particles
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

function DottedFade() {}

export { GradientSparkle };
