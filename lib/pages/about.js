import { render } from '../../apis/encore/element-creator/ec.min.js';
import RootLayout from '../layouts/rootLayout.js';

render(
	'root',
	(components) => {
		components.layout = RootLayout;

		return [];
	},
	{
		useIcons: true,
	},
);
