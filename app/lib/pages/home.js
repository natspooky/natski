import { render, useState } from '../../apis/encore/element-creator.js';

import { GlassBacking, Glass } from '../components/ui/glass.js';

import StandardLayout from '../layouts/standardLayout.js';
import Selector from '../components/selector.js';

function testUseState() {
	return {
		tag: 'div',
	};
}

render(
	'root',
	() => {
		window.components.layout = StandardLayout;

		return [testUseState()];
	},
	{
		useIcons: true,
	},
);
