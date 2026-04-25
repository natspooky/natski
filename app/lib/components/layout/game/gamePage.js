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
			{
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
				},

				children: Embed({
					children: gameWindow,
				}),
			},
		],
	});
}

export default GamePage;
