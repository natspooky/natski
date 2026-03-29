import Icon from '../ui/icon.js';

function AccentIcon({ name, src, style }) {
	return {
		tag: 'span',
		style: {
			position: 'relative',
			padding: '9px 13px',
			width: 'fit-content',
			height: 'fit-content',
			display: 'block',
			borderRadius: 'var(--border-radius-max)',
			cornerShape: 'var(--border-shape)',
			backgroundColor: 'var(--accent-sub)',
			...style,
		},
		children: Icon({
			name,
			src,
			style: {
				display: 'block',
				position: 'relative',
				width: 'var(--font-size-4)',
				height: 'var(--font-size-4)',
				backgroundColor: 'var(--accent)',
			},
		}),
	};
}

function Card({ icon, title, description, delay }) {
	return {
		tag: 'div',
		style: {
			padding: '10px 10px 0px 10px',
			textAlign: 'center',
			maxWidth: '65vw',
			display: 'block',
			margin: '0 auto',
			fontSize: 'var(--font-size-4)',
			color: 'var(--text-sub-color)',
		},
		children: [
			AccentIcon({
				name: icon,
				style: {
					margin: '10px auto 15px auto',
					opacity: '0',
					transition: '1s',
					transitionDelay: `${delay}s`,
					'.animate .className': {
						opacity: '1',
					},
				},
			}),
			{
				tag: 'p',
				style: {
					opacity: '0',
					transform: 'translateY(15px)',
					transition: '0.4s cubic-bezier(.47,1.53,.77,1.01)',
					transitionDelay: `${delay}s`,
					'.animate .className': {
						opacity: '1',
						transform: 'translateY(0px)',
					},
				},
				children: [
					{
						tag: 'span',
						style: {
							color: 'var(--text-color)',
							fontWeight: '500',
						},
						children: title,
					},
					' ',
					{
						tag: 'span',
						children: description,
					},
				],
			},
		],
	};
}

function CardWrapper({ cards }) {
	return {
		tag: 'div',
		style: {
			position: 'relative',
			width: '100%',
			gap: '1em',
			display: 'grid',
			alignItems: 'start',
			gridTemplateColumns: 'repeat(auto-fit,minmax(max(25%,280px),1fr))',
		},
		children: cards.map((card, index) => {
			return Card({ ...card, delay: (index + 1) * 0.1 });
		}),
	};
}

export default CardWrapper;
