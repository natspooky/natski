import {
	render,
	useState,
	useSuspense,
} from '../../../apis/encore/element-creator.js';

import DocLayout from '../../layouts/docLayout.js';

render(
	'root',
	() => {
		window.components.layout = DocLayout;

		return [];
	},
	{
		useIcons: true,
	},
);
