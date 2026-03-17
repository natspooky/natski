function Title({ title, description, buttons }) {
	return {
		tag: 'section',
		style: {
			position: 'relative',
			width: 'min(90%, 450px)',
			margin: '20px auto 0px auto',
			textAlign: 'center',
		},
		children: [
			{
				tag: 'h1',
				style: {
					color: 'var(--text-color)',
					fontSize: 'var(--font-size-10)',
					fontWeight: '500',
					margin: '0px auto 20px auto',
				},
				children: title,
			},
			{
				tag: 'p',
				style: {
					opacity: '0',
					transition: '0.7s',
					color: 'var(--text-sub-color)',
					fontSize: 'var(--font-size-4)',
					position: 'relative',
					display: 'inline-block',
					'.animate .className': {
						opacity: '1',
					},
				},
				children: description,
			},
			buttons
				? {
						tag: 'div',
						children: buttons,
					}
				: {},
		],
	};
}

export default Title;
