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
					title: 'Docs Home',
					description:
						'Documentation for Encore, Simple and Arc libraries.',
				}),
			}),
		}),
	];
}

function Page() {
	window.components.layout = StandardLayout;

	return GamesPageContent();
}

render(document.body, Page, { useIcons: true });
