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

	const compResize = (resizeData) => {
		resize?.({ canvas, context, ...resizeData });
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
		const sizeValue = 200;
		const size = { height: sizeValue, width: sizeValue };
		const fps = 6000;

		return [
			{
				tag: 'style',
				innerHTML: '.simple-canvas{width:300px;height:300px;}',
			},
			{
				tag: 'div',
				children: [
					{
						tag: 'p',
						children: 'Mouse Test',
					},
					{
						tag: 'div',
						children: [
							Canvas({
								name: 'Mouse Fixed Size',
								draw: ({ canvas, context: ctx }) => {
									canvas.paintAll('blue');
									if (canvas.keyboard.pressing) {
										console.log(canvas.keyboard);
									}
									if (canvas.cursor.covering) {
										const { x, y } = canvas.cursor.position;
										const { x: xVel, y: yVel } =
											canvas.cursor.velocity;

										const speed = canvas.cursor.speed;

										ctx.fillRect(x - 5, y - 5, 10, 10);
									}
								},
								settings: {
									fps,
									cursor: {
										global: true,
										active: true,
									},
									key: {
										active: true,
									},
									diagnostics: true,
									useRetina: true,
									size,
								},
							}),
							Canvas({
								name: 'Mouse Dynamic Size',
								draw: ({ canvas, context: ctx }) => {
									canvas.paintAll('blue');
									if (canvas.keyboard.pressing) {
										console.log(canvas.keyboard);
									}
									if (canvas.cursor.covering) {
										const { x, y } = canvas.cursor.position;

										ctx.fillRect(x - 5, y - 5, 10, 10);
									}
								},
								settings: {
									fps,
									cursor: {
										global: true,
										active: true,
									},
									key: {
										active: true,
									},
									diagnostics: true,
									useRetina: true,
								},
							}),
						],
					},
				],
			},
			{
				tag: 'div',
				children: [
					{
						tag: 'p',
						children: 'Key Test',
					},
					{
						tag: 'div',
						children: [
							Canvas({
								name: 'Key Test',
								draw: ({ canvas }) => {
									canvas.paintAll('blue');
								},

								settings: {
									fps,
									diagnostics: true,
								},
							}),
						],
					},
				],
			},
			Canvas({
				name: 'Resize Test',
				draw: ({ canvas }) => {
					canvas.paintAll('blue');
				},
				setup: ({ canvas }) => {
					console.log(canvas.context.getTransform());
				},
				resize: ({ top, left, width, height }) => {
					console.log(top, left, width, height);
				},
				settings: {
					fps,
					diagnostics: true,
				},
			}),
		];
	},
	{
		useIcons: true,
	},
);
