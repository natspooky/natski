import Grid from '../grid.js';
import CardContainer from '../cardContainer.js';
import Animator from '../animator.js';

function GameCards({ games }) {
	return Grid({
		columns: 2,
		children: games.map(({ title, description }) => {
			return Animator({
				children: CardContainer({
					children: {},
					style: {
						opacity: '0',
						transform: 'translateY(15px)',
						transition: '0.4s cubic-bezier(.47,1.53,.77,1.01)',
						'.animate .className': {
							opacity: '1',
							transform: 'translateY(0px)',
						},
					},
				}),
			});
		}),
	});
}

export default GameCards;
