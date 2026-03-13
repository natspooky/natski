import { IS_DATA } from '../../../apis/encore/dependencies/icon-system/IS_DATA.js';
import {
	render,
	useState,
	useSuspense,
	useId,
	className,
	checkEvent,
} from '../../../apis/encore/element-creator.js';

import Icon from '../../components/ui/icon.js';

render(
	'root',
	() => {
		return IS_DATA.map((icon) => {
			return Icon({
				name: icon,
				style: {
					position: 'relative',
					display: 'inline-block',
					margin: '5px',
					height: '40px',
					width: '40px',
					backgroundColor: 'var(--text-color)',
				},
			});
		});
	},
	{
		useIcons: true,
	},
);
