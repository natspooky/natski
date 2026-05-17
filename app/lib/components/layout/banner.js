import Selector from '../ui/selector.js';
import { useState } from '../../../apis/encore/element-creator.js';

function BannerSelector({ buttons, setBannerContent }) {
	return {
		tag: 'div',
		style: {
			position: 'absolute',
			top: '0',
			width: 'fit-content',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: '5px 10px',
			height: '70px',
			borderRadius: '0 0 var(--border-radius-5) var(--border-radius-5)',
			cornerShape: 'var(border-shape)',
			backgroundColor: 'var(--background)',
			'::before, .className::after': {
				content: `''`,
				position: 'absolute',
				backgroundColor: 'transparent',
				top: '0',
				height: '25px',
				width: '25px',
				overflow: 'hidden',
			},
			'::before': {
				left: '-25px',
				backgroundImage:
					'radial-gradient(circle at 0% 100%, transparent 25px, var(--background) 15px)',
			},
			'::after': {
				right: '-25px',
				backgroundImage:
					'radial-gradient(circle at 100% 100%, transparent 25px, var(--background) 15px)',
			},
		},
		children: Selector({ buttons, setter: setBannerContent }),
	};
}

function Banner({ buttons, background, style, layout }) {
	const [bannerContent, , setBannerContent] = useState((get) => {
		return get;
	}, buttons?.[0].data);

	return {
		tag: 'div',
		style: {
			position: 'relative',
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
			margin: '20px auto',
			height: 'auto',
			aspectRatio: '5 / 3',
			maxHeight: 'min(80vh, 800px)',
			overflow: 'hidden',
			...style,
		},
		children: [
			background,
			layout ? layout({ children: bannerContent }) : bannerContent,
			buttons
				? BannerSelector({
						buttons,
						setBannerContent,
					})
				: null,
		],
	};
}

export default Banner;
