import {
	className,
	useState,
	useSuspense,
} from '../../../apis/encore/element-creator.js';

export default function Marquee({ children, speed = 1, classes }) {
	let container;
	let scroller;

	let position = 0;
	let first = true;
	let counter = 0;

	let animateID;
	let countSetter;

	const animate = () => {
		position += speed;

		if (scroller.offsetWidth / counter < position) position = 0;

		scroller.style.transform = `translateX(-${position}px)`;

		animateID = requestAnimationFrame(animate);
	};

	const resize = () => {
		first = true;
		countSetter(1);
	};

	return useSuspense(() => {
		return {
			tag: 'div',
			events: {
				resize: {
					target: window,
					callback: resize,
				},
			},
			classes: className('marquee', classes),
			children: {
				tag: 'div',
				classes: 'marquee-sub',
				children: useState((count, setCount) => {
					cancelAnimationFrame(animateID);
					counter = count;
					countSetter = setCount;

					return {
						tag: 'section',
						classes: 'marquee-scroller',
						children: new Array(count).fill(0).map(() => {
							return children;
						}),
						onAppend: {
							callback: () => {
								const cWidth = container.offsetWidth;
								const sWidth = scroller.offsetWidth;
								if (cWidth > sWidth || first) {
									first = false;
									setCount(Math.ceil(cWidth / sWidth) + 1);
								} else {
									animate();
								}
							},
							options: {
								awaitFontLoad: true,
							},
						},
						onCreate: (self) => {
							scroller = self;
						},
					};
				}, 1),
			},
			onCreate: (self) => {
				container = self;
			},
		};
	});
}
