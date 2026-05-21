import Icon from '../ui/icon.js';

function IconChip({ name, src, style, color, ...props }) {
	return {
		tag: 'span',
		style: {
			position: 'relative',
			padding: '9px 11px',
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
				backgroundColor: color ?? 'var(--accent)',
			},
		}),
		...props,
	};
}

export default IconChip;
