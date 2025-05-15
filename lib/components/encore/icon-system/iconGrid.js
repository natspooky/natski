import { IS_DATA as data } from '../../../../api/encore/icon-system/dependencies/IS_DATA.js';
import Button from '../../button.js';

export default function IconGrid() {
	const action = (self) => {};

	return {
		tag: 'div',
		classes: 'icon-grid',
		children: [
			{
				tag: 'span',
				children: [
					{
						tag: 'input',
					},
				],
			},
			{
				tag: 'section',
				children: data.map((icon) => {
					return Button({
						icon: icon,
						action: {
							func: action,
							var: 'self',
						},
					});
				}),
			},
		],
	};
}
