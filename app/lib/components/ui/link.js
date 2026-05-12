import {
	useState,
	useRef,
	useNavigate,
} from '../../../apis/encore/element-creator.js';

function Link({ children, style, href, target }) {
	const { preload, navigate, storage } = useNavigate('/lib/pages');

	let preloaded = !!storage[href];
	let hoverTimer = useRef(null);

	const link = useRef(null);

	const linkHoverStartHandler = (remover) => {
		if (preloaded) {
			remover();
			return;
		}
		hoverTimer.current = setTimeout(async () => {
			await preload({ to: href });
			preloaded = true;
			link.current.classList.add('link-loaded');
		}, 250);
	};

	const linkHoverEndHandler = (remover) => {
		clearTimeout(hoverTimer.current);
		if (preloaded) remover();
	};

	const linkClickHandler = async (event, href, target) => {
		event.preventDefault();
		await navigate({ to: href, target });
	};

	return {
		tag: 'button',
		ref: link,
		classes: preloaded ? 'link-loaded' : '',
		events: {
			click: {
				callback: linkClickHandler,
				param: ['event', href, target],
			},
			mouseover: {
				callback: linkHoverStartHandler,
				param: 'remover',
			},
			mouseout: {
				callback: linkHoverEndHandler,
				param: 'remover',
			},
		},
		style: {
			appearance: 'none',
			border: '0px',
			backgroundColor: 'transparent',
			textDecoration: 'none',
			cursor: 'pointer',
			'.className.link-loaded': {
				border: '1px solid red',
			},
			...style,
		},
		children: {
			tag: 'a',
			style: {
				position: 'relative',
				width: '100%',
				height: '100%',
				appearance: 'none',
				textDecoration: 'inherit',
				color: 'inherit',
				fontWeight: 'inherit',
				fontSize: 'inherit',
				':visited': {
					appearance: 'none',
					textDecoration: 'none',
				},
			},
			attributes: {
				tabindex: '-1',
				draggable: false,
				href,
			},
			children,
		},
	};
}

export default Link;
