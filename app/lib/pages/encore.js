import StandardLayout from '../layouts/standardLayout.js';
import Animator from '../components/layout/animator.js';
import Section from '../components/layout/section.js';
import Title from '../components/layout/title.js';

function Page() {
	return Animator({
		children: Section({
			children: Title({
				title: 'Encore',
				description: 'bleh',
			}),
		}),
	});
}

const Meta = {
	title: 'Encore',
};

export { Page as default, StandardLayout as Layout, Meta };
