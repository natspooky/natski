import { render, useSuspense } from '../../../apis/encore/element-creator.js';
import Embed from '../../components/layout/embed.js';
import StandardLayout from '../../layouts/standardLayout.js';
import Section from '../../components/layout/section.js';
import Animator from '../../components/layout/animator.js';
import Title from '../../components/layout/title.js';
import Card from '../../components/layout/card.js';

function Page() {
	return useSuspense(() => {
		return [
			Section({
				children: Title({
					title: 'Page Title',
					description: 'Page description text',
				}),
			}),

			Section({
				children: Embed({
					children: Title({
						title: 'Embed Title',
						description: 'Embed description text',
					}),
				}),
			}),

			{
				tag: 'img',
				attributes: {
					src: 'https://google.com',
					hidden: '',
				},
			},

			Animator({
				children: Section({
					children: Card({
						cards: new Array(3).fill(0).map(() => {
							return {
								icon: 'ENCORE',
								title: 'card title',
								description: 'card description',
							};
						}),
					}),
				}),
			}),
		];
	}, 'loading frame');
}

export { Page as default, StandardLayout as Layout };
