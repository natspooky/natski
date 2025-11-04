import { render, useState } from '../../../../apis/encore/element-creator.js';
import StandardLayout from '../../../layouts/standardLayout.js';
import Header from '../../../components/header.js';
import { Glass } from '../../../components/ui/glass.js';
import TitlePage from '../../../components/ui/titlePage.js';
import IS from '../../../components/image_components/IS.js';

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
							name: 'Learn Element Creator',
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
		];
	},
	{
		useIcons: true,
	},
);
