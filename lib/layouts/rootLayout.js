import Footer from '../components/footer.js';
import Header from '../components/header.js';

import DocsLink from '../components/docs/docsLink.js';
import { index } from '../js/data/page_index.js';

export default function RootLayout({ children }) {
	const url = new URL(window.location.href);

	let route = url.pathname.replace('.html', '').toLowerCase(),
		data = index[route];

	if (!data) {
		route = '/404';
		data = index[route];
	}

	const append = (self) => {
		setTimeout(() => {
			self.classList.add('loaded');
			setTimeout(() => {
				self.remove();
			}, 800);
		}, 10);
	};

	return [
		Header({
			icon: data.icon,
			name: data.name,
		}),
		data.package && data.package.docs
			? DocsLink({
					route: `/docs${route}`,
			  })
			: {},
		{
			tag: 'main',
			children: children,
		},
		Footer({
			parent: false,
		}),
		{
			tag: 'section',
			attributes: {
				id: 'load',
			},
			onAppend: append,
		},
	];
}
