import LinkButton from '../LinkButton.js';

export default function DocsLink({ route }) {
	return {
		tag: 'section',
		classes: 'docs-link',
		children: [
			{
				tag: 'p',
				innerHTML: '',
			},
			LinkButton({
				name: 'docs',
				icon: 'circle_arrow_leave',
				classes: 'icon-button docs-button',
				routing: {
					subpage: true,
					route: route,
				},
			}),
		],
	};
}
