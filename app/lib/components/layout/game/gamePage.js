import {
	useState,
	useRef,
} from '../../../../../apis/encore/element-creator.js';

import Header from '../header.js';
import Embed from '../embed.js';
import Section from '../section.js';
import Animator from '../animator.js';
import Icon from '../../ui/icon.js';

function GamePage({ title, description, gameWindow }) {
	let container = useRef();

	const [iconState, , setIcon] = useState((get) => {
		return Icon({
			name: get ? 'minimise' : 'maximise',
			classes: 'fullscreen-button',
			style: {
				display: 'block',
				backgroundColor: 'var(--text-supersub-color)',
				height: '20px',
				width: '20px',
			},
		});
	}, false);

	return Section({
		children: [
			Animator({
				children: Header({
					chip: 'Games',
					title,
					description,
				}),
			}),
			Animator({
				children: {
					tag: 'div',
					ref: container,

					classes: 'game-container',
					style: {
						position: 'relative',
						backgroundColor: 'var(--background-sub)',
						height: 'min(70vh, 500px)',
						width: '100%',
						borderRadius: 'var(--border-radius-4)',
						cornerShape: 'var(--border-shape)',
						overflow: 'hidden',
						'.await-animate .className': {
							transition:
								'transform 0.4s cubic-bezier(.47,1.53,.77,1.01), opacity 0.4s',
							transformOrigin: 'bottom left',
							opacity: '0',
							transform: 'translateY(15px)',
						},
						'.await-animate.animate .className': {
							opacity: '1',
							transform: 'translateY(0px)',
						},
					},

					children: [
						Embed({
							children: gameWindow,
						}),
						{
							tag: 'button',
							attributes: {
								title: 'fullscreen',
							},
							events: {
								click: {
									callback: () => {
										if (document.fullscreenElement) {
											document.exitFullscreen();
											setIcon(false);
											return;
										}
										container.current.requestFullscreen();
										setIcon(true);
									},
								},
								fullscreenchange: {
									callback: () => {
										if (document.fullscreenElement) {
											setIcon(true);
											return;
										}

										setIcon(false);
									},
									target: document,
								},
							},
							style: {
								cursor: 'pointer',
								position: 'absolute',
								bottom: '10px',
								padding: '10px',
								right: '10px',
								zIndex: '99',
								border: '0px',
								backgroundColor: 'var(--background)',
								borderRadius: 'var(--border-radius-2)',
								cornerShape: 'var(--border-shape)',
								'.className:hover .fullscreen-button': {
									backgroundColor: 'var(--text-color)',
								},
							},
							children: iconState,
						},
					],
				},
			}),
		],
	});
}

export default GamePage;
