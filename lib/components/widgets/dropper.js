import IS from '../IS.js';

export default function Droppper() {
	return {
		tag: 'section',
		classes: 'widget widget-dropper fadeout',
		children: IS({
			icon: 'download',
		}),
	};
}
