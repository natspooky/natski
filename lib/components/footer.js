import LinkButton from './button_components/linkButton.js';
import isMobile from '../../../apis/dependencies/mobile-utils/mu.min.js';
import { GlassBacking } from './ui/glass.js';
import { GradientSparkle } from './ui/backgrounds.js';

export default function Footer() {
	const socials = [
		{
			customIcon: '/icon/system_icons/socials/github.svg',
			name: 'GitHub',
			routing: {
				display: '_blank',
				href: 'https://github.com/natspooky',
			},
		},
		{
			customIcon: '/icon/system_icons/socials/instagram.svg',
			name: 'Instagram',
			routing: {
				display: '_blank',
				href: 'https://www.instagram.com/natspki/',
			},
		},

		{
			customIcon: '/icon/system_icons/socials/linkedin.svg',
			name: 'LinkedIn',
			routing: {
				display: '_blank',
				href: 'https://www.instagram.com/natspki/',
			},
		},
	];

	const references = [
		{
			icon: 'document',
			name: 'Documentation',
			routing: {
				display: '_self',
				href: '/docs',
			},
		},
		{
			icon: 'CLS',
			name: 'Changelog',
			routing: {
				display: '_self',
				href: '/changelog',
			},
		},
	];

	return {
		tag: 'div',
		classes: 'footer-container',
		children: [
			GradientSparkle({ waves: true }),
			GlassBacking({
				active: isMobile,
				blurred: true,
				tag: 'footer',
				hover: true,
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
								],
							},
							{
								tag: 'span',
								children: [
									{
										tag: 'h1',
										innerHTML: 'APIs',
									},

									LinkButton({
										icon: 'ENCORE',
										name: 'Encore',
										routing: {
											display: '_self',
											href: '/apis/encore',
										},
									}),
									LinkButton({
										icon: 'simple',
										name: 'Simple',
										routing: {
											display: '_self',
											href: '/apis/simple',
										},
									}),
									LinkButton({
										icon: 'ARC',
										name: 'Arc',
										routing: {
											display: '_self',
											href: '/apis/arc',
										},
									}),
								],
							},
							{
								tag: 'span',
								children: [
									{
										tag: 'h1',
										innerHTML: 'Socials',
									},

									...socials.map((data) => LinkButton(data)),
								],
							},
							{
								tag: 'span',
								children: [
									{
										tag: 'h1',
										innerHTML: 'References',
									},
									...references.map((data) =>
										LinkButton(data),
									),
								],
							},
						],
					},
					{
						tag: 'section',
						children: LinkButton({
							icon: 'NATSKI',
							name: `${new Date().getFullYear()} Natski`,
							routing: {
								display: '_self',
								href: '/',
							},
						}),
					},
				],
			}),
		],
	};
}
