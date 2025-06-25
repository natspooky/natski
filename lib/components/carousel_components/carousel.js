export default function Carousel({ height, width, controls, children }) {
	return {
		tag: 'div',
		classes: 'carousel-container',
		attributes: {
			style: `height: ${height}; width: ${width}`,
		},
		children: [
			{
				tag: 'div',
				classes: 'page-container',
				children: {
					tag: 'div',
					classes: 'page-slider',
					children: children
						? children.map((elements) => {
								return {
									tag: 'section',
									classes: 'carousel-page',
									attributes: {
										style: `height: ${height}; width: ${width}`,
									},
									children: elements,
								};
						  })
						: {},
				},
			},
			{
				tag: 'div',
				classes: 'control-container',
			},
		],
	};
}
