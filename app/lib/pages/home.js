import { render, useSuspense } from '../../apis/encore/element-creator.js';
import isMobile from '../../apis/dependencies/mobile-utils.js';
import SimpleCanvas from '../../apis/simple/simple-canvas.js';
import standardLayout from '../layouts/standardLayout.js';
import Animator from '../components/layout/animator.js';
import Header from '../components/layout/header.js';
import Section from '../components/layout/section.js';
import Banner from '../components/layout/banner.js';
import Title from '../components/layout/title.js';
import Card from '../components/layout/card.js';

function lorem(range) {
	function shuffle(array) {
		let currentIndex = array.length;
		while (currentIndex != 0) {
			let randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	}
	return shuffle(
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'.split(
			' ',
		),
	)
		.slice(0, range)
		.join(' ')
		.toLowerCase()
		.replaceAll(/\.|,/g, '');
}

function random(base, mult) {
	return Math.floor(Math.random() * mult + base);
}

function homePageContent() {
	return [
		Animator({
			children: Section({
				children: Title({
					title: lorem(random(3, 3)),
					description: lorem(random(10, 10)),
				}),
			}),
		}),
		Animator(
			{
				children: Banner(
					{
						buttons: [
							{ name: 'Encore' },
							{ name: 'Simple' },
							{ name: 'Misc' },
						],
						background: {
							tag: 'div',
							style: {
								position: 'absolute',
								top: '0',
								left: '0',
								width: '100%',
								height: '100%',
								opacity: '0.5',
								backgroundImage:
									'linear-gradient(to bottom right, var(--PDS), var(--SSC), var(--VPS))',
								maskImage:
									'linear-gradient(to right, transparent 2px, black 2px 30px), linear-gradient(to bottom, transparent 2px, black 2px 30px)',
								maskSize: '50px 50px',
								maskPosition: 'center center',
							},
						},
					},
					{
						tag: 'span',
						style: { top: '50px' },
						children: 'loading',
					},
				),
			},
			500,
		),
		Animator({
			children: Section({
				children: Card({
					cards: [
						{
							icon: 'chain',
							title: lorem(random(2, 3)),
							description: lorem(random(10, 10)),
						},
						{
							icon: 'chain',
							title: lorem(random(2, 3)),
							description: lorem(random(10, 10)),
						},
						{
							icon: 'chain',
							title: lorem(random(2, 3)),
							description: lorem(random(10, 10)),
						},
					],
				}),
			}),
		}),
		Animator({
			children: Section({
				children: Header({
					title: lorem(random(2, 3)),
					description: lorem(random(10, 20)),
					chip: lorem(random(1, 2)),
				}),
			}),
		}),
	];
}

render(
	'root',
	() => {
		window.components.layout = standardLayout;

		return homePageContent();
	},
	{
		useIcons: true,
	},
);
