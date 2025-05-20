import { default as IS } from '../../api/encore/icon-system/is.min.js';
import {
	jsonElementify,
	insertChildrenBefore,
} from '../../api/encore/element-creator/ec.min.js';
import Footer from '../components/footer.js';
import Header from '../components/header.js';
import DocsLink from '../components/docs/docsLink.js';
import { index } from '../js/data/page_index.js';

const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});

console.log(params);

if (window.location === window.parent.location && !params.refuse_embed) {
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
	let route = window.location.href
			.slice(
				window.location.href.lastIndexOf('app/') !== -1
					? window.location.href.lastIndexOf('app/') + 4
					: 0,
				window.location.href.lastIndexOf('.') !== -1
					? window.location.href.lastIndexOf('.')
					: window.location.href.length,
			)
			.toLowerCase(),
		data = index[route];

	console.log(route);

	if (!data) {
		route = 404;
		data = index[route];
	}

	insertChildrenBefore(
		document.body,
		jsonElementify([
			Header({
				icon: data.icon,
				name: data.name,
			}),
			data.package && data.package.docs
				? DocsLink({
						route: `docs/${route}`,
				  })
				: {},
		]),
		document.body.children[1],
	);

	document.body.appendChild(jsonElementify(Footer()));
}

function load() {
	new IS().observe(document);
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
