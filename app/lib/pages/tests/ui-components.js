import {
	render,
	useState,
	useSuspense,
	useId,
	className,
	checkEvent,
} from '../../../apis/encore/element-creator.js';

import { Glass, GlassBacking } from '../../components/ui/glass.js';
import { GradientSparkle } from '../../components/ui/backgrounds.js';
import Marquee from '../../components/ui/marquee.js';
import Carousel from '../../components/ui/carousel.js';

render(
	'root',
	() => {
		return [
			Marquee({
				speed: 0.2,
				children: {
					tag: 'div',
					attributes: {
						style: 'position:relative;width:10px;height:40px;background:linear-gradient(to right, red, blue, red);border-right:0px solid black;',
					},
				},
			}),
			Carousel({
				slides: [
					{
						tag: 'div',
						classes: 'ball',
					},
				],
			}),
		];
	},
	{
		useIcons: true,
	},
);
