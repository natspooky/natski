function Grid({ children, columns = 1, gap = 15 }) {
	return {
		tag: 'section',
		style: {
			display: 'grid',
			gridTemplateColumns: `repeat(auto-fit,minmax(max(calc(50% - (${gap}px * ${columns})),330px),1fr))`, // `repeat(${columns}, calc(${(1 / columns) * 100}% - ${(1 / columns) * gap}px))`,
			gap: `${gap}px`,
			height: 'fit-content',
		},
		children,
	};
}

export default Grid;
