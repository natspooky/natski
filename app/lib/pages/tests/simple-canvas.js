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
		const sizeValue = 400;
		const size = { height: sizeValue, width: sizeValue };
		const fps = 1000;

		return [
			{
				tag: 'style',
				innerHTML: `.simple-canvas
				{width:300px;height:300px;}
				.simple-canvas.large
				{width:100%;height:100vh;}`,
			},
			Canvas({
				name: 'large Dynamic Size',
				setup: ({ context: ctx }) => {
					ctx.translate(100, 100);
					ctx.scale(1, 1);
				},
				draw: ({ canvas, context: ctx }) => {
					const mouse = canvas.cursor;
					const key = canvas.keyboard;

					canvas.paintAll('#ff000010');
					if (key.pressing) {
						console.log(key);
					}
					if (mouse.covering) {
						const { x, y } = mouse.position;

						if (mouse.pressing) ctx.fillStyle = 'red';
						if (mouse.moving) ctx.fillStyle = 'green';

						ctx.fillRect(x - 5, y - 5, 10, 10);

						ctx.fillStyle = 'black';
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
					autoClear: false,
					useRetina: true,
				},
				classes: 'large',
			}),
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
								setup: ({ canvas, context: ctx }) => {
									ctx.translate(100, 100);
									ctx.scale(0.8, 2);
								},
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
								setup: ({ canvas, context: ctx }) => {
									ctx.translate(100, 100);
									ctx.scale(0.8, 2);
								},
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
									size,
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
			Canvas({
				name: 'clock',
				setup: ({ canvas, context: ctx }) => {},
				draw: ({ canvas, context: ctx }) => {
					canvas.paintAll('white');
					const w = canvas.width;
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
		];
	},
	{
		useIcons: true,
	},
);
