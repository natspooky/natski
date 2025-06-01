import {
	jsonElementify,
	appendChildren,
} from '../../apis/encore/element-creator/ec.min.js';

import Window from '../components/window.js';

import { index } from '../js/data/page_index.js';

function createLayout() {
	appendChildren(
		document.getElementsByTagName('main')[1].children[0],
		jsonElementify(
			Object.entries(index).map(([key, data], index) => {
				if (index % 2 !== 0) return {};
				return Window({
					status: 'ongoing',
					icon: data.icon,
					name: key
						.slice(key.lastIndexOf('/') + 1)
						.replaceAll('-', ' '),
					route: key,
					subpage: false,
					parent: true,
				});
			}),
		),
	);
}

function load() {
	createLayout();
	let screen = document.getElementById('load');
	setTimeout(() => {
		screen.classList.add('loaded');
	}, 10);
	setTimeout(() => {
		screen.remove();
	}, 800);
}

window.addEventListener('DOMContentLoaded', load);
