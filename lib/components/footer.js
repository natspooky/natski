import LinkButton from './button_components/linkButton.js';
import ExternalLinkButton from './button_components/externalLinkButton.js';

export default function Footer({ parent }) {
	const socials = [
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

		{
			customIcon: '/icon/system_icons/socials/linkedin.svg',
			name: 'LinkedIn',
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
				subpage: false,
				route: '/docs',
			},
			parent: parent,
		},
		{
			icon: 'CLS',
			name: 'Changelog',
			routing: {
				subpage: false,
				route: '/changelog',
			},
			parent: parent,
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
								children: {
									tag: 'text',
									text: 'natski.dev',
								},
							},
							{
								tag: 'p',
								children: {
									tag: 'text',
									text: 'Going insane ♪(´▽｀)',
								},
							},
							{
								tag: 'p',
								attributes: {
									style: 'font-weight: bold; padding-top: 10px;',
								},
								children: [
									{
										tag: 'text',
										text: 'Powered by ',
									},
									LinkButton({
										icon: 'ENCORE',
										name: 'ENCORE',
										routing: {
											subpage: false,
											route: '/apis/encore',
										},
										parent: parent,
									}),
									LinkButton({
										icon: 'simple',
										name: 'Simple',
										routing: {
											subpage: false,
											route: '/apis/simple',
										},
										parent: parent,
									}),
									LinkButton({
										icon: 'ARC',
										name: 'ARC',
										routing: {
											subpage: false,
											route: '/apis/arc',
										},
										parent: parent,
									}),
								],
							},
						],
					},
					{
						tag: 'span',
						children: [
							{
								tag: 'h1',
								innerHTML: 'Socials',
							},

							...socials.map((data) => ExternalLinkButton(data)),
						],
					},
					{
						tag: 'span',
						children: [
							{
								tag: 'h1',
								innerHTML: 'References',
							},
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
					parent: parent,
				}),
			},
		],
	};
}
