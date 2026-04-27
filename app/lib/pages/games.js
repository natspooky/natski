import { render } from '../../apis/encore/element-creator.js';

import StandardLayout from '../layouts/standardLayout.js';
import Animator from '../components/layout/animator.js';
import Section from '../components/layout/section.js';
import Title from '../components/layout/title.js';

function GamesPageContent() {
	return [
		Animator({
			children: Section({
				children: Title({
					title: 'The Cellar',
					description:
						'A collection of little games that can be embedded into any web project',
				}),
			}),
		}),
	];
}

function Page() {
	window.components.layout = StandardLayout;

	return GamesPageContent();
}

export default Page;

render('root', Page, { useIcons: true });
