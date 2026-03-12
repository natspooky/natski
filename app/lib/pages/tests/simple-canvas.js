import {
	render,
	className,
	merge,
} from '../../../apis/encore/element-creator.js';
//import Canvas from '../../components/canvas.js';

import SimpleCanvas from '../../../apis/simple/simple-canvas.js';

function H1(props) {
	return { tag: 'h1', ...props };
}

function H2(props) {
	return { tag: 'h2', ...props };
}

function H3(props) {
	return { tag: 'h3', ...props };
}

function P(props) {
	return { tag: 'p', ...props };
}

function DIV({ children, ...props }) {
	return merge(
		{
			tag: 'div',
			style: {
				marginTop: '15px',
			},
			children,
		},
		props,
	);
}

function BUTTON(props) {
	return merge(
		{
			tag: 'button',
			style: {
				background: 'darkgray',
				border: '2px solid gray',
				borderRadius: '100vmax',
				padding: '5px 10px',
				margin: '5px',
				transition: '0.2s',
				':hover': {
					border: '2px solid darkgray',
					background: 'gray',
					transition: '0s',
				},
			},
		},
		props,
	);
}

function BorderContainer(props) {
	return merge(
		{
			tag: 'div',
			style: {
				border: '1px solid gray',
				padding: '10px',
				transition: '0.2s',
				':hover': {
					border: '1px solid white',
					transition: '0s',
				},
			},
		},
		props,
	);
}

function dummyText() {
	const dummy =
		'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum';
	const split = dummy.split(' ');
	return split[Math.floor(Math.random() * split.length)];
}

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
			page(),
		];
	},
	{
		useIcons: true,
	},
);

function page() {
	const createName = (name) => {
		return name
			.split(/(?=[A-Z])/)
			.map((word, index) => {
				if (index !== 0) return word.toLowerCase();
				return word.slice(0, 1).toUpperCase() + word.slice(1);
			})
			.join(' ');
	};

	return [MouseTests, KeyTests, RetinaTests].map((component) => {
		const element = component();

		return DIV({
			children: BorderContainer({
				children: [
					H1({ children: createName(component.name) }),
					DIV({
						children:
							!element.tag && !Array.isArray(element)
								? Object.entries(element).map(
										([key, value]) => {
											return BorderContainer({
												children: [
													H2({
														children:
															createName(key),
													}),
													value(),
												],
											});
										},
									)
								: element,
					}),
				],
			}),
		});
	});
}

function MouseTests() {
	const mouseSettings = {
		fps: 1000,
		cursor: {
			global: true,
			active: true,
			correctTransform: true,
		},
		diagnostics: true,
	};

	const setup = ({ context: ctx }) => {
		ctx.translate(100, 100);
		ctx.scale(0.8, 2);
		ctx.rotate(180);
	};

	const draw = ({ canvas, context: ctx }) => {
		canvas.paintAll('blue');

		const context = ctx;

		context.save();

		context.setTransform(1, 0, 0, 1, 0, 0);

		ctx.beginPath();
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.stroke();

		context.restore();

		if (canvas.cursor.covering) {
			const { x, y } = canvas.cursor.position;

			ctx.fillRect(x - 5, y - 5, 10, 10);
		}
	};

	function MouseTestFixedSize() {
		return Canvas({
			name: 'Mouse Fixed Size',
			setup,
			draw,
			settings: { ...mouseSettings, size: { width: 400, height: 400 } },
		});
	}

	function MouseTestDynamicSize() {
		return [
			Canvas({
				name: 'Mouse Fixed Size',
				setup,
				draw,
				settings: mouseSettings,
			}),
			Canvas({
				name: 'Mouse Fixed Size',
				setup,
				draw,
				settings: { ...mouseSettings, useRetina: false },
			}),
		];
	}

	return { MouseTestDynamicSize, MouseTestFixedSize };
}

function KeyTests() {
	const keySettings = {
		fps: 1000,
		key: {
			active: true,
		},

		diagnostics: true,
	};

	const draw = ({ canvas, context: ctx }) => {
		canvas.paintAll('blue');
		ctx.beginPath();
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.stroke();
	};

	function KeyTest() {
		return Canvas({ name: 'keyboard', draw, settings: keySettings });
	}

	return { KeyTest };
}

function RetinaTests() {
	const retinaSettings = {
		fps: 1000,
		key: {
			active: true,
		},

		diagnostics: true,
		useRetina: false,
	};

	const draw = ({ canvas, context: ctx }) => {
		canvas.paintAll('blue');
		ctx.beginPath();
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.stroke();
	};

	function Retina() {
		return [
			Canvas({
				name: 'Retina',
				draw,
				settings: { ...retinaSettings, useRetina: true },
			}),
			Canvas({
				name: 'Retina',
				draw,
				settings: {
					...retinaSettings,
					useRetina: true,
					size: { height: 400, width: 400 },
				},
			}),
		];
	}

	function NoRetina() {
		return [
			Canvas({
				name: 'No Retina',
				draw,
				settings: retinaSettings,
			}),
			Canvas({
				name: 'No Retina',
				draw,
				settings: {
					...retinaSettings,
					size: { height: 400, width: 400 },
				},
			}),
		];
	}

	return { Retina, NoRetina };
}
