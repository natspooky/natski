import { render } from '../../../apis/encore/element-creator.js';
//import Canvas from '../../components/canvas.js';

import { className } from '../../apis/encore/element-creator.js';
import SimpleCanvas from '../../apis/simple/simple-canvas.js';

function Canvas({
	name,
	draw,
	append,
	resize,
	setup,
	settings,
	classes,
	events,
}) {
	const canvas = SimpleCanvas.create(
		className(['simple-canvas'], classes)
			.map((name) => {
				return '.' + name;
			})
			.join(' '),
		settings,
		name,
	);

	const context = canvas.context;

	const compSetup = async () => {
		await setup?.({ canvas, context });
	};

	const compResize = ({ height, width }) => {
		resize?.({ height, width, canvas, context });
	};

	const compDraw = () => {
		draw?.({ canvas, context });
	};

	const compAppend = () => {
		append?.({ canvas, context });
		canvas.render();
	};

	if (events) {
		Object.entries(events).forEach((eventData) => {
			canvas.on(...eventData);
		});
	}

	canvas.setup(compSetup);
	canvas.resize(compResize);
	canvas.draw(compDraw);
	canvas.append(compAppend);

	return canvas.element;
}

render(
	'root',
	() => {
		return Canvas({
			name: 'Canvas One',
			classes: 'bingus bongus',
			draw: ({ context: ctx, canvas }) => {
				canvas.paintAll('blue');
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
