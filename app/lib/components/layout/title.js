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
					margin: '0px auto 10px auto',
				},
				children: title,
			},
			{
				tag: 'p',
				style: {
					color: 'var(--text-sub-color)',
					fontSize: 'var(--font-size-4)',
					position: 'relative',
					display: 'inline-block',
				},
				children: description,
			},
			buttons ? Buttons(buttons) : {},
		],
	};
}

function Buttons(buttons) {
	return {
		tag: 'section',
		style: {
			display: 'flex',
			justifyContent: 'center',
			gap: '10px',
			padding: '20px 0 0 0',
		},
		children: buttons.map(({ name, href }, index) => {
			const first = index === 0;

			return {
				tag: 'a',
				attributes: {
					href,
				},
				style: {
					backgroundColor: 'transparent',
					color: first
						? 'var(--background)'
						: 'var(--text-sub-color)',
					cursor: 'pointer',
					fontSize: 'var(--font-size-3)',
					fontWeight: 'var(--font-weight-500)',
					border: '0px',
					padding: '11px 20px',
					display: 'inline-block',
					position: 'relative',
					textDecoration: 'none',
					'::before': {
						content: `""`,
						position: 'absolute',
						top: '0px',
						left: '0px',
						width: '100%',
						height: '100%',
						backgroundColor: first
							? 'var(--accent)'
							: 'var(--background-sub)',
						borderRadius: 'var(--border-radius-max)',
						opacity: first ? '1' : '0.6',
						cornerShape: 'var(--border-shape)',
						transition: '0.2s',
					},

					':hover::before': {
						opacity: first ? '0.8' : '1',
					},
				},
				children: {
					tag: 'span',
					style: {
						position: 'relative',
					},
					children: name,
				},
			};
		}),
	};
}

export default Title;
