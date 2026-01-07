import {
	render,
	useState,
	useSuspense,
	useId,
	className,
	checkEvent,
} from '../../../apis/encore/element-creator.js';
import Marquee from '../../components/ui/marquee.js';
import Carousel from '../../components/ui/carousel.js';
import { Selector } from '../../components/ui/selector.js';
import { Modal, ModalButton } from '../../components/ui/modal.js';

render(
	'root',
	() => {
		return [
			Marquee({
				speed: 0.3,
				children: {
					tag: 'div',
					style: {
						position: 'relative',
						width: '100px',
						height: '40px',
						background: 'linear-gradient(to right, red, blue, red)',
					},
				},
			}),
			ModalButton({ modal: Modal({}), children: 'epics' }),
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
