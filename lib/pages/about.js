import { render } from '../../apis/encore/element-creator/ec.js';
import RootLayout from '../layouts/rootLayout.js';

import IS from '../components/image_components/IS.js';

render(
	'root',
	() => {
		return IS({ icon: 'eee' });
	},
	{
		useIcons: true,
	},
);
