import isMobile from '../../apis/dependencies/mobile-utils.js';
import { IconLink } from './ui/link.js';

export function ooter() {
	const apis = [
		{
			name: 'ENCORE',
			children: 'Encore',
			href: '/products/encore',
		},
		{
			name: 'simple',
			children: 'Simple',
			href: '/products/simple',
		},
		{
			name: 'ARC',
			children: 'Arc',
			href: '/apis/arc',
		},
	];

	const socials = [
		{
			src: '/icon/system_icons/socials/github.svg',
			children: 'GitHub',
			target: '_blank',
			href: 'https://github.com/natspooky',
		},
		{
			src: '/icon/system_icons/socials/instagram.svg',
			children: 'Instagram',
			target: '_blank',
			href: 'https://www.instagram.com/natspki/',
		},
		{
			src: '/icon/system_icons/socials/linkedin.svg',
			children: 'LinkedIn',
			target: '_blank',
			href: 'https://linkedin.com/in/michael-earle-ab055338b',
		},
	];

	const references = [
		{
			name: 'document',
			children: 'Documentation',
			href: '/docs',
		},
		{
			name: 'CLS',
			children: 'Changelog',
			href: '/changelog',
		},
	];

	return {
		tag: 'div',
		classes: 'footer-container',
		children: [
			{
				active: isMobile,
				blurred: false,
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
										children: 'natski.dev',
									},
									{
										tag: 'p',
										children: 'Going insane ♪(´▽｀)',
									},
								],
							},
							{
								tag: 'span',
								children: [
									{
										tag: 'h1',
										children: 'APIs',
									},
									apis.map((data) => IconLink(data)),
								],
							},
							{
								tag: 'span',
								children: [
									{
										tag: 'h1',
										children: 'References',
									},
									references.map((data) => IconLink(data)),
								],
							},
							{
								tag: 'span',
								children: [
									{
										tag: 'h1',
										children: 'Socials',
									},
									socials.map((data) => IconLink(data)),
								],
							},
						],
					},
					{
						tag: 'section',
						children: IconLink({
							name: 'NATSKI',
							href: '/',
							children: `${new Date().getFullYear()} Natski`,
						}),
					},
				],
			},
		],
	};
}

export default function Footer() {
	return {
		tag: 'footer',
		style: {
			position: 'relative',
			width: '100%',
			padding: '15px',
		},
		children: {},
	};
}
