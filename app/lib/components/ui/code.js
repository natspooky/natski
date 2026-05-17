import { useState, useRef } from '../../../apis/encore/element-creator.js';
import Button from './button.js';
import Icon from './icon.js';

function Code({ children, style, copy = true }) {
	const codeRef = useRef(null);
	const timerRef = useRef(null);

	const copyHandler = (codeRef) => {
		clearTimeout(timerRef.current);

		navigator.clipboard.writeText(codeRef.current.innerText);

		setButtonIcon('checkmark');

		timerRef.current = setTimeout(() => {
			setButtonIcon('copy');
		}, 2000);
	};

	const [buttonIcon, , setButtonIcon] = useState((name) => {
		return Icon({
			name,
			style: {
				backgroundColor: 'var(--darken-text-color)',
				height: '50%',
				width: '50%',
				display: 'block',
			},
		});
	}, 'copy');

	return {
		tag: 'div',
		style: {
			maxWidth: '100%',
			width: 'fit-content',
			padding: '10px',
			borderRadius: 'var(--border-radius-2)',
			cornerShape: 'var(--border-shape)',
			backgroundColor: 'var(--darken)',
			color: 'var(--darken-text-color)',
			display: 'flex',
		},
		children: [
			{
				tag: 'pre',
				style: {
					userSelect: 'none',
					maxWidth: 'inherit',
					flexGrow: '0',
					flexShrink: '1',
					width: 'fit-content',
					height: 'fit-content',
					overflowX: 'auto',
					...style,
				},
				children: {
					tag: 'code',
					ref: codeRef,
					children,
				},
			},
			copy
				? {
						tag: 'div',
						style: {
							height: '100%',
							flexGrow: '1',
							paddingLeft: '10px',
						},
						children: Button({
							events: {
								click: {
									callback: copyHandler,
									param: codeRef,
								},
							},
							style: {
								height: '30px',
								width: '30px',
								display: 'block',
							},
							children: buttonIcon,
						}),
					}
				: null,
		],
	};
}

export default Code;
