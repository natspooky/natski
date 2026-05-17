import isMobile from '../../../apis/dependencies/mobile-utils.js';
import { useState, useRef } from '../../../apis/encore/element-creator.js';
import Icon from '../../components/ui/icon.js';
import Button from '../../components/ui/button.js';

function Selector({ buttons, setter }) {
	if (isMobile) {
		const [button, , setButton] = useState((get) => {
			return {
				tag: 'span',
				style: {
					margin: 'auto 15px',
					display: 'inline-block',
					textAlign: 'center',
					width: '100px',
				},
				children: get,
			};
		}, buttons[0].name);

		let buttonIndex = 0;

		const changePage = (value) => {
			buttonIndex += value;
			if (buttonIndex > buttons.length - 1) buttonIndex = 0;
			if (buttonIndex < 0) buttonIndex = buttons.length - 1;
			setButton(buttons[buttonIndex].name);
			setter(buttons[buttonIndex].data);
		};

		function directionButton({ icon, index }) {
			return Button({
				style: {
					backgroundColor: 'var(--background-sub)',
					padding: '10px',
					borderRadius: 'var(--border-radius-max)',
					transform: 'scale(1)',
					transition:
						'transform 0.4s cubic-bezier(.47,1.53,.77,1.01)',
					':active': {
						transform: 'scale(0.85)',
					},
				},
				events: {
					click: {
						callback: changePage,
						param: index,
					},
				},
				children: Icon({
					name: icon,
					style: {
						display: 'block',
						height: 'var(--font-size-3)',
						width: 'var(--font-size-3)',
						backgroundColor: 'var(--text-sub-color)',
					},
				}),
			});
		}

		return {
			tag: 'div',
			style: {
				padding: '0 10px',
				fontWeight: '500',
			},
			children: [
				directionButton({ icon: 'arrow_left', index: -1 }),
				button,
				directionButton({ icon: 'arrow_right', index: 1 }),
			],
		};
	}

	const buttonArr = [];

	const [state, , setSlider] = useState((get) => {
		return get;
	}, null);

	const slider = useRef();

	return {
		tag: 'div',
		style: {
			display: 'flex',
			padding: '0 10px',
		},
		onAppend: {
			callback: () => {
				setSlider({
					tag: 'span',
					ref: slider,
					style: {
						position: 'absolute',
						left: '0',
						top: '50%',
						height: '35px',
						borderRadius: 'var(--border-radius-4)',
						width: `${buttonArr[0].offsetWidth}px`,
						transform: `translate(${buttonArr[0].offsetLeft}px, -50%)`,
						backgroundColor: 'var(--background-sub)',
						transition: '0.3s cubic-bezier(.47,1.30,.77,1.01)',
					},
				});
			},
			options: {
				awaitFontLoad: true,
			},
		},
		children: [
			state,
			buttons.map(({ name, action }, index) => {
				return Button({
					classes: index === 0 ? 'active' : null,
					style: {
						position: 'relative',
						padding: '0 10px',
						color: 'var(--text-supersub-color)',
						flexShrink: '0',
						flexGrow: '0',
						fontWeight: '500',
						fontSize: 'var(--font-size-3)',
						backgroundColor: 'transparent',
						transition: '0.2s',
						'.className.active, .className:hover': {
							color: 'var(--text-color)',
						},
					},
					events: {
						click: [
							{
								callback: (self, index) => {
									if (!self.classList.contains('active')) {
										buttonArr.forEach((button) => {
											button.classList.remove('active');
										});
										self.classList.add('active');

										slider.current.style.width = `${self.offsetWidth}px`;
										slider.current.style.transform = `translate(${self.offsetLeft}px, -50%)`;
										setter(buttons[index].data);
									}
								},
								param: ['self', index],
							},
							action,
						],
					},
					children: name,
					onCreate: (self) => {
						buttonArr.push(self);
					},
				});
			}),
		],
	};
}

export default Selector;
