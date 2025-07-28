import { render } from '../../apis/encore/element-creator/ec.js';
import RootLayout from '../layouts/rootLayout.js';

render(
	'root',
	() => {
		return RootLayout();
	},
	{
		useIcons: true,
	},
);
