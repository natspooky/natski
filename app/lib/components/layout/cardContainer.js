function CardContainer({ children }) {
	return {
		tag: 'div',
		style: {
			position: 'relative',
			borderRadius: 'var(--border-radius-4)',
			cornerShape: 'var(--border-shape)',
			backgroundColor: 'var(--background-sub)',
			minHeight: 'fit-content',
			height: '100%',
			padding: '20px',
		},
		children,
	};
}

export default CardContainer;
