import { render, useState } from '../../apis/encore/element-creator/ec.js';
import FrameManager from '../js/IFrameManager.js';
import Footer from '../components/footer.js';
import IS from '../components/image_components/IS.js';
import LinkButton from '../components/button_components/linkButton.js';
import Button from '../components/button_components/button.js';
import RootLayout from '../layouts/rootLayout.js';
import Selector from '../components/selector.js';
import Header from '../components/header.js';

render(
	'root',
	() => {
		window.components.layout = RootLayout;
		return [
			{
				tag: 'p',
				children: {
					tag: 'text',
					text: 'useState test!',
				},
			},
			useState((getNum, setNum) => {
				return {
					tag: 'button',
					events: {
						touchstart: { callback: () => {} },
						click: {
							callback: () => {
								setNum(getNum + 1);
							},
						},
					},
					children: {
						tag: 'text',
						text: `balls: ${getNum}`,
					},
				};
			}, 0),
		];
	},
	{
		useIcons: true,
		useConsole: true,
	},
);
