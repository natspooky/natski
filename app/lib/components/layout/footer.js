import Section from '../layout/section.js';

const info = [
	{
		header: 'socials',
		links: [
			{ name: 'Instagram' },
			{ name: 'Discord' },
			{ name: 'Facebook' },
		],
	},
];

function Footer() {
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
							children: `© ${new Date().getFullYear()} Natski.`,
						},
					],
				},
				{
					tag: 'div',
					children: info.map(({ header, links }) => {
						return {
							tag: 'div',

							children: [
								{
									tag: 'span',
									style: {
										color: 'var(--text-color)',
									},
									children: header,
								},
								links.map(({ name, href }) => {
									return {
										tag: 'a',
										attributes: {
											href,
										},
										style: {
											border: '0px',
											backgroundColor: 'transparent',
											color: 'var(--text-sub-color)',
										},
										children: name,
									};
								}),
							],
						};
					}),
				},
			],
		},
	});
}

export default Footer;
