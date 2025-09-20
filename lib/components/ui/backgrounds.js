import { className } from '../../../apis/encore/element-creator/ec.js';
import SimpleCanvas from '../../../apis/simple-canvas/sc.min.js';
import isMobile from '../../../apis/dependencies/mobile-utils/mu.min.js';
import IS from '../image_components/IS.js';

function GradientSparkle({ particles, waves }) {
	class Particles {}

	let canvas;
	let context;

	const particleContainer = [];

	const loadCanvas = (self) => {
		canvas = new SimpleCanvas(self, {
			autoClear: true,
			useCursor: false,
			detectResize: true,
			detectWindowFocus: true,
			positionLayerData: true,
			showLayerPosition: true,
			calculateOverlay: true,
			calculateFPS: true,
			fps: 60,
		});
		context = canvas.context;

		canvas.draw(() => {});
	};

	return {
		tag: 'span',
		classes: className('gradient-sparkle'),
		children: [
			particles
				? {
						tag: 'canvas',
						onAppend: {
							callback: loadCanvas,
							options: {
								awaitContentLoad: true,
							},
						},
				  }
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
