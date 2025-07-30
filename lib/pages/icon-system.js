import { render } from '../../apis/encore/element-creator/ec.min.js';
import IconGrid from '../components/encore/icon-system/iconGrid.js';
import RootLayout from '../layouts/rootLayout.js';

render(
	'root',
	(components, postRender) => {
		components.setLayout(RootLayout);

		return IconGrid();
	},
	{
		useIcons: true,
	},
);
