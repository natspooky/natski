import { render } from '../../apis/encore/element-creator.js';

import StandardLayout from '../layouts/standardLayout.js';
import Animator from '../components/layout/animator.js';
import Section from '../components/layout/section.js';
import Title from '../components/layout/title.js';

function Page() {
	return Animator({
		children: Section({
			children: Title({
				title: 'Docs',
				description:
					'Documentation for Encore, Simple and Arc libraries.',
			}),
		}),
	});
}

export { Page as default, StandardLayout as Layout };
