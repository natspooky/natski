import IS from '../../apis/encore/icon-system/is.min.js';
import {
	jsonElementify,
	insertChildrenBefore,
} from '../../apis/encore/element-creator/ec.min.js';
import Footer from '../components/footer.js';
import Header from '../components/header.js';
import DocsLink from '../components/docs/docsLink.js';
import { index } from '../js/data/page_index.js';

const url = new URL(window.location.href);

if (!(url.searchParams.get('embed') == 'false')) {
	if (window.location === window.parent.location) {
		window.location.href = `${url.protocol + '//' + url.host}/#${
			url.pathname.replace('.html', '') + url.hash
		}${
			url.searchParams.get('embed')
				? '?' + url.searchParams.get('embed')
				: ''
		}`.toLowerCase();
	}
} else {
	document.body.style.padding = '20px 0 0 0';
}

function createLayout() {
	let route = url.pathname.replace('.html', '').toLowerCase(),
		data = index[route];

	if (!data) {
		route = '/404';
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
						route: `/docs${route}`,
				  })
				: {},
		]),
		document.body.children[1],
	);

	document.body.appendChild(jsonElementify(Footer({ parent: false })));
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
