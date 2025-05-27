import LinkButton from '../linkButton.js';
import Button from '../button.js';

import { docs, index } from '../../js/data/page_index.js';

export default function DocsSelector() {
	const toggleDropdown = (self) => {
		self.parentNode.classList.toggle('open');
	};

	const closeDropdown = (self) => {
		self.classList.remove('open');
	};

	return {
		tag: 'section',
		children: Object.entries(index)
			.filter(([key, data]) => data.package && data.package.docs)
			.map(([key, data]) => {
				return {
					tag: 'div',
					classes: 'docs-selector-dropdown',
					events: {
						mouseleave: {
							func: closeDropdown,
							var: 'self',
						},
					},
					children: [
						Button({
							icon: data.icon,
							name: data.name,
							action: {
								func: toggleDropdown,
								var: 'self',
							},
							classes: [
								'docs-dropdown-button',
								window.location.href.includes(key)
									? 'active'
									: '',
							],
						}),
						{
							tag: 'div',
							children: {
								tag: 'section',
								children: Object.entries(docs[key]).map(
									([subKey, data]) => {
										return LinkButton({
											name: subKey,
											icon: data.icon,
											routing: {
												route: data.route,
												subpage: false,
											},
											classes:
												window.location.href.includes(
													key,
												)
													? 'active'
													: '',
										});
									},
								),
							},
						},
					],
				};
			}),
	};
}
