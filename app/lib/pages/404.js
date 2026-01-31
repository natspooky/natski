import { render } from '../../apis/encore/element-creator.js';
import StandardLayout from '../layouts/standardLayout.js';
import { Link } from '../components/ui/link.js';

function Page() {
	return [Link({ name: 'Return home' })];
}

render(
	'root',
	() => {
		window.components.layout = StandardLayout;

		return Page();
	},
	{
		useIcons: true,
	},
);
