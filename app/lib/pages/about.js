import { render } from '../../apis/encore/element-creator.js';
import standardLayout from '../layouts/standardLayout.js';
import Animator from '../components/layout/animator.js';
import Header from '../components/layout/header.js';
import Section from '../components/layout/section.js';

render(
	'root',
	() => {
		window.components.layout = standardLayout;

		return [
			Animator({
				children: Section({
					children: Header({
						title: 'About',
						description: '',
					}),
				}),
			}),
		];
	},
	{
		useIcons: true,
	},
);
