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
	return {};
}

function ButtonArray() {
	return {};
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
	let marqueeData = [{}, {}];

	const half = Math.floor(marqueeData.length / 2);

	marqueeData = [marqueeData.slice(0, half), marqueeData.slice(half)];

	return [
		{
			tag: 'div',
			children: marqueeData.map((marqData) =>
				marqData.map((data) => MarqueeItem(data)),
			),
		},
		{
			tag: 'p',
			children: 'temp Text',
		},
	];
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
