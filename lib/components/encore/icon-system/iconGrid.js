import { IS_DATA as data } from '../../../../apis/encore/icon-system/dependencies/IS_DATA.js';
import Button from '../../button_components/button.js';
import IS from '../../image_components/IS.js';

export default function IconGrid() {
	const close = (self) => {
		let container = self.parentNode;

		container.classList.remove('open');

		setTimeout(() => {
			container.remove();
		}, 410);
	};

	const open = (self) => {
		window.parent.frameManager.iconSystem(
			self.children[0].getAttribute('name'),
		);
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
							func: open,
							var: 'self',
						},
					});
				}),
			},
		],
	};
}
