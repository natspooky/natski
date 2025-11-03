import { render } from '../../apis/encore/element-creator.js';
import StandardLayout from '../layouts/standardLayout.js';

function link({ href }) {
	return {
		tag: 'a',

		attributes: {
			href: '/tests/' + href,
		},
		children: {
			tag: 'text',
			text: href.split('-').join(' '),
		},
	};
}

render(
	'root',
	() => {
		window.components.rootLayout = StandardLayout;
		return [
			link({ href: 'simple-canvas' }),
			link({ href: 'element-creator' }),
		];
	},
	{
		useIcons: true,
	},
);
