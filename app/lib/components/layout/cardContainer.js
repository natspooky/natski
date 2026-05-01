function CardContainer({ children, style }) {
	return {
		tag: 'div',
		style: {
			position: 'relative',
			borderRadius: 'var(--border-radius-4)',
			cornerShape: 'var(--border-shape)',
			backgroundColor: 'var(--background-sub)',
			minHeight: 'fit-content',
			height: '100%',
			width: '100%',
			overflow: 'hidden',
			...style,
		},
		children,
	};
}

export default CardContainer;
