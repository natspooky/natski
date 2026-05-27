import {
	useState,
	createPortal,
	buildComponent,
	useRef,
} from '../../../apis/encore/element-creator.js';

function ProgressBar({ color, style, ...props }) {
	const progressBarRef = useRef(null);
	const progressBarInnerRef = useRef(null);

	const appendHandler = () => {
		let size = 0;

		let interval = setInterval(() => {
			if (size > 100) clearInterval(interval);

			progressBarInnerRef.current.style.transform = `scaleX(${size / 100})`;
			size++;
		}, interval);
	};

	return {
		tag: 'div',
		ref: progressBarRef,
		style: {
			display: 'block',
			...style,
		},
		children: {
			tag: 'span',
			style: {
				position: 'absolute',
				top: '0',
				left: '0',
				height: 'inherit',
				display: 'block',
				width: '100%',
				backgroundColor: color,
			},
		},
		onAppend: {
			callback: appendHandler,
			options: {
				awaitFontLoad: true,
			},
		},
		...props,
	};
}
