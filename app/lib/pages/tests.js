import { render } from '../../apis/encore/element-creator.js';
import StandardLayout from '../layouts/standardLayout.js';
import { Link } from '../components/ui/link.js';

function link({ href }) {
	return Link({
		href: '/tests/' + href,
		children: href.split('-').join(' '),
	});
}

render(
	'root',
	() => {
		window.components.layout = StandardLayout;
		return [
			link({ href: 'simple-canvas' }),
			link({ href: 'element-creator' }),
			link({ href: 'ui-components' }),
		];
	},
	{
		useIcons: true,
	},
);
