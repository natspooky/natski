import { render, useState } from '../../../apis/encore/element-creator.js';
import StandardLayout from '../../layouts/standardLayout.js';
import IS from '../../components/image_components/IS.js';
import Header from '../../components/header.js';

import { Waves } from '../../components/ui/backgrounds.js';

render(
	'root',
	() => {
		window.components.layout = StandardLayout;

		return [
			Header({
				src: 'https://images.unsplash.com/photo-1716467891152-1b43a96de578?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D',
				title: 'Encore Element Creator',
				subtext: 'big big big yummy burga',
				children: [],
			}),
		];
	},
	{
		useIcons: true,
	},
);
