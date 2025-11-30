import { render, className } from '../../../apis/encore/element-creator.js';
//import Canvas from '../../components/canvas.js';

import SimpleCanvas from '../../../apis/simple/simple-canvas.js';

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
		const size = { height: 410, width: 410 };

		return [
			{
				tag: 'style',
				innerHTML: '.simple-canvas{width:300px;height:300px;}',
			},
			Canvas({
				name: 'Draw Test',
				classes: 'bingus bongus',
				draw: ({ canvas }) => {
					canvas.paintAll('blue');
				},
				settings: {
					fps: 400,
					useCursor: true,
					diagnostics: true,
					size,
				},
			}),
			Canvas({
				name: 'Event Test',
				draw: ({ canvas }) => {
					canvas.paintAll('blue');
					if (canvas.keyboard.pressing) {
						console.log(canvas.keyboard);
					}
				},
				settings: {
					fps: 400,
					useCursor: true,
					globalCursor: true,
					useTouch: true,
					useWheel: true,
					useScroll: true,
					useKey: true,
					diagnostics: true,
					size,
				},
			}),
			Canvas({
				name: 'Resize Test',
				draw: ({ canvas }) => {
					canvas.paintAll('blue');
					if (canvas.keyboard.pressing) {
						console.log(canvas.keyboard);
					}
				},
				settings: {
					fps: 400,
					useKey: true,
					diagnostics: true,
				},
			}),
		];
	},
	{
		useIcons: true,
	},
);
