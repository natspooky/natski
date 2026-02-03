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
		const drawArray = [
			[
				{
					x: 185,
					y: 82.5,
				},
				{
					x: 182.5,
					y: 82.5,
				},
				{
					x: 175,
					y: 86.25,
				},
				{
					x: 163.75,
					y: 102.5,
				},
				{
					x: 152.5,
					y: 126.25,
				},
				{
					x: 138.75,
					y: 156.25,
				},
				{
					x: 125,
					y: 185,
				},
				{
					x: 118.75,
					y: 217.5,
				},
				{
					x: 112.5,
					y: 272.5,
				},
				{
					x: 113.75,
					y: 325,
				},
				{
					x: 115,
					y: 387.5,
				},
				{
					x: 132.5,
					y: 447.5,
				},
				{
					x: 156.25,
					y: 500,
				},
				{
					x: 191.25,
					y: 560,
				},
				{
					x: 230,
					y: 611.25,
				},
				{
					x: 276.25,
					y: 657.5,
				},
				{
					x: 331.25,
					y: 710,
				},
				{
					x: 396.25,
					y: 756.25,
				},
				{
					x: 450,
					y: 780,
				},
				{
					x: 492.5,
					y: 791.25,
				},
				{
					x: 562.5,
					y: 783.75,
				},
				{
					x: 675,
					y: 771.25,
				},
				{
					x: 782.5,
					y: 738.75,
				},
				{
					x: 825,
					y: 671.25,
				},
				{
					x: 846.25,
					y: 597.5,
				},
				{
					x: 860,
					y: 532.5,
				},
				{
					x: 865,
					y: 457.5,
				},
				{
					x: 863.75,
					y: 390,
				},
				{
					x: 860,
					y: 346.25,
				},
				{
					x: 860,
					y: 298.75,
				},
				{
					x: 867.5,
					y: 271.25,
				},
				{
					x: 872.5,
					y: 267.5,
				},
				{
					x: 872.5,
					y: 267.5,
				},
				{
					x: 872.5,
					y: 267.5,
				},
			],
		];
		return [
			{
				tag: 'style',
				innerHTML: `.simple-canvas
				{width:300px;height:300px;}
				.simple-canvas.large
				{width:100%;height:100vh;}`,
			},
			Canvas({
				name: 'wiggle',
				setup: ({ context: ctx }) => {
					ctx.translate(100, 100);
					ctx.scale(1, 1);
					ctx.strokeStyle = 'white';
					ctx.lineWidth = Math.floor(Math.random() * 5 + 1);
					ctx.lineCap = 'round';
					ctx.lineJoin = 'round';
					ctx.setLineDash(
						new Array(Math.floor(Math.random() * 8) + 2)
							.fill(0)
							.map(() => {
								return (
									Math.floor(
										Math.min(Math.random(), 0.5) * 40,
									) + 1
								);
							}),
					);
				},
				draw: ({ canvas, context: ctx }) => {
					const mouse = canvas.cursor;
					const key = canvas.keyboard;
					//	console.log(drawArray);
					canvas.paintAll('black');

					if (key.pressing) {
						console.log(key);
					}
					if (mouse.covering) {
						console.log(mouse.speed, mouse.moving);
						if (mouse.pressing) {
							drawArray.push({
								x: mouse.position.x,
								y: mouse.position.y,
							});
						}

						const { x, y } = mouse.position;

						if (mouse.pressing) ctx.fillStyle = 'red';
						if (mouse.moving) ctx.fillStyle = 'green';
						ctx.fillStyle = 'black';
						ctx.fillRect(x - 5, y - 5, 10, 10);
					}

					for (let i = 0; i < 2; i++) {
						drawArray.forEach((array, _, arrayL) => {
							if (!Array.isArray(array)) return;
							if (arrayL.length < 1) return;
							ctx.beginPath();
							array.forEach((item, index, arr) => {
								item = {
									x: item.x + 2 * Math.random() * 3,
									y: item.y + 2 * Math.random() * 3,
								};
								if (arr.length <= 1) return;
								if (index === 0) ctx.moveTo(item.x, item.y);
								ctx.lineTo(item.x, item.y);
							});
							ctx.stroke();
						});
					}
				},
				settings: {
					fps: 6,
					cursor: {
						global: true,
						active: true,
					},
					diagnostics: true,
					autoClear: true,
					useRetina: true,
				},
				classes: 'large',
			}),
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
