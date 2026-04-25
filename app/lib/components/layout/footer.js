import Section from '../layout/section.js';
import Grid from '../layout/grid.js';
import Icon from '../ui/icon.js';

const info = [
	{
		title: 'Socials',
		links: [
			{ title: 'Instagram', href: '' },
			{ title: 'Discord', href: '' },
			{ title: 'Facebook', href: '' },
		],
	},
	{
		title: 'Links',
		links: [
			{ title: 'Landing', href: '/' },
			{ title: 'Games', href: '/games' },
			{ title: 'Docs', href: '/docs' },
		],
	},
];

function LinkSection({ title, links }) {
	return {
		tag: 'div',
		style: {
			position: 'relative',
			display: 'inline-block',
		},
		children: [
			{
				tag: 'span',
				style: {
					color: 'var(--text-color)',
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
							marginTop: '5px',
							transition: '0.1s',
							':hover': {
								color: 'var(--text-sub-color)',
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
				height: 'fit-content',
				padding: '0 0 70px 0',
				display: 'flex',
				flexWrap: 'no-wrap',
				fontSize: 'var(--font-size-2)',
				fontWeight: '500',
				justifyContent: 'space-between',
				overflow: 'hidden',
				color: 'var(--text-supersub-color)',
			},

			children: [
				{
					tag: 'div',
					children: [
						{
							tag: 'p',
							style: { marginBottom: '15px' },
							children: 'desc slop',
						},
						{
							tag: 'div',
							style: {
								display: 'flex',
								alignItems: 'center',
								gap: '5px',
							},
							children: [
								`© ${year > 2026 ? `2026 - ${year}` : year}`,
								Icon({
									name: 'NATSKI',
									style: {
										position: 'relative',
										height: '15px',
										width: '15px',
										backgroundColor:
											'var(--text-supersub-color)',
									},
								}),
								'Natski',
							],
						},
					],
				},
				{
					tag: 'div',
					style: {
						position: 'relative',
						width: '50%',
					},
					children: Grid({
						children: info.map((data) => {
							return LinkSection(data);
						}),
						width: '100',
						columns: 2,
						gap: 20,
					}),
				},
			],
		},
	});
}

export default Footer;
