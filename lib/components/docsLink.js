import LinkButton from './LinkButton.js';

export default function DocsLink({}) {
	return {
		tag: 'section',
		classes: 'docs-link',
		children: [{}],
	};
}

LinkButton({
	name: 'docs',
	icon: 'circle_arrow_leave',
	classes: 'docs-button',
	routing: {
		subpage: true,
		route: 'link',
	},
});
// use ^
