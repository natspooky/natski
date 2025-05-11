import IS from './IS.js';

export default function Header({ icon, name }) {
	return {
		tag: 'header',
		children: [
			{
				tag: 'div',
				classes: 'grid-bg',
			},
			{
				tag: 'span',
				children: [
					IS({ icon: icon }),
					{
						tag: 'h1',
						innerHTML: name,
					},
				],
			},
		],
	};
}
