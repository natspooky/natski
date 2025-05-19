import { default as Page } from './page.js';
import { index, folder } from '../../js/data/page_index.js';

export default function Folders() {
	const folder = ([key, data]) => {
		return {
			tag: 'section',
			children: [
				{
					tag: 'h1',
					innerHTML: key,
				},
			],
		};
	};

	return {
		tag: 'div',
		children: Object.entries(folder).map((data) => {
			return folder(data);
		}),
	};
}
