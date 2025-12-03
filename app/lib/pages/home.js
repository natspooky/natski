import { render, className } from '../../apis/encore/element-creator.js';
import standardLayout from '../layouts/standardLayout.js';
import Marquee from '../components/ui/marquee.js';
import Link from '../components/ui/buttons/link.js';
import Img from '../components/ui/img.js';
import Icon from '../components/ui/icon.js';

function Flex({ children, classes }) {
	return {
		tag: 'div',
		classes: className('flex-container', classes),
		children,
	};
}

function Grid({ children, classes }) {
	return {
		tag: 'div',
		classes: className('grid-container', classes),
		children,
	};
}

function GitHubTile() {
	return {
		tag: 'div',
		classes: 'github-tile',
	};
}

function ButtonArray() {
	const childEl = ({ icon, name }) => {
		return [
			{
				tag: 'span',
				children: name,
			},
			Icon({ name: icon }),
		];
	};

	const buttonData = [
		{
			href: '/products/encore',
			icon: 'ENCORE',
			name: 'Encore',
			colour: 'blue',
		},
		{
			href: '/products/simple',
			icon: 'simple',
			name: 'Simple',
			colour: 'yellow',
		},
		{ href: '/products/arc', icon: 'ARC', name: 'Arc', colour: 'red' },
	];

	return buttonData.map(({ name, icon, href, colour }) =>
		Link({
			children: childEl({ icon, name }),
			href,
			classes: 'button-array-button',
			attributes: {
				style: `--bg-colour: ${colour}`,
			},
		}),
	);
}

function MarqueeItem({ src, colour }) {
	return {
		tag: 'div',
		classes: 'marquee-item',
		attributes: {
			style: `--bg-colour: ${colour}`,
		},
		children: Img({
			src,
			width: 40,
			height: 40,
		}),
	};
}

function MarqueeCard() {
	const marqueeData = [
		{
			src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Python_logo_01.svg/640px-Python_logo_01.svg.png',
			colour: 'blue',
		},
		{
			src: 'https://www.pngmart.com/files/22/Symbol-Logo-PNG-Image.png',
			colour: 'black',
		},
		{
			src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Python_logo_01.svg/640px-Python_logo_01.svg.png',
			colour: 'blue',
		},
		{
			src: 'https://www.pngmart.com/files/22/Symbol-Logo-PNG-Image.png',
			colour: 'black',
		},
	];

	const half = Math.floor(marqueeData.length / 2);

	return {
		tag: 'div',
		classes: 'marquee-card',
		children: [
			{
				tag: 'div',
				classes: 'marquee-container',
				children: [
					marqueeData.slice(0, half),
					marqueeData.slice(half),
				].map((marqData) =>
					Marquee({
						speed: 0.1,
						children: {
							tag: 'div',
							classes: 'marquee-contents',
							children: marqData.map((data) => MarqueeItem(data)),
						},
					}),
				),
			},
			{
				tag: 'span',
				children: 'temp Text',
			},
		],
	};
}

function InfoBar() {
	return {};
}

function HomeHeader() {
	return Flex({
		classes: 'gap-1',
		children: [
			InfoBar(),
			Flex({
				classes: 'wrap gap-1 home-header',
				children: [
					Flex({
						classes: 'column gap-1 grow',
						children: [
							MarqueeCard({}),
							Flex({
								classes: 'gap-1',
								children: ButtonArray(),
							}),
						],
					}),
					GitHubTile({}),
				],
			}),
		],
	});
}

render(
	'root',
	() => {
		window.components.layout = standardLayout;

		return [HomeHeader()];
	},
	{
		useIcons: true,
	},
);
