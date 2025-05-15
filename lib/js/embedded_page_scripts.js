import { default as IS } from '../../api/encore/icon-system/is.min.js';
import {
	jsonElementify,
	insertChildrenBefore,
} from '../../api/encore/element-creator/ec.min.js';
import { default as Footer } from '../components/footer.js';
import { default as Header } from '../components/header.js';
import { index } from '../js/data/page_index.js';

if (window.location === window.parent.location) {
	window.location.href = `${window.location.href.slice(
		0,
		window.location.href.lastIndexOf('app/') + 1 + 3,
	)}index.html#${window.location.href
		.slice(
			window.location.href.lastIndexOf('app/') + 1 + 3,
			window.location.href.length,
		)
		.toLowerCase()
		.replace('.html', ' ')}`;
}

function createLayout() {
	const route = window.location.href
		.slice(
			window.location.href.lastIndexOf('app/') !== -1
				? window.location.href.lastIndexOf('app/') + 4
				: 0,
			window.location.href.lastIndexOf('.') !== -1
				? window.location.href.lastIndexOf('.')
				: window.location.href.length,
		)
		.toLowerCase()
		.replaceAll('%20', '-')
		.replaceAll('_', '-');

	console.log(route);

	let data = index[route];

	if (!data) data = index[404];

	insertChildrenBefore(
		document.body,
		jsonElementify([
			Header({
				icon: data.icon,
				name: data.name,
			}),
		]),
		document.body.children[1],
	);

	//appendChildren(document.getElementsByTagName('main')[0], []);

	document.body.appendChild(jsonElementify(Footer()));
}

function setButtons() {
	let buttons = document.getElementsByClassName('linker');
	for (const button of buttons) {
		if (button.hasAttribute('name')) {
			button.addEventListener('click', () => {
				window.parent.fram.incrementSubPage();
				window.parent.fram.changeHash(button.getAttribute('name'));
			});
		}
	}
}

function load() {
	new IS().observe(document);
	createLayout();
	setButtons();
	let screen = document.getElementById('load');
	setTimeout(() => {
		screen.classList.add('loaded');
	}, 10);
	setTimeout(() => {
		screen.remove();
	}, 800);
}

window.addEventListener('DOMContentLoaded', load);
