import LinkButton from './button_components/linkButton.js';

export default function Footer() {
	return {
		tag: 'footer',
		children: LinkButton({
			icon: 'NATSKI',
			name: `© ${new Date().getFullYear()} Natski`,
			routing: {
				subpage: true,
				route: '/licence',
			},
		}),
	};
}
