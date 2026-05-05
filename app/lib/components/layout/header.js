function Header({ chip, title, description }) {
	let headerCounter = 0,
		textCounter = 0;

	return {
		tag: 'section',
		style: {
			position: 'relative',
			width: 'min(90%, 400px)',
			margin: '50px auto 30px auto',
			textAlign: 'center',
		},
		children: [
			chip
				? {
						tag: 'span',
						style: {
							position: 'relative',
							borderRadius: 'var(--border-radius-1)',
							padding: '2px 7px',
							fontSize: 'var(--font-size-2)',
							display: 'block',
							backgroundColor: 'var(--background-sub)',
							color: 'var(--text-supersub-color)',
							width: 'fit-content',
							margin: '0px auto 25px auto',
							'.await-animate .className': {
								transition: '1s',
								opacity: '0',
							},
							'.await-animate.animate .className': {
								opacity: '1',
							},
						},
						children: chip,
					}
				: null,
			{
				tag: 'h1',
				style: {
					margin: '0px auto 15px auto',
					fontSize: 'var(--font-size-7)',
					fontWeight: '500',
					color: 'var(--text-color)',
				},
				children: title.split(' ').map((word) => {
					headerCounter += 1;
					return [
						{
							tag: 'span',
							style: {
								position: 'relative',
								display: 'inline-block',
								'.await-animate .className': {
									transition:
										'0.5s cubic-bezier(.47,1.53,.77,1.01)',
									transitionDelay: `${headerCounter * 70}ms`,
									opacity: '0',
									transform: 'translateY(-10px)',
								},
								'.await-animate.animate .className': {
									opacity: '1',
									transform: 'translateX(0px)',
								},
							},
							children: word,
						},
						' ',
					];
				}),
			},
			{
				tag: 'p',
				style: {
					fontSize: 'var(--font-size-4)',
					color: 'var(--text-sub-color)',
				},
				children: description.split(' ').map((word) => {
					return [
						word.split('').map((letter) => {
							textCounter += 1;
							return [
								{
									tag: 'span',
									style: {
										position: 'relative',
										display: 'inline-block',
										'.await-animate .className': {
											transition:
												'0.4s cubic-bezier(.47,1.53,.77,1.01)',
											transitionDelay: `${headerCounter * 80 + textCounter * 10}ms`,
											opacity: '0',
											transform: 'translateY(10px)',
										},
										'.await-animate.animate .className': {
											opacity: '1',
											transform: 'translateY(0px)',
										},
									},
									children: letter,
								},
							];
						}),
						' ',
					];
				}),
			},
		],
	};
}

export default Header;
