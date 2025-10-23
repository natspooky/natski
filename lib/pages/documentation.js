import { render, useState } from '../../apis/encore/element-creator/ec.js';
import FrameManager from '../js/IFrameManager.js';
import Footer from '../components/footer.js';
import { GlassBacking } from '../components/ui/glass.js';
import IS from '../components/image_components/IS.js';
import LinkButton from '../components/button_components/linkButton.js';
import Button from '../components/button_components/button.js';
import RootLayout from '../layouts/rootLayout.js';
import Selector from '../components/selector.js';
import Header from '../components/header.js';

function encore() {
	return {
		tag: 'p',
		children: {
			tag: 'text',
			text: 'encorePage',
		},
	};
}

function simple() {
	return {
		tag: 'p',
		children: {
			tag: 'text',
			text: 'simplePage',
		},
	};
}

render(
	'root',
	() => {
		window.components.layout = RootLayout;
		return {
			tag: 'section',
			children: [
				useState((view, setView) => {
					return GlassBacking({
						tag: 'div',

						children: [
							{
								tag: 'div',
								attributes: {
									style: 'position: relative',
								},
								children: [
									Button({
										name: 'Encore',
										action: {
											callback: () => setView(encore()),
										},
									}),
									Button({
										name: 'Simple',
										action: {
											callback: () => setView(simple()),
										},
									}),
								],
							},
							view,
						],
					});
				}, encore()),
				{},
			],
		};
	},
	{
		useIcons: true,
	},
);
