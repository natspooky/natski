import {
	className,
	useState,
	useSuspense,
} from '../../../apis/encore/element-creator.js';

export default function Marquee({ children, speed = 1, style }) {
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
		style: {
			position: 'relative',
			width: '100%',
			height: 'fit-content',
			overflow: 'hidden',
			opacity: '0',
			transform: 'translateY(10px)',
			transition: '0.4s cubic-bezier(.47,1.53,.77,1.01)',
			'.animate .className': {
				opacity: '1',
				transform: 'translateY(0px)',
			},
			...style,
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
		onCreate: (self) => {
			container = self;
		},
	};
}
