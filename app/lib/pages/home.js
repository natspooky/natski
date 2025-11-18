import { render, useState } from '../../apis/encore/element-creator.js';

import Nav from '../components/nav.js';

import standardLayout from '../layouts/standardLayout.js';
import Selector from '../components/selector.js';

function headerLinkCard() {}

function infoPanel() {
	return {
		tag: 'div',
		children: {},
	};
}

render(
	'root',
	() => {
		window.components.layout = standardLayout;

		return {};
	},
	{
		useIcons: true,
	},
);
