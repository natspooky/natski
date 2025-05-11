import IS from './IS.js';

export default function Button({ action, icon, customIcon, name, classes }) {
	return {
		tag: 'button',
		classes: classes,
		events: {
			click: action,
		},
		children: [
			IS({
				icon: icon,
				customIcon: customIcon,
			}),
			name
				? {
						tag: 'p',
						innerHTML: name,
				  }
				: {
						tag: 'p',
						innerHTML: 'button',
						attributes: {
							style: 'font-size: 0',
						},
				  },
		],
	};
}
