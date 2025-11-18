import {
	className,
	useState,
	useSuspense,
} from '../../../apis/encore/element-creator.js';

export default function Marquee({ children, classes, speed }) {
	let scroller;
	let container;

	let position = 0;
	let first = true;
	let counter = 0;

	let animateID;

	const animate = () => {
		position += speed;

		if (scroller.offsetWidth / counter < position) position = 0;

		scroller.style.marginLeft = `-${position}px`;

		animateID = requestAnimationFrame(animate);
	};

	return useSuspense(
		() => {
			return useState((count, setCount) => {
				cancelAnimationFrame(animateID);

				return {
					tag: 'div',
					classes: className('marquee', classes),
					children: {
						tag: 'div',
						classes: 'marquee-sub',
						children: {
							tag: 'section',
							classes: 'marquee-scroller',
							children: new Array(count).fill(0).map(() => {
								return children;
							}),
							onCreate: (self) => {
								scroller = self;
							},
						},
					},
					onCreate: (self) => {
						container = self;
					},
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
				};
			}, 1);
		},
		{
			tag: 'div',
			attributes: {
				hidden: '',
			},
		},
	);
	// fix where the usestate is so it doesnt suck!!
	ssssss;
}
