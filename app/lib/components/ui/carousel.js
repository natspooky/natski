import {
	className,
	useState,
	useSuspense,
	useId,
} from '../../../apis/encore/element-creator.js';

function CarouselButton() {}

export default function Carousel({ slides, classes }) {
	const carouselID = useId();

	let scroller;
	let firstPage;

	let timer;

	const mouseDown = (event) => {};
	const mouseMove = (event) => {};
	const mouseUp = (event) => {};

	if (slides.length === 1) slides = new Array(2).fill(slides[0]);

	return {
		tag: 'div',
		classes: className('carousel', classes),
		children: [
			{
				tag: 'div',
				children: {
					tag: 'section',
					classes: 'carousel-scroller',
					events: {
						mousedown: {
							callback: mouseDown,
						},
						mousemove: {
							callback: mouseMove,
							target: window,
						},
						mouseup: {
							callback: mouseUp,
							target: window,
						},
					},
					onCreate: (self) => {
						scroller = self;
					},
					children:
						slides &&
						slides.map((slide, index) => {
							return {
								tag: 'div',
								children: slide,

								onCreate:
									index === 0
										? (self) => {
												firstPage = self;
										  }
										: null,
							};
						}),
				},
			},
			{
				tag: 'div',
				classes: 'control-bar',
			},
		],
	};
}
