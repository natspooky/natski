import { render } from '../../../../apis/encore/element-creator.js';
import RootLayout from '../../../layouts/rootLayout.js';
import IS from '../../../components/image_components/IS.js';

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
