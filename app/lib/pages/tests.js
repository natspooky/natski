import { render } from '../../apis/encore/element-creator.js';
import StandardLayout from '../layouts/standardLayout.js';
import Link from '../components/ui/link.js';
import Section from '../components/layout/section.js';
import Animator from '../components/layout/animator.js';
import Title from '../components/layout/title.js';

function link({ href }) {
	return Link({
		href: '/tests/' + href,
		children: href.split('-').join(' '),
	});
}

function TestContent() {
	return [
		Animator({
			children: Section({
				children: Title({
					title: 'Test Page',
					description: 'Page containing links to all of the tests',
				}),
			}),
		}),
		Section({
			children: [
				'element-creator',
				'embed',
				'home',
				'icon-system',
				'simple-canvas',
				'components',
			].map((name) => {
				return Link({
					href: '/tests/' + name,
					style: {
						padding: '5px',
						backgroundColor: 'grey',
					},
					children: name.split('-').join(' '),
				});
			}),
		}),
	];
}

function Page() {
	window.components.layout = StandardLayout;

	return TestContent();
}

render(document.body, Page, { useIcons: true });
