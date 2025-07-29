import { render } from '../../apis/encore/element-creator/ec.js';
import RootLayout from '../layouts/rootLayout.js';

render(
	'root',
	(components) => {
		components.setLayout(RootLayout);

		return {
			tag: 'text',
			text: 'balls',
		};
	},
	{
		useIcons: true,
	},
);
