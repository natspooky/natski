import {
	useRef,
	useNavigate,
	usePageState,
} from '../../../apis/encore/element-creator.js';

function Link({ children, style, href, target, attributes, ...props }) {
	const { preload, navigate, storage } = useNavigate('/lib/pages');

	let preloaded = !!storage[href];
	let hoverTimer = useRef(null);

	const linkRef = useRef(null);

	const linkHoverStartHandler = (remover) => {
		if (preloaded) {
			remover();
			return;
		}
		hoverTimer.current = setTimeout(async () => {
			await preload({ to: href });
			preloaded = true;
			linkRef.current.classList.add('link-loaded');
		}, 250);
	};

	const linkHoverEndHandler = (remover) => {
		clearTimeout(hoverTimer.current);
		if (preloaded) remover();
	};

	const linkClickHandler = async (event, href, target) => {
		event.preventDefault();
		clearTimeout(hoverTimer.current);
		await navigate({ to: href, target });
	};

	return usePageState(({ url }) => {
		return {
			tag: 'a',
			ref: linkRef,
			classes: url.pathname === href ? 'current' : null,
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
				position: 'relative',
				appearance: 'none',
				color: 'inherit',
				':visited': {
					appearance: 'none',
					textDecoration: 'none',
				},
				border: '0px',
				backgroundColor: 'transparent',
				textDecoration: 'none',
				cursor: 'pointer',
				...style,
			},
			attributes: {
				draggable: false,
				href,
				...attributes,
			},
			children,
			...props,
		};
	});
}

export default Link;
