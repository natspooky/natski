import { render, useState } from '../../apis/encore/element-creator.js';

import standardLayout from '../layouts/standardLayout.js';

render(
	'root',
	() => {
		window.components.layout = standardLayout;

		return { tag: 'div' };
	},
	{
		useIcons: true,
	},
);
