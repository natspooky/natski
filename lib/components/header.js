import IS from './image_components/IS.js';

export default function Header({ icon, name }) {
	return {
		tag: 'header',
		classes: 'header',
		children: [
			{
				tag: 'div',
				classes: 'dotted-bg fade-bg',
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
