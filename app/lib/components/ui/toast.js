import {
	useState,
	createPortal,
	buildComponent,
	useRef,
} from '../../../apis/encore/element-creator.js';
import Icon from './icon.js';
import ProgressBar from './progressBar.js';

function Toast({ children, icon, title, timer = 1000, style, ...props }) {
	const toastRef = useRef(null);

	let mouseDown = false;

	const mouseDownHandler = () => {
		mouseDown = true;
	};

	const mouseUpHandler = () => {
		mouseDown = false;
	};

	const mouseMoveHandler = () => {
		if (!mouseDown) return;
	};

	const mouseLeaveHandler = () => {};

	const appendHandler = () => {};

	createPortal(
		buildComponent({
			tag: 'div',
			ref: toastRef,
			events: {
				mousedown: {
					callback: mouseDownHandler,
				},
				mouseup: {
					callback: mouseUpHandler,
				},
				mousemove: {
					callback: mouseMoveHandler,
				},
				mouseleave: {
					callback: mouseLeaveHandler,
					target: document.body,
				},
			},
			style: {
				position: 'fixed',
				...style,
			},
			onAppend: {
				callback: appendHandler,
				options: {
					awaitFontLoad: true,
				},
			},
			children: [
				ProgressBar({}),
				{
					tag: 'div',
					children: [
						Icon({ name: icon }),
						{
							tag: 'h1',
							children: title,
						},
					],
				},
				children,
			],
			...props,
		}),
	);

	return null;
}

export default Toast;
