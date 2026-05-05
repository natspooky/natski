import {
	render,
	useState,
	useSuspense,
} from '../../../apis/encore/element-creator.js';

import DocLayout from '../../layouts/docLayout.js';

render(
	document.body,
	() => {
		window.components.layout = DocLayout;

		return [];
	},
	{
		useIcons: true,
	},
);
