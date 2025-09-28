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
					tag: 'div',

					children: [
						Selector({
							buttons: [
								{
									action: {
										callback: () =>
											setNum({ tag: 'button' }),
									},
									icon: 'ENCORE',
									name: getNum,
									active: getNum == 0 ? true : false,
								},
								{
									action: { callback: () => setNum(1) },
									icon: 'ENCORE',
									name: 'burger',
									active: getNum == 1 ? true : false,
								},
								{
									action: { callback: () => setNum(2) },
									icon: 'ENCORE',
									name: 'burger',
									active: getNum == 2 ? true : false,
								},
							],
						}),
						{
							tag: 'button',
							events: {
								click: {
									callback: () => {
										setNum(getNum + 1);
									},
								},
							},
							children: {
								tag: 'text',
								text: `number: ${getNum}`,
							},
						},
					],
				};
			}, []),
		];
	},
	{
		useIcons: true,

		useConsole: true,
	},
);
