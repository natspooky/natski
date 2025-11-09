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

render(
	'root',
	() => {
		return [
			Marquee({
				speed: 1,
				children: {
					tag: 'div',
					attributes: {
						style: 'position:relative;width:10px;height:40px;background:linear-gradient(to right, red, blue, red);border-right:0px solid black;',
					},
				},
			}),
		];
	},
	{
		useIcons: true,
	},
);
