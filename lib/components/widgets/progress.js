export default function Progress() {
	return {
		tag: 'section',
		classes: 'widget widget-progress fadeout',
		children: {
			tag: 'section',
			classes: 'progbar',
			children: {
				tag: 'section',
			},
		},
	};
}
