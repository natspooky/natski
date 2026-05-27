import Section from '../layout/section.js';
import Grid from '../layout/grid.js';
import Icon from '../ui/icon.js';
import Link from '../ui/link.js';
import Animator from '../layout/animator.js';

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
			{ title: 'Landing', href: '/home' },
			{ title: 'The Cellar', href: '/the-cellar' },
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
					return Link({
						href,
						style: {
							color: 'var(--text-color-sub)',
							display: 'block',

							padding: '5px 20px 0 0',
							fontWeight: '500',
							transition: '0.1s',
							':hover': {
								color: 'var(--text-sub-color)',
							},
						},
						children: {
							tag: 'span',
							children: title,
						},
					});
				}),
			},
		],
	};
}

function Footer() {
	const year = new Date().getFullYear();

	return Animator(
		{
			children: Section({
				children: {
					tag: 'footer',
					style: {
						position: 'relative',
						width: '100%',
						height: 'fit-content',
						padding: '0 0 70px 0',
						display: 'flex',
						flexWrap: 'no-wrap',
						gap: '50px',
						fontSize: 'var(--font-size-2)',
						fontWeight: '500',
						justifyContent: 'space-between',
						overflow: 'hidden',
						color: 'var(--text-supersub-color)',
						'.await-animate .className': {
							transition: '0.4s',
							opacity: '0',
						},
						'.await-animate.animate .className': {
							opacity: '1',
						},
					},

					children: [
						{
							tag: 'div',
							style: {
								position: 'relative',
								width: '70%',
							},
							children: [
								{
									tag: 'p',
									style: {
										marginBottom: '15px',
									},
									children: [
										{
											tag: 'span',
											style: {
												fontWeight: 800,
											},
											children: 'No AI is used',
										},
										' ',
										'in the production of this website or its associated products and packages.',
										{ tag: 'br' },
										{ tag: 'br' },
										{
											tag: 'span',
											style: {
												fontWeight: 800,
											},
											children: 'Natski.dev',
										},
										' ',
										'is built using both Encore (for pages) and Simple (for games) libraries.',
									],
								},
								{
									tag: 'div',
									style: {
										display: 'flex',
										alignItems: 'center',
										gap: '5px',
									},
									children: [
										`©2025-${year}`,
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
								justifySelf: 'end',
								position: 'relative',
								width: '80%',
								paddingLeft: 'min(10%,100px)',
							},
							children: Grid({
								children: info.map((data) => {
									return LinkSection(data);
								}),
								width: 100,
								columns: 2,
								gap: 20,
							}),
						},
					],
				},
			}),
		},
		200,
	);
}

export default Footer;
