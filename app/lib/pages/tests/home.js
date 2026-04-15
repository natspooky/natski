import { render } from '../../../apis/encore/element-creator.js';
//import isMobile from '../../../apis/dependencies/mobile-utils.js';
//import SimpleCanvas from '../../../apis/simple/simple-canvas.js';
import { IS_DATA } from '../../../apis/encore/dependencies/icon-system/IS_DATA.js';
import standardLayout from '../../layouts/standardLayout.js';
import Animator from '../../components/layout/animator.js';
import Header from '../../components/layout/header.js';
import Section from '../../components/layout/section.js';
import Banner from '../../components/layout/banner.js';
import Title from '../../components/layout/title.js';
import Card from '../../components/layout/card.js';
import CardContainer from '../../components/layout/cardContainer.js';
import Grid from '../../components/layout/grid.js';
import Icon from '../../components/ui/icon.js';

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

function IS() {
	return IS_DATA[Math.floor(Math.random() * (IS_DATA.length - 1))];
}

function random(base, mult) {
	return Math.floor(Math.random() * mult + base);
}

function IconArray({ icons }) {
	return {
		tag: 'section',
		style: {
			position: 'relative',
			width: '100%',
			height: 'fit-content',
			display: 'flex',
			justifyContent: 'center',
			gap: '25px',
			padding: '10px 0 0 0',
		},
		children: icons.map((icon) => {
			return Icon({
				name: icon,
				style: {
					position: 'relative',
					display: 'block',
					height: '30px',
					width: '30px',
					backgroundColor: 'var(--text-color)',
					opacity: '0.5',
					transition: '0.2s',
					':hover': {
						opacity: '1',
					},
				},
			});
		}),
	};
}

function HomeTestPage() {
	return [
		Section({
			children: Title({
				title: lorem(random(3, 3)),
				description: lorem(random(10, 10)),
				buttons: [
					{ name: lorem(random(1, 1)), href: '/home' },
					{ name: lorem(random(1, 1)) },
				],
			}),
		}),

		Section({
			children: IconArray({ icons: new Array(5).fill(0).map(IS) }),
		}),

		Banner({
			buttons: [
				{ name: lorem(random(1, 1)) },
				{ name: lorem(random(1, 1)) },
				{ name: lorem(random(1, 1)) },
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
				},
			},
		}),
		Animator({
			children: Section({
				children: Card({
					cards: [
						{
							icon: IS(),
							title: lorem(random(2, 3)),
							description: lorem(random(10, 10)),
						},
						{
							icon: IS(),
							title: lorem(random(2, 3)),
							description: lorem(random(10, 10)),
						},
						{
							icon: IS(),
							title: lorem(random(2, 3)),
							description: lorem(random(10, 10)),
						},
					],
				}),
			}),
		}),

		Section({
			children: Grid({
				columns: 2,
				children: [
					CardContainer({ children: lorem(40, 100) }),
					CardContainer({ children: lorem(4, 4) }),
					CardContainer({ children: lorem(40, 100) }),
					CardContainer({ children: lorem(4, 4) }),
				],
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

function page() {
	window.components.layout = standardLayout;

	return HomeTestPage();
}

render('root', page, { useIcons: true });
