function Icon({ src, name, attributes, style, ...props }) {
	return {
		tag: 'icon-system',
		attributes: {
			name,
			src,
			...attributes,
		},
		style: {
			display: 'block',
			...style,
		},
		...props,
	};
}

export default Icon;
