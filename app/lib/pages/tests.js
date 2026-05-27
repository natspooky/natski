import { render } from '../../apis/encore/element-creator.js';
import StandardLayout from '../layouts/standardLayout.js';
import Link from '../components/ui/link.js';
import Section from '../components/layout/section.js';
import Animator from '../components/layout/animator.js';
import Title from '../components/layout/title.js';

function Page() {
	class man {
		constructor(name) {
			this.prototype.name = name;
		}
	}

	class john extends man {
		constructor(name) {
			super(name);
		}

		manName() {
			return super.name;
		}
	}

	const guy = new john('boob');
	const dude = new john('willt');
	console.log(guy.manName(), dude.manName());
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

export { Page as default, StandardLayout as Layout };

render(
	document.body,
	(data) => {
		data.layout = StandardLayout;
		return Page();
	},
	{ useIcons: true },
);
