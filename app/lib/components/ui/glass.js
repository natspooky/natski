import {
	className,
	useId,
	merge,
} from '../../../apis/encore/element-creator.js';
import isMobile from '../../../apis/dependencies/mobile-utils.js';

function Glass({ ...props }) {
	let pressed = false;
	return merge(
		{
			tag: 'div',
			style: {
				position: 'relative',
				border: '1px solid #ffffff10',
				backgroundColor: '#ffffff10',
				overflow: 'hidden',
				padding: '40px',
				borderRadius: '30px',
				transition: '0.2s ',
				'::before': {
					content: `''`,
					position: 'absolute',
					top: '0',
					left: '0',
					height: '100%',
					width: '100%',
					backgroundImage:
						'linear-gradient(45deg,transparent,#ffffff15)',
				},
				':hover': {
					transform: 'scale(1.1)',
				},
			},
			events: {
				mousedown: [
					{
						callback: () => {},
					},
				],
			},
		},

		props,
	);
}

export { Glass };
