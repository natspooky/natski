import { index, folder } from '../js/data/page_index.js';
import Window from './window.js';

export default function WindowContainer({}) {
	const generateColumns = (value, index) => {
		return {
			tag: 'div',
			classes: [
				'window-column',
				index != 2 ? (index > 0 ? 'right' : 'left') : '',
			],
			children: [],
		};
	};

	const generateRows = (data) => {
		return {
			tag: 'div',
			classes: ['window-row'],
			children: data.map(generateColumns),
		};
	};

	const generateWindows = () => {
		let folderData = Object.entries(folder);

		return;
	};

	return {
		tag: 'div',
		classes: 'window-container',
		children: generateWindows(),
	};
}
