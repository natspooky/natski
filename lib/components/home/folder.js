import { default as Page } from './page.js';

export default function Folder({ name, data }) {
	let pages = [];
	for (const [dataName, x] of Object.entries(data)) {
		pages.push(
			Page({
				name: dataName.split(/(?=\p{Lu})/u).join(' '),
				description: x.description,
				icon: x.icon,
				routing: x.routing,
			}),
		);
	}
	return {
		tag: 'div',
		classes: 'folder',
		children: [
			{
				tag: 'div',
				classes: 'title',
				children: {
					tag: 'h1',
					innerHTML: name,
				},
			},
			{
				tag: 'section',
				children: pages,
			},
		],
	};
}
