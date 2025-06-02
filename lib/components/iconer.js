import LinkButton from './button_components/linkButton.js';
import LinkButton from './image_components/IS.js';

export default function temp({
	classes,
	routing,
	parent,
	icons,
	title,
	content,
}) {
	return LinkButton({
		routing: routing,
		classes: classes,
		parent: parent,
		children: [
			{
				tag: 'span',
				children: icons.map((icon) => IS({ icon: icon })),
			},
			{
				tag: 'div',
				children: [
					{
						tag: 'h1',
						innerHTML: title,
					},
					{
						tag: 'p',
						innerHTML: content,
					},
				],
			},
		],
	});
}
