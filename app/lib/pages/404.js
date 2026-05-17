import StandardLayout from '../layouts/standardLayout.js';
import Animator from '../components/layout/animator.js';
import Title from '../components/layout/title.js';
import Section from '../components/layout/section.js';

function Page() {
	return Animator({
		children: Section({
			children: Title({
				title: '404 Not Found',
				description:
					"Something went wrong and we couldn't find the page you're looking for...",
				buttons: [
					{
						title: 'Go home',
						href: '/home',
					},
				],
			}),
		}),
	});
}

const Meta = {
	title: '404',
};

export { Page as default, StandardLayout as Layout, Meta };
