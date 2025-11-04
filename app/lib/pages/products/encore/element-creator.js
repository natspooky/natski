import { render, useState } from '../../../../apis/encore/element-creator.js';
import StandardLayout from '../../../layouts/standardLayout.js';
import Header from '../../../components/header.js';
import { Glass } from '../../../components/ui/glass.js';
import TitlePage from '../../../components/ui/titlePage.js';
import IS from '../../../components/image_components/IS.js';
import Selector from '../../../components/selector.js';

render(
	'root',
	() => {
		window.components.layout = StandardLayout;
		let panelSetter;
		return [
			Header({
				children: TitlePage({
					image: '../../icon/misc/elementcreatorlogo.png',
					title: 'Encore Element Creator',
					description: 'Start creating beautiful frontends with ease',
					buttons: [
						{
							name: 'Element Creator Docs',
							icon: 'export',
						},
						{
							name: 'Information',
							//icon: 'information',
						},
					],
					children: useState(
						(coverPanel, setCoverPanel) => {
							panelSetter = setCoverPanel;
							return coverPanel;
						},
						{
							tag: 'section',
							attributes: {
								hidden: '',
							},
						},
					),
				}),
			}),
			{
				tag: 'main',
				children: [
					Selector({
						buttons: [
							{
								name: 'bungas',
								active: true,
							},
							{
								name: 'scrungle',
							},
						],
					}),
				],
			},
		];
	},
	{
		useIcons: true,
	},
);
