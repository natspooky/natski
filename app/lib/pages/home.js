import {
	render,
	useState,
	className,
	useSuspense,
} from '../../apis/encore/element-creator.js';

import standardLayout from '../layouts/standardLayout.js';

import Marquee from '../components/ui/marquee.js';
import IconLink from '../components/ui/buttons/iconLink.js';
import Img from '../components/ui/img.js';

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
	return { tag: 'div' };
}

function ButtonArray() {
	return { tag: 'div' };
}

function MarqueeItem({ src, colour }) {
	return {
		tag: 'div',
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
		},
		{
			src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Python_logo_01.svg/640px-Python_logo_01.svg.png',
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

function HomeHeader() {
	return Flex({
		classes: 'wrap',
		children: [
			Flex({
				classes: 'column',
				children: [
					MarqueeCard({}),
					Flex({
						children: ButtonArray(),
					}),
				],
			}),
			GitHubTile({}),
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
