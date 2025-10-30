import { className } from '../../../apis/encore/element-creator.js';
import SimpleCanvas from '../../../apis/simple/simple-canvas.js';
import isMobile from '../../../apis/dependencies/mobile-utils.js';
import IS from '../image_components/IS.js';

function GradientSparkle({ particles, waves }) {
	class Particles {}

	const particleContainer = [];

	return {
		tag: 'span',
		classes: className('gradient-sparkle'),
		children: [
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
