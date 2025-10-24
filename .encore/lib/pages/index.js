import { render, useState } from '../../apis/encore/element-creator/ec.js';

import { GlassBacking, Glass } from '../components/ui/glass.js';

import RootLayout from '../layouts/rootLayout.js';
import Selector from '../components/selector.js';

function encore() {
	return Glass({
		tag: 'p',
		children: {
			tag: 'text',
			text: 'balls',
		},
	});
}

function simple() {
	return {
		tag: 'p',
		children: {
			tag: 'text',
			text: 'simplePage',
		},
	};
}

function toolsSelectorPanel() {
	var setPageState;
	return [
		Selector({
			buttons: [
				{
					name: 'Encore',
					icon: 'ENCORE',
					action: {
						callback: () => setPageState(encore()),
					},
					active: true,
				},
				{
					name: 'Simple',
					icon: 'simple',
					action: {
						callback: () => setPageState(simple()),
					},
				},
				{
					name: 'Arc',
					icon: 'ARC',
					action: {
						callback: () => setPageState(encore()),
					},
				},
			],
		}),
		GlassBacking({
			tag: 'div',
			hover: true,
			children: useState((page, setPage) => {
				setPageState = setPage;

				return page;
			}, encore()),
		}),
	];
}

render(
	'root',
	() => {
		window.components.layout = RootLayout;

		return toolsSelectorPanel();
	},
	{
		useIcons: true,
	},
);
