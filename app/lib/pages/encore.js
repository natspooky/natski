import StandardLayout from '../layouts/standardLayout.js';
import Animator from '../components/layout/animator.js';
import Section from '../components/layout/section.js';
import Title from '../components/layout/title.js';
import Header from '../components/layout/header.js';

function Page() {
	return [
		Animator({
			children: Section({
				children: Title({
					title: 'Encore',
					description: 'bleh',
				}),
			}),
		}),

		Animator({
			children: Header({
				chip: 'How it works',
				title: 'Install',
				description: '',
			}),
		}),
	];
}

const Meta = {
	title: 'Encore',
	description: '',
};

export { Page as default, StandardLayout as Layout, Meta };
