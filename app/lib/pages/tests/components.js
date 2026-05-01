import {
	render,
	useState,
	useSuspense,
	useId,
	className,
	checkEvent,
} from '../../../apis/encore/element-creator.js';

import Img from '../../components/ui/img.js';

render(
	'root',
	() => {
		return [
			Img({
				src: 'https://media.4-paws.org/d/2/5/f/d25ff020556e4b5eae747c55576f3b50886c0b90/cut%20cat%20serhio%2002-1813x1811-720x719.jpg',
				height: 400,
				width: 400,
				suspense: true,
				style: {
					backgroundColor: 'grey',
					borderRadius: '50px',
					overflow: 'hidden',
					height: '100px',
					width: '100px',
				},
			}),
			Img({
				src: 'https://media.4-paws.rg/d/2/5/f/d25ff020556e4b5eae747c55576f3b50886c0b90/cut%20cat%20serhio%2002-1813x1811-720x719.jpg',
				height: 400,
				width: 400,
				suspense: true,
				style: {
					backgroundColor: 'grey',
					borderRadius: '50px',
					overflow: 'hidden',
					height: '100px',
					width: '100px',
				},
			}),
		];
	},
	{
		useIcons: true,
	},
);
