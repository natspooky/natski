function Button({ style, ...props }) {
	return {
		tag: 'button',
		style: {
			cursor: 'pointer',
			backgroundColor: 'transparent',
			border: '0px',
			appearance: 'none',
			...style,
		},
		...props,
	};
}

export default Button;
