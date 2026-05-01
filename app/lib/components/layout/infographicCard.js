import IconChip from './iconChip.js';
import CardContainer from './cardContainer.js';
import Icon from '../ui/icon.js';

function InfographicCard({
	name,
	src,
	color,
	title,
	description,
	infoChip,
	children,
}) {
	return CardContainer({
		children: [
			{
				tag: 'div',
				style: { padding: '20px 27px' },
				children: [
					IconChip({
						src,
						name,
						style: {
							backgroundColor: 'var(--background)',
						},
						color,
					}),
					TextBlock({
						title,
						description,
						color,
					}),
					InfoChip({
						infoChip,
						color,
					}),
				],
			},
			children ?? [],
		],
		style: {
			transition: '0.4s cubic-bezier(.47,1.53,.77,1.01)',
			'.await-animate .className': {
				opacity: '0',
				transform: 'translateY(15px)',
			},
			'.await-animate.animate .className': {
				opacity: '1',
				transform: 'translateY(0px)',
			},
		},
	});
}

function TextBlock({ title, description, color }) {
	return {
		tag: 'span',
		style: {
			display: 'block',
			position: 'relative',
			margin: '10px 0',
			width: '70%',
		},
		children: [
			{
				tag: 'h2',
				style: {
					color,
					fontWeight: '500',
				},
				children: title,
			},
			{
				tag: 'h2',
				style: {
					color: 'var(--text-color)',
					fontWeight: '500',
				},
				children: description,
			},
		],
	};
}

function InfoChip({ infoChip, color }) {
	return {
		tag: 'ul',
		style: {
			listStyle: 'none',
		},
		children: infoChip.map(({ src, name, description }) => {
			return {
				tag: 'li',
				style: {
					margin: '5px 0',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'left',
				},
				children: [
					Icon({
						src,
						name,
						style: {
							position: 'relative',
							height: '15px',
							width: '15px',
							display: 'block',
							margin: '0 9px 0 0',
							backgroundColor: color,
						},
					}),
					{
						tag: 'span',
						style: {
							position: 'relative',
							display: 'block',
							fontWeight: '500',
							fontSize: 'var(--font-size-2)',
						},
						children: description,
					},
				],
			};
		}),
	};
}

export default InfographicCard;
