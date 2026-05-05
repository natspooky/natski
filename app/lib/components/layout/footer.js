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
			{ title: 'Landing', href: '/' },
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

	return Animator({
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

				children: Grid({
					gap: 20,
					columns: 2,
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
									children: new Array(150)
										.fill(0)
										.map(() => {
											const space =
												Math.floor(Math.random() * 2) <
												1
													? ''
													: ' ';

											return (
												Math.floor(Math.random() * 2) +
												space
											);
										})
										.join(''),
								},
								{
									tag: 'div',
									style: {
										display: 'flex',
										alignItems: 'center',
										gap: '5px',
									},
									children: [
										`©${year > 2026 ? `2026-${year}` : year}`,
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
				}),
			},
		}),
	});
}

export default Footer;
