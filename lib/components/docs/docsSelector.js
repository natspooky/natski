import LinkButton from '../button_components/linkButton.js';
import Button from '../button_components/button.js';

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
		classes: 'docs-selector',
		children: Object.entries(index)
			.filter(([_, data]) => data.package?.docs)
			.map(([key, data]) => {
				return {
					tag: 'div',
					classes: 'docs-selector-dropdown',
					children: [
						Button({
							icon: data.icon,
							name: data.name,
							action: {
								callback: toggleDropdown,
								param: 'self',
							},
							classes: window.location.href.includes(key)
								? 'docs-dropdown-button active'
								: 'docs-dropdown-button',
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
												subpage: true,
											},
											classes:
												window.location.href.includes(
													subKey,
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
