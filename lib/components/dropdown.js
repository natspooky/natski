function DropdownChildren({ icon, name, route }) {
	return LinkButton({
		name: name,
		icon: icon,
		routing: {
			route: route,
			subpage: true,
		},
		classes: window.location.href.includes(subKey) ? 'active' : '',
	});
}

export default function Dropdown({ icon, name, children }) {
	const toggleDropdown = (self) => {
		self.parentNode.classList.toggle('open');
	};

	return {
		tag: 'div',
		classes: 'dropdown',
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
								classes: window.location.href.includes(subKey)
									? 'active'
									: '',
							});
						},
					),
				},
			},
		],
	};
}
