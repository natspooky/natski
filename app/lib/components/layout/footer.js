import Section from '../layout/section.js';

const info = [
	{
		title: 'socials',
		links: [
			{ title: 'Instagram', href: '' },
			{ title: 'Discord', href: '' },
			{ title: 'Facebook', href: '' },
		],
	},
];

function LinkSection({ title, links }) {
	return {
		tag: 'div',
		children: [
			{
				tag: 'span',
				style: {
					color: 'var(--text-color)',
					fontSize: 'var(--font-size-4)',
					fontWeight: '500',
				},
				children: title,
			},
			{
				tag: 'div',
				children: links.map(({ title, href }) => {
					return {
						tag: 'a',
						style: {
							textDecoration: 'none',
							color: 'var(--text-color-sub)',
							display: 'block',
							':hover': {
								color: 'var(--text-color)',
							},
						},
						attributes: {
							draggable: 'false',
							href,
						},
						children: {
							tag: 'span',
							children: title,
						},
					};
				}),
			},
		],
	};
}

function Footer() {
	const year = new Date().getFullYear();

	return Section({
		children: {
			tag: 'footer',
			style: {
				position: 'relative',
				width: '100%',
				height: '300px',
				overflow: 'hidden',
				color: 'var(--text-sub-color)',
			},

			children: [
				{
					tag: 'div',
					children: [
						{
							tag: 'p',
							children: 'desc slop',
						},
						{
							tag: 'span',
							children: `© ${year > 2026 ? `2026 - ${year}` : year} Natski`,
						},
					],
				},
				info.map((data) => {
					return LinkSection(data);
				}),
			],
		},
	});
}

export default Footer;
