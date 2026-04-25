import Header from '../header.js';
import Embed from '../embed.js';
import Section from '../section.js';
import Animator from '../animator.js';

function GamePage({ title, description, gameWindow }) {
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
					classes: 'game-container',
					style: {
						position: 'relative',
						backgroundColor: 'var(--background-sub)',
						height: 'min(70vh, 500px)',
						width: '100%',
						borderRadius: 'var(--border-radius-4)',
						cornerShape: 'var(--border-shape)',
						overflow: 'hidden',
						opacity: '0',
						transform: 'translateY(15px)',
						transition: '0.4s cubic-bezier(.47,1.53,.77,1.01)',
						transformOrigin: 'bottom left',
						'.animate .className': {
							opacity: '1',
							transform: 'translateY(0px)',
						},
					},

					children: Embed({
						children: gameWindow,
					}),
				},
			}),
		],
	});
}

export default GamePage;
