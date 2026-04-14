function Grid({ children, columns = 1, gap = 20 }) {
	return {
		tag: 'section',
		style: {
			display: 'grid',
			gridTemplateColumns: `repeat(${columns}, calc(${(1 / columns) * 100}% - ${(1 / columns) * gap}px))`,
			gap: `${gap}px`,
			height: 'fit-content',
		},
		children,
	};
}

export default Grid;
