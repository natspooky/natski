export default function Carousel({ height, width, controls, children }) {
	let pageIndex = 0,
		previousPageIndex = 0;
	const MaxPageIndex = children.length;

	const load = (self) => {
		const pageCont = self.children[0],
			controlCont = self.children[1],
			maxIndex = pageCont.children.length;
	};

	const click = (self) => {
		console.log('clicked');
	};

	const style = width || height ? `height: ${height}; width: ${width}` : null;

	return {
		tag: 'div',
		classes: 'carousel-container',
		attributes: {
			style: style,
		},
		events: {
			touchstart: {
				callback: () => {},
			},
		},
		children: [
			{
				tag: 'div',
				classes: 'page-container',
				children: children
					? children.map((elements) => {
							return {
								tag: 'section',
								classes: 'carousel-page',
								attributes: {
									style: style,
								},
								children: elements,
							};
					  })
					: {},
			},
			controls
				? {
						tag: 'div',
						classes: 'control-container',
						children: [
							{
								tag: 'section',
								children: [
									//children.length * something idk
								],
							},
						],
				  }
				: {},
		],
		onAppend: load,
	};
}
