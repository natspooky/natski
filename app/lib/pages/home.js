import {
	render,
	useState,
	useSuspense,
} from '../../apis/encore/element-creator.js';
import isMobile from '../../apis/dependencies/mobile-utils.js';
import SimpleCanvas from '../../apis/simple/simple-canvas.js';
import standardLayout from '../layouts/standardLayout.js';
import Animator from '../components/layout/animator.js';
import Header from '../components/layout/header.js';
import Section from '../components/layout/section.js';
import Banner from '../components/layout/banner.js';
import Title from '../components/layout/title.js';
import Card from '../components/layout/card.js';

const pageData = [
	{
		name: 'Element Creator',
		icon: 'ENCORE',
		category: 'Encore',
		description: 'desc',
		links: { href: '' },
	},
	{
		name: 'Icon System',
		icon: 'ENCORE',
		category: 'Encore',
		description: 'desc',
		links: { href: '' },
	},
	{
		name: 'Simple Canvas',
		icon: 'simple',
		category: 'Simple',
		description: 'desc',
		links: { href: '' },
	},
	{
		name: 'Lorem Thingy',
		icon: 'simple',
		category: 'Simple',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		links: { href: '' },
	},
];

class Particle {
	#position;
	#size;
	#speed;

	randomize() {
		this.#size = Math.random() * 60 + 20;
		this.#speed = Math.random() * 10 + 3;
	}

	draw() {}
}

function CanvasBG() {
	const canvas = SimpleCanvas.create(
		'#CanvasBG',
		{
			fps: 30,
			autoClear: true,
			autoResize: true,
			setupOnResize: true,
			cursor: {
				active: false,
				global: false,
				passive: true,
				correctTransform: false,
			},
			key: {
				active: false,
				passive: true,
			},
			touch: {
				active: false,
				global: false,
				passive: true,
				correctTransform: true,
			},
			useWheel: false,
			useScroll: false,
			diagnostics: true,
			pauseOnBlur: true,
			useRetina: true,
			canvas: {
				willReadFrequently: false,
				failIfMajorPerformanceCaveat: false,
			},
		},
		'Banner Background',
	);

	const ctx = canvas.context;

	const compSetup = () => {
		ctx.lineWidth = 0.05;
		ctx.scale(
			Math.min(canvas.width, canvas.height),
			Math.min(canvas.width, canvas.height),
		);
		ctx.translate(0.5, 0.5);
		//ctx.rotate((45 * Math.PI) / 180);
	};

	const compResize = (resizeData) => {};

	const compDraw = () => {};

	const compAppend = () => {
		canvas.render();
	};

	canvas.setup(compSetup);
	canvas.resize(compResize);
	canvas.draw(compDraw);
	canvas.append(compAppend);

	return {
		tag: 'div',
		style: {
			position: 'absolute',
			height: '100%',
			width: '100%',
			'.className #CanvasBG': {
				height: '100%',
				width: '100%',
			},
		},
		children: canvas.element,
	};
}

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

function homePageContent() {
	return [
		Animator({
			children: Section({
				children: Title({
					title: lorem(Math.floor(Math.random() * 3 + 3)),
					description: lorem(Math.floor(Math.random() * 10 + 10)),
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
						background: [
							{
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
							//CanvasBG(),
						],
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
							title: lorem(Math.floor(Math.random() * 3 + 2)),
							description: lorem(
								Math.floor(Math.random() * 10 + 10),
							),
						},
						{
							icon: 'hidden',
							title: lorem(Math.floor(Math.random() * 3 + 2)),
							description: lorem(
								Math.floor(Math.random() * 10 + 10),
							),
						},
						{
							icon: 'scanner',
							title: lorem(Math.floor(Math.random() * 3 + 2)),
							description: lorem(
								Math.floor(Math.random() * 10 + 10),
							),
						},
					],
				}),
			}),
		}),
		Animator({
			children: Section({
				children: Header({
					title: lorem(Math.floor(Math.random() * 3 + 2)),
					description: lorem(Math.floor(Math.random() * 20 + 10)),
					chip: lorem(Math.floor(Math.random() * 2 + 1)),
				}),
			}),
		}),
	];
}

render(
	'root',
	() => {
		window.components.layout = standardLayout;

		return useSuspense(() => {
			return homePageContent();
		});
	},
	{
		useIcons: true,
	},
);
