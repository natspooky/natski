import { render } from '../../apis/encore/element-creator.js';

import StandardLayout from '../layouts/standardLayout.js';
import Animator from '../components/layout/animator.js';
import Section from '../components/layout/section.js';
import Title from '../components/layout/title.js';
import Card from '../components/layout/card.js';
import GameCards from '../components/layout/game/gameCards.js';

function GamesPageContent() {
	return [
		Animator({
			children: Section({
				children: Title({
					title: 'The Cellar',
					description: 'A collection of embeddable web games.',
				}),
			}),
		}),

		Animator(
			{
				children: Section({
					children: Card({
						cards: [
							{
								icon: 'chain',
								title: 'Easy Embed.',
								description:
									'Each game has been created to allow for easy embbeding into any webpage, allowing for cross-site play.',
							},
							{
								icon: 'phone',
								title: 'Mobile friendly.',
								description:
									'All games are compatable to work with both pc and mobile users in mind, allowing for on the go fun.',
							},
							{
								icon: 'heart',
								title: 'Made with love.',
								description:
									'Using the Encore and Simple APIs, each game has been lovingly crafted to help you have a little more fun.',
							},
						],
					}),
				}),
			},
			400,
		),
		Section({
			children: GameCards({
				games: [
					{
						title: 'Kuru Clicker',
						description: 'kuru clicker description',
						href: '/games/kuru-clicker',
					},
				],
			}),
		}),
	];
}

function Page() {
	window.components.layout = StandardLayout;

	return GamesPageContent();
}

export default Page;

render('root', Page, { useIcons: true });
