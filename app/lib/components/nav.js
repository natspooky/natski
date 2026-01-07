import { className } from '../../apis/encore/element-creator.js';
import Icon from './ui/icon.js';
import { Link } from './ui/link.js';

export default function Nav() {
	const currentPage = new URL(window.location.href).pathname.slice(1);
	const pages = [{ href: '/tests', icon: 'document' }];
	return {
		tag: 'nav',
		children: pages.map(({ href, icon }) => {
			const path = href.slice(href.lastIndexOf('/') + 1);

			return Link({
				href,
				children: [
					Icon({ name: icon }),
					{
						tag: 'span',
						children: path.split('-').join(' '),
					},
				],
				style: {
					backgroundColor: currentPage === path ? 'red' : 'blue',
					borderRadius: '100vmax',
					padding: '5px 10px',
					border: '0px',
				},
			});
		}),
	};
}
