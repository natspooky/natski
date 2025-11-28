import { render } from '../../../../apis/encore/element-creator.js';
import RootLayout from '../../../layouts/rootLayout.js';

render(
	'root',
	() => {
		window.components.layout = RootLayout;
		return [];
	},
	{
		useIcons: true,
	},
);
