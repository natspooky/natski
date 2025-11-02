import { render, useState } from '../../../apis/encore/element-creator.js';
import Canvas from '../../components/canvas.js';

render(
	'root',
	() => {
		return Canvas({
			name: 'Canvas One',
			classes: 'bingus bongus',
			draw: ({ context: ctx, canvas }) => {
				canvas.paintAll('red');
				ctx.fillRect(0, 0, 10, 10);
			},
			settings: {
				useCursor: true,
				diagnostics: true,
				size: {
					height: 600,
					width: 600,
				},
			},
		});
	},
	{
		useIcons: true,
	},
);
