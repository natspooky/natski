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

	const animate = () => {
		position += speed;

		if (scroller.offsetWidth / counter < position) position = 0;

		scroller.style.transform = `translateX(-${position}px)`;

		animateID = requestAnimationFrame(animate);
	};

	const [state, , setCounter] = useState((count, setCount) => {
		cancelAnimationFrame(animateID);
		counter = count;

		return {
			tag: 'section',
			classes: 'marquee-scroller',
			style: {
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'row',
				width: 'fit-content',
				height: 'fit-content',
			},
			children: new Array(count).fill(0).map(() => children),
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
				options: { awaitFontLoad: true },
			},
			onCreate: (self) => (scroller = self),
		};
	}, 1);

	return useSuspense(() => {
		return {
			tag: 'div',
			events: {
				resize: {
					target: window,
					callback: () => {
						first = true;
						setCounter(1);
					},
				},
			},
			classes: className('marquee', classes),
			style: {
				position: 'relative',
				backgroundColor: 'aliceblue',
				width: '70%',
				height: 'fit-content',
				overflow: 'hidden',
			},
			children: {
				tag: 'div',
				classes: 'marquee-sub',
				style: {
					position: 'relative',
					width: '100%',
					height: '100%',
					overflow: 'hidden',
				},
				children: state,
			},
			onCreate: (self) => (container = self),
		};
	});
}
