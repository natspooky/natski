import { render, useState, merge } from '../../apis/encore/element-creator.js';
import SimpleCanvas from '../../apis/simple/simple-canvas.js';
import { IS_DATA } from '../../apis/encore/dependencies/icon-system/IS_DATA.js';
import standardLayout from '../layouts/standardLayout.js';
import Animator from '../components/layout/animator.js';
import Header from '../components/layout/header.js';
import Section from '../components/layout/section.js';
import Card from '../components/layout/card.js';
import Marquee from '../components/ui/marquee.js';
import { Link } from '../components/ui/link.js';
import { Img } from '../components/ui/img.js';
import Icon from '../components/ui/icon.js';

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

function Globe() {
	const canvas = SimpleCanvas.create(
		'#globe',
		{
			fps: 30,
			autoClear: true,
			autoResize: true,
			setupOnResize: true,
			cursor: {
				active: false,
				global: false,
				passive: true,
				correctTransform: true,
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
			diagnostics: false,
			pauseOnBlur: false,
			useRetina: false,
			canvas: {
				willReadFrequently: false,
				failIfMajorPerformanceCaveat: false,
			},
		},
		'Globe Graphic',
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
			height: '200px',
			width: '300px',
			border: '1px solid gray',
			'.className #globe': {
				height: '100%',
				width: '100%',
			},
		},
		children: canvas.element,
	};
}

function HomeHeader() {
	return {};
}

function Selector({ buttons }) {
	const buttonArr = [];
	const [state, getSlider, setSlider] = useState((get) => {
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
						height: '70%',
						borderRadius: 'var(--border-radius-4)',
						width: `${buttonArr[0].offsetWidth}px`,
						transform: `translate(${buttonArr[0].offsetLeft}px, -50%)`,
						backgroundColor: 'var(--background-sub)',
						transition: '0.2s',
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
						padding: '0 10px',
						color: 'var(--text-supersub-color)',
						flexShrink: '0',
						flexGrow: '0',
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
								callback: (self) => {
									if (!self.classList.contains('active')) {
										buttonArr.forEach((button) => {
											button.classList.remove('active');
										});
										self.classList.add('active');

										slider.style.width = `${self.offsetWidth}px`;
										slider.style.transform = `translate(${self.offsetLeft}px, -50%)`;
									}
								},
								param: 'self',
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

function BannerSelector() {
	return {
		tag: 'div',
		style: {
			position: 'absolute',
			top: '0',
			left: '50%',
			width: 'fit-content',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: '5px 3px',
			height: '55px',
			borderRadius: '0 0 var(--border-radius-4) var(--border-radius-4)',
			transform: 'translateX(-50%)',
			backgroundColor: 'var(--background)',
			'::before, .className::after': {
				content: `''`,
				position: 'absolute',
				backgroundColor: 'transparent',
				top: '0',
				height: '25px',
				width: '25px',
				overflow: 'hidden',
			},
			'::before': {
				left: '-25px',
				backgroundImage:
					'radial-gradient(circle at 0% 100%, transparent 25px, var(--background) 15px)',
			},
			'::after': {
				right: '-25px',
				backgroundImage:
					'radial-gradient(circle at 100% 100%, transparent 25px, var(--background) 15px)',
			},
		},
		children: [
			Selector({
				buttons: new Array(5).fill(0).map(() => {
					return { name: lorem(1), action: '' };
				}),
			}),
		],
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

function Banner() {
	return {
		tag: 'div',
		style: {
			position: 'relative',
			width: 'calc(100% - 20px)',
			display: 'block',
			margin: '0 auto',
			height: 'auto',
			aspectRatio: '4 / 3',
			maxWidth: '2100px',
			borderRadius: 'var(--border-radius-4)',
			overflow: 'hidden',
			backgroundImage: 'linear-gradient(to top, #fff, #00000030)',
		},
		children: [BannerSelector()],
	};
}

render(
	'root',
	() => {
		window.components.layout = standardLayout;

		return [
			Banner(),
			new Array(10).fill(0).map(() => {
				return Animator({
					children: Section({
						children: Card({
							cards: new Array(3).fill(0).map(() => {
								return {
									icon: IS_DATA.filter((item) => {
										return item.includes('circle');
									})[
										Math.floor(
											Math.random() *
												IS_DATA.filter((item) => {
													return item.includes(
														'circle',
													);
												}).length,
										)
									],
									title:
										lorem(
											Math.floor(Math.random() * 4 + 2),
										) + '.',
									description: lorem(
										Math.floor(Math.random() * 10 + 6),
									),
								};
							}),
						}),
					}),
				});
			}),
			new Array(20).fill(0).map(() => {
				return Animator({
					children: [
						Section({
							children: [
								Header({
									chip: lorem(
										Math.floor(Math.random() * 2 + 1),
									),
									title: lorem(
										Math.floor(Math.random() * 4 + 3),
									),
									description: lorem(
										Math.floor(Math.random() * 30 + 10),
									),
								}),
							],
						}),
					],
				});
			}),
		];
	},
	{
		useIcons: true,
	},
);
