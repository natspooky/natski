import { render } from '../../apis/encore/element-creator.js';
import StandardLayout from '../layouts/standardLayout.js';
import Animator from '../components/layout/animator.js';
import Section from '../components/layout/section.js';
import Banner from '../components/layout/banner.js';
import Title from '../components/layout/title.js';
import Header from '../components/layout/header.js';
import Grid from '../components/layout/grid.js';
import InfographicCard from '../components/layout/infographicCard.js';
import Card from '../components/layout/card.js';
import Code from '../components/ui/code.js';
import Link from '../components/ui/link.js';

function Page() {
	return [
		Animator({
			children: Section({
				children: Title({
					title: 'Natski.dev',
					description: 'home of Natski products',
					buttons: [
						{ title: 'The Cellar', href: '/the-cellar' },
						{ title: 'Docs', href: '/docs' },
					],
				}),
			}),
		}),

		Animator(
			{
				children: Banner({
					buttons: [
						{ name: 'Encore' },
						{ name: 'Simple' },
						{ name: 'Tools' },
					],
					background: {
						tag: 'div',
						style: {
							position: 'absolute',
							top: '0',
							left: '0',
							width: '100%',
							height: '100%',
							opacity: '0.5',
							backgroundImage:
								'linear-gradient(to bottom right, var(--PDS), var(--SSC), var(--VPS))',
						},
					},
					style: {
						transition:
							'transform 0.4s cubic-bezier(.47,1.53,.77,1.01), opacity 0.4s',
						'.await-animate .className': {
							opacity: '0',
							visibility: 'hidden',
							transform: 'translateY(15px)',
						},
						'.await-animate.animate .className': {
							opacity: '1',
							visibility: 'visible',
							transform: 'translateY(0px)',
						},
					},
				}),
			},
			300,
		),
		true
			? [
					Animator({
						children: Section({
							children: Header({
								id: 'encore',
								title: 'Encore',
								description:
									'A library built for creating functional web-apps using JavaScript',
								chip: 'Products',
							}),
						}),
					}),

					Animator({
						children: Section({
							children: Card({
								cards: [
									{
										icon: 'circle_circle',
										title: 'Lightweight and fast.',
										description:
											'Encore is <30kB in size, allowing for quick imports and event faster page loads.',
									},
									{
										icon: 'circle_triangle',
										title: 'Dynamic page routing.',
										description:
											'Pages are loaded and rendered inside of one instance meaning pages dont have to be reread between each link.',
									},
									{
										icon: 'circle_diamond',
										title: 'other.',
										description: 'desc',
									},
								],
							}),
						}),
					}),

					Section({
						children: Grid({
							columns: 2,
							children: [
								{
									title: 'Encore Components',
									description:
										'Pre-made and pre-styled components for any web project',
									color: 'var(--SSC)',
									icon: 'PDS',
									href: '/encore/components',
								},
								{
									title: 'Encore Docs',
									description:
										'Examples and information about each Encore tool',
									color: 'var(--PDS)',
									icon: 'CMS',
								},
								{
									title: 'Encore Tools',
									description:
										'Tools that come bundled with Encore',
									color: 'var(--IS)',
									icon: 'SSM',
								},
								{
									title: 'Encore Router',
									description: 'burgers',
									color: 'var(--PSS)',
									icon: 'albums',
								},
							].map(
								({
									icon,
									title,
									description,
									color,
									href,
									chip,
									children,
								}) => {
									return Animator({
										children: Link({
											href,
											children: InfographicCard({
												name: icon,
												title,
												description,
												color,
												infoChip: chip
													? chip.map(
															({
																icon,
																description,
															}) => {
																return {
																	name: icon,
																	description,
																};
															},
														)
													: null,
												children,
											}),
										}),
									});
								},
							),
						}),
					}),

					Animator({
						children: Section({
							children: Header({
								id: 'simple',
								title: 'Simple',
								description: 'temp',
								chip: 'Products',
							}),
						}),
					}),

					Animator({
						children: Section({
							children: Header({
								id: 'tools',
								title: 'Tools',
								description: 'temp',
								chip: 'Products',
							}),
						}),
					}),
				]
			: null,
	];
}

const Meta = {
	title: 'Home',
	description: 'Home of Natski Products and Games.',
};

export { Page as default, StandardLayout as Layout, Meta };
render(
	document.body,
	(data) => {
		data.layout.body = StandardLayout;
		return Page();
	},
	{ useIcons: true },
);
