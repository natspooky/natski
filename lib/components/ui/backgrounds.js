import { className } from '../../../apis/encore/element-creator/ec.js';
import isMobile from '../../../apis/dependencies/mobile-utils/mu.min.js';
import IS from '../image_components/IS.js';

function GradientSparkle() {
	return {
		tag: 'span',
		classes: className('gradient-sparkle'),
		children: [
			{
				tag: 'canvas',
			},
			{
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
			},
		],
	};
}

function DottedFade() {}

export { GradientSparkle };
