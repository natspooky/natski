import LinkButton from './button_components/linkButton.js';
import ExternalLinkButton from './button_components/externalLinkButton.js';

export default function Footer() {
	const contact = [
		{
			customIcon: '/icon/system_icons/socials/github.svg',
			name: 'GitHub',
			routing: {
				display: '_blank',
				route: 'https://github.com/natspooky',
			},
		},
		{
			customIcon: '/icon/system_icons/socials/instagram.svg',
			name: 'Instagram',
			routing: {
				display: '_blank',
				route: 'https://www.instagram.com/natspki/',
			},
		},
	];

	const references = [
		{
			icon: 'document',
			name: 'Documentation',
			routing: {
				subpage: true,
				route: '/docs',
			},
		},
		{
			icon: 'CLS',
			name: 'Changelog',
			routing: {
				subpage: true,
				route: '/changelog',
			},
		},
	];

	return {
		tag: 'footer',
		children: [
			{
				tag: 'section',
				children: [
					{
						tag: 'span',
						children: [
							{
								tag: 'h1',
								innerHTML: 'natski.dev',
							},
							{
								tag: 'p',
								innerHTML: 'going insane ♪(´▽｀)',
							},
						],
					},
					{
						tag: 'span',
						children: [
							{
								tag: 'h1',
								innerHTML: 'Contact',
							},

							...contact.map((data) => ExternalLinkButton(data)),
						],
					},
					{
						tag: 'span',
						children: [
							{
								tag: 'h1',
								innerHTML: 'References',
							},
							,
							...references.map((data) => LinkButton(data)),
						],
					},
				],
			},
			{
				tag: 'section',
				children: LinkButton({
					icon: 'NATSKI',
					name: `© ${new Date().getFullYear()} Natski`,
					routing: {
						subpage: false,
						route: '/',
					},
				}),
			},
		],
	};
}
