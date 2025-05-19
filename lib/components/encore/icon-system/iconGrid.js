import { jsonElementify } from '../../../../api/encore/element-creator/ec.min.js';
import { IS_DATA as data } from '../../../../api/encore/icon-system/dependencies/IS_DATA.js';
import Button from '../../button.js';
import IS from '../../IS.js';

export default function IconGrid() {
	const close = (self) => {
		let container = self.parentNode;

		container.classList.remove('open');

		setTimeout(() => {
			container.remove();
		}, 410);
	};

	const open = (self) => {
		let element = jsonElementify({
			tag: 'div',
			classes: 'icon-selector',
			children: {
				tag: 'section',
				children: [
					Button({
						icon: 'circle_cross',
						action: {
							func: close,
							var: 'self',
						},
					}),
					{
						tag: 'span',
					},
				],
			},
		});

		setTimeout(() => {
			element.classList.add('open');
		}, 20);
	};

	const search = (self) => {
		const grid = self.parentNode.parentNode.children[1],
			value = self.value.toLowerCase();

		Array.from(grid.children).forEach((icon) => {
			if (
				icon.children[0]
					.getAttribute('name')
					.toLowerCase()
					.includes(value)
			) {
				icon.classList.remove('hidden');
			} else {
				icon.classList.add('hidden');
			}
		});
	};

	const select = (self) => {
		self.children[0].focus();
	};

	return {
		tag: 'div',
		classes: 'icon-grid',
		children: [
			{
				tag: 'span',
				events: {
					click: {
						func: select,
						var: 'self',
					},
				},
				children: [
					{
						tag: 'input',
						attributes: {
							type: 'text',
							placeholder: 'search',
						},
						events: {
							input: {
								func: search,
								var: 'self',
							},
						},
					},
					IS({
						icon: 'magnify',
					}),
				],
			},
			{
				tag: 'section',
				children: data.map((icon) => {
					return Button({
						icon: icon,
						action: {
							func: null, //iconData,
							var: 'self',
						},
					});
				}),
			},
		],
	};
}
