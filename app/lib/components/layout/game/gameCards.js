import Grid from '../grid.js';
import CardContainer from '../cardContainer.js';
import Animator from '../animator.js';
import Link from '../../ui/link.js';

function GameCards({ games }) {
	return Grid({
		columns: 2,
		children: games.map(({ title, description, href }) => {
			return Animator(
				{
					children: CardContainer({
						style: {
							'.await-animate .className': {
								transition:
									'transform 0.4s cubic-bezier(.47,1.53,.77,1.01), opacity 0.4s',
								opacity: '0',
								transform: 'translateY(15px)',
							},
							'.await-animate.animate .className': {
								opacity: '1',
								transform: 'translateY(0px)',
							},
						},
						children: Link({
							href,
							style: {
								width: '100%',
								position: 'relative',
							},
							children: [
								{
									tag: 'h1',
									children: title,
								},
								{
									tag: 'p',
									children: description,
								},
							],
						}),
					}),
				},
				500,
			);
		}),
	});
}

export default GameCards;
