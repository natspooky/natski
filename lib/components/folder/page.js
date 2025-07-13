export default function Page({ name, description, icon, routing }) {
	return {
		tag: 'button',
		events: {
			click: {
				callback: () => {
					window.fram.changeHash(routing);
				},
			},
		},
		classes: ['linker', 'page'],
		children: [
			{
				tag: 'div',
				children: {
					tag: 'IS',
					attributes: {
						name: icon,
					},
				},
			},
			{
				tag: 'span',
				children: [
					{
						tag: 'h1',
						innerHTML: name,
					},
					{
						tag: 'p',
						innerHTML: description,
					},
				],
			},
		],
	};
}
