import { render } from '../../apis/encore/element-creator.js';

import StandardLayout from '../layouts/standardLayout.js';
import Animator from '../components/layout/animator.js';
import Header from '../components/layout/header.js';
import Section from '../components/layout/section.js';
import Banner from '../components/layout/banner.js';
import Title from '../components/layout/title.js';
import Card from '../components/layout/card.js';
import Icon from '../components/ui/icon.js';

function GamesPageContent() {
	return [
		Section({
			children: Title({
				title: 'Games',
				description: '',
			}),
		}),
	];
}

function Page() {
	window.components.layout = StandardLayout;

	return GamesPageContent();
}

render('root', Page, { useIcons: true });
