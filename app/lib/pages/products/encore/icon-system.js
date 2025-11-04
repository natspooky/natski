import {
	render,
	useSuspense,
} from '../../../../apis/encore/element-creator.js';
import { IS_DATA } from '../../../../apis/encore/dependencies/icon-system/IS_DATA.js';
import StandardLayout from '../../../layouts/standardLayout.js';
import Header from '../../../components/header.js';
import { Glass } from '../../../components/ui/glass.js';
import IS from '../../../components/image_components/IS.js';

function iconGrid() {
	return IS_DATA.map((icon) => {
		return IS({ icon });
	});
}

function Banner() {
	return [
		{
			tag: 'div',
			children: useSuspense(
				() => {
					return {
						tag: 'div',
						classes: 'image-container',
						children: [
							{
								tag: 'div',
								classes: 'colour-wheel',
							},
							{
								tag: 'img',
								attributes: {
									width: 200,
									height: 200,
									draggable: false,
									src: '../../icon/misc/natskilogo.png',
								},
							},
						],
					};
				},
				{
					tag: 'div',
					classes: 'temp-logo',
				},
			),
		},
		{
			tag: 'h1',
			children: {
				tag: 'text',
				text: 'Encore Icon System',
			},
		},
		{
			tag: 'p',
			children: {
				tag: 'text',
				text: 'A lightweight icon library compatible with Element Creator',
			},
		},
		{
			tag: 'span',
			children: [
				Glass({
					tag: 'button',
					hover: true,
					active: true,
					children: {
						tag: 'p',
						children: [
							{
								tag: 'text',
								text: 'Learn Element Creator',
							},
							IS({
								icon: 'export',
							}),
						],
					},
				}),
				Glass({
					tag: 'button',
					hover: true,
					active: true,
					children: {
						tag: 'p',
						children: {
							tag: 'text',
							text: 'API Documentation',
						},
					},
				}),
			],
		},
		IS({
			icon: 'mini_arrow_down',
			classes: 'down-arrow',
		}),
	];
}

render(
	'root',
	() => {
		window.components.layout = StandardLayout;

		return [
			Header({
				children: Banner(),
			}),
			...iconGrid(),
		];
	},
	{
		useIcons: true,
	},
);
