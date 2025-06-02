import LinkButton from '../button_components/linkButton.js';

export default function DocsLink({ route }) {
	return {
		tag: 'section',
		classes: 'docs-link',
		children: [
			{
				tag: 'p',
				innerHTML: 'Check out the docs!',
			},
			LinkButton({
				icon: 'circle_arrow_leave',
				classes: ['icon-button', 'docs-button'],
				routing: {
					subpage: true,
					route: route,
				},
			}),
		],
	};
}
