import {
	useRef,
	useSuspense,
	merge,
} from '../../../apis/encore/element-creator.js';
import isMobile from '../../../apis/dependencies/mobile-utils.js';
import Button from '../ui/button.js';
import Icon from '../ui/icon.js';

function Window({
	type,
	scalable,
	height,
	width,
	boundry,
	draggable,
	closable,
	closed,
	collapsable,
	children,
	style,
	title = 'New window',
}) {
	const barRef = useRef(null);
	const windowRef = useRef(null);
	const contentRef = useRef(null);

	const appendHandler = (self) => {
		self.classList.add('open');
	};

	const mac = type === 'mac';

	const macStyle = {
		borderRadius: mac ? '20px' : '8px',
		border: mac ? '0px' : '1px solid grey',
		backgroundColor: '#ffffffc6',
		boxShadow: '0px 5px 10px #00000020',
		filter: 'blur(0px)',
		backdropFilter: 'blur(15px)',
		':focus,.className.no-drag': {
			boxShadow: '0px 5px 10px #00000030',
			backgroundColor: '#ffffffd7',
		},
		':focus .window-bar,.className.no-drag .window-bar': {
			filter: 'contrast(1)',
		},
	};

	const windowsStyle = {
		borderRadius: '8px',
		border: '1px solid #44444470',
		boxShadow: '0px 10px 10px #00000010',
		':focus,.className.no-drag': {
			boxShadow: '0px 10px 10px #00000030',
		},
		':focus .window-bar,.className.no-drag .window-bar': {
			filter: 'blur(0px) contrast(1)',
		},
	};

	return {
		tag: 'div',
		ref: windowRef,
		classes: draggable ? null : 'no-drag',
		attributes: {
			tabindex: '0',
		},
		events: {
			click: {
				callback: (self) => self.focus(),
				param: 'self',
			},
		},

		style: merge(
			{
				position: 'absolute',
				transformOrigin: 'center',
				overflow: 'hidden',
				//minWidth: '200px',
				maxWidth: width ?? '90vw',
				//minHeight: '120px',
				maxHeight: height ?? '90vh',
				':focus': {
					outline: '0px',
					zIndex: '99',
				},
				opacity: '0',
				scale: '0.8',
				transition: '0.2s scale, 0.1s opacity',
				'.className.open': {
					transition: '0.3s scale, 0.3s opacity',
					opacity: '1',
					scale: '1',
				},
			},
			mac ? macStyle : windowsStyle,
			style,
		),
		onAppend: {
			callback: appendHandler,
			options: {
				awaitFontLoad: true,
			},
		},
		children: [
			WindowBar({
				barRef,
				windowRef,
				contentRef,
				mac,
				title,
				draggable,
				closable,
				collapsable,
			}),
			WindowContent({ contentRef, children, mac, closed }),
			scalable ? [] : null,
		],
	};
}

function WindowsButton({ icon, clickHandler }, index) {
	const isExit = index === 2;

	return {
		tag: 'span',
		classes: 'window-button',
		events: {
			click: {
				callback: clickHandler,
				param: ['event', 'parent'],
			},
		},
		style: {
			position: 'relative',
			height: '100%',
			width: '45px',
			flexShrink: '0',
			flexGrow: '0',
			display: 'flex',
			justifyContent: 'center',
			cursor: 'pointer',
			alignItems: 'center',
			transition: '0.1s',
			':hover': {
				backgroundColor: isExit ? '#ff0000' : '#ffffff20',
			},
			':hover:active, .className:active': {
				transition: '0s',
				backgroundColor: isExit ? '#ff000090' : '#ffffff40',
			},
		},
		children: Icon({
			name: icon,
			style: {
				height: '13px',
				width: '13px',
				display: 'block',
				backgroundColor: 'white',
				pointerEvents: 'none',
			},
		}),
	};
}

function MacButton({ icon, clickHandler }, index) {
	const colors = ['#00CA4E', '#FFBD44', '#FF605C'];

	return {
		tag: 'span',
		classes: 'window-button',
		events: {
			click: {
				callback: clickHandler,
				param: ['event', 'parent'],
			},
		},
		style: {
			backgroundColor: colors[index],
			position: 'relative',
			borderRadius: '100vmax',
			flexShrink: '0',
			cursor: 'pointer',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '18px',
			width: '18px',
			':hover icon-system': {
				opacity: '1',
			},
		},
		children: Icon({
			name: icon,
			style: {
				height: '45%',
				width: '45%',
				display: 'block',
				backgroundColor: 'black',
				opacity: '0',
				pointerEvents: 'none',
			},
		}),
	};
}

function WindowBar({
	mac,
	barRef,
	windowRef,
	title,
	draggable,
	closable,
	collapsable,
	contentRef,
}) {
	const macStyle = {
		justifyContent: 'start',
		height: 'auto',
		padding: '12px',
		gap: '10px',
		flexDirection: 'row-reverse',
		filter: 'contrast(0.4)',
	};

	const windowsStyle = {
		justifyContent: 'end',
		backgroundColor: '#44444490',
		filter: 'blur(0px) contrast(0.6)',
		backdropFilter: 'blur(15px)',
		height: '35px',
	};

	const doubleClickHandler = () => {
		contentRef.current.classList.toggle('closed');
	};

	const fullscreenHandler = (event) => {
		event.preventDefault();
		contentRef.current.classList.remove('closed');
	};

	const exitHander = (event, parent) => {
		event.preventDefault();
		parent.parentNode.classList.remove('open');
		setTimeout(() => {
			parent.parentNode.remove();
		}, 300);
	};

	const minimiseHandler = (event) => {
		event.preventDefault();
		contentRef.current.classList.add('closed');
	};

	const buttonLayout = [
		{
			icon: 'minus',
			clickHandler: collapsable && !isMobile ? minimiseHandler : null,
		},
		{
			icon: 'maximise',
			clickHandler: collapsable && !isMobile ? fullscreenHandler : null,
		},
		{
			icon: 'cross',
			clickHandler: closable && !isMobile ? exitHander : null,
		},
	];

	const windowsButtons = buttonLayout.map(WindowsButton);

	const macButtons = buttonLayout.map(MacButton);

	let pressing = false;
	let removed = false;

	let startPos = { x: 0, y: 0 };

	let transformPos = { x: 0, y: 0 };

	const mouseDownHandler = (event) => {
		if (event.target.classList.contains('window-button')) return;
		pressing = true;

		startPos.x = event.clientX - transformPos.x;
		startPos.y = event.clientY - transformPos.y;
	};

	const exitHandler = (remover) => {
		if (removed) {
			remover();
			return;
		}
		pressing = false;
	};

	const mouseMoveHandler = (event, self, remover) => {
		if (!self) {
			removed = true;
			remover();
			return;
		}

		if (!pressing) return;
		event.preventDefault();

		const x = event.clientX - startPos.x;
		const y = event.clientY - startPos.y;

		transformPos.x = x;
		transformPos.y = y;

		windowRef.current.style.translate = `${x}px ${y}px`;
	};

	return {
		tag: 'div',
		classes: 'window-bar',
		ref: barRef,
		events: draggable
			? {
					mousedown: {
						callback: mouseDownHandler,
						param: 'event',
					},
					mouseup: {
						callback: exitHandler,
						target: document,
						param: 'remover',
					},
					blur: {
						callback: exitHandler,
						target: window,
						param: 'remover',
					},
					mousemove: {
						callback: mouseMoveHandler,
						target: document.body,
						param: ['event', 'self', 'remover'],
					},
				}
			: null,
		style: {
			position: 'relative',
			width: '100%',
			height: '35px',
			display: 'flex',
			alignItems: 'center',

			...(mac ? macStyle : windowsStyle),
		},
		children: [
			title
				? {
						tag: 'span',
						classes: 'window-title',
						style: {
							fontFamily: 'system-ui',
							color: mac ? 'black' : 'white',
							textAlign: 'left',
							fontWeight: mac ? '700' : '400',
							flexGrow: '1',
							padding: '0 12px',
							fontSize: '15px',
							whiteSpace: 'nowrap',
						},
						children: title,
					}
				: null,
			mac ? macButtons : windowsButtons,
		],
	};
}

function WindowContent({ contentRef, mac, children, closed }) {
	return {
		tag: 'div',
		ref: contentRef,
		classes: closed ? 'closed' : null,
		style: {
			width: '100%',
			height: 'auto',
			position: 'relative',
			overflowX: 'hidden',
			maxHeight: 'inherit',
			overflowY: 'auto',
			backgroundColor: mac ? null : 'white',
			'.className.closed': {
				display: 'none',
			},
		},
		children: useSuspense(() => {
			return children ?? [];
		}),
	};
}

export default Window;
