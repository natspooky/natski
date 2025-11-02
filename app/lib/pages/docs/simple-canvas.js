import { render, useState } from '../../../apis/encore/element-creator.js';

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

export const metadata = { icon: 'boob' };
