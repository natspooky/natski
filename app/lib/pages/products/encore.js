import { render, useState } from '../../../apis/encore/element-creator.js';
import StandardLayout from '../../layouts/standardLayout.js';
import IS from '../../components/image_components/IS.js';
import Header from '../../components/header.js';

import TitlePage from '../../components/ui/titlePage.js';

render(
	'root',
	() => {
		window.components.layout = StandardLayout;

		let panelSetter;

		return [
			Header({
				children: [],
			}),
		];
	},
	{
		useIcons: true,
	},
);
