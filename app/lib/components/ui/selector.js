import isMobile from '../../../apis/dependencies/mobile-utils.js';
import { useState } from '../../../apis/encore/element-creator.js';
import Icon from '../../components/ui/icon.js';

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

		function Button({ icon, index }) {
			return {
				tag: 'button',
				style: {
					backgroundColor: 'var(--background-sub)',
					border: '0px',
					padding: '10px',
					borderRadius: 'var(--border-radius-max)',
					cursor: 'pointer',
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
			};
		}

		return {
			tag: 'div',
			style: {
				padding: '0 10px',
				fontWeight: '500',
			},
			children: [
				Button({ icon: 'arrow_left', index: -1 }),
				button,
				Button({ icon: 'arrow_right', index: 1 }),
			],
		};
	}

	const buttonArr = [];

	const [state, , setSlider] = useState((get) => {
		return get;
	}, null);
	let slider;

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
					onCreate: (self) => {
						slider = self;
					},
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
				return {
					tag: 'button',
					classes: index === 0 ? 'active' : null,
					style: {
						position: 'relative',
						cursor: 'pointer',
						padding: '0 10px',
						color: 'var(--text-supersub-color)',
						flexShrink: '0',
						flexGrow: '0',
						fontWeight: '500',
						fontSize: 'var(--font-size-3)',
						backgroundColor: 'transparent',
						border: '0px',
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

										slider.style.width = `${self.offsetWidth}px`;
										slider.style.transform = `translate(${self.offsetLeft}px, -50%)`;
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
				};
			}),
		],
	};
}

export default Selector;
