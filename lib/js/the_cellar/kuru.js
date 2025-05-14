import { default as SimpleCanvas } from '../../../api/simple-canvas/sc.js';

class kuru {
	#size = 0;
	#index = 0;
	#canvas;
	#position = { x: 0, y: 0 };
	constructor(canvas) {
		this.#canvas = canvas;
		this.#size = Math.min(
			this.#canvas.transformSize.width / 1.5,
			this.#canvas.transformSize.height / 1.5,
		);
		this.#position.x = this.#canvas.transformSize.width + this.#size;

		setInterval(() => {
			this.#index + 1 > 5 ? (this.#index = 0) : this.#index++;
		}, 50);
	}

	resize() {
		this.#size = Math.min(
			this.#canvas.transformSize.width / 2,
			this.#canvas.transformSize.height / 2,
		);
	}

	draw() {
		canvas.context.drawImage(
			pngStorage[this.#index],
			this.#position.x,
			this.#position.y - this.#size,
			this.#size,
			this.#size,
		);
		this.#position.x -= 2000 * canvas.renderTime;
	}

	get position() {
		return this.#position.x;
	}
}

let canvas,
	context,
	kuruStorage = [],
	pngStorage = [];

function setup() {
	for (let i = 0; i < 6; i++) {
		let png = new Image();
		png.src = `../../icon/misc/kuru/${i}.png`;
		pngStorage.push(png);
	}
	context = canvas.context;

	canvas.translate(0, canvas.canvasSize.y);
}

function resize() {
	kuruStorage = [];
}

function mouseDown() {
	kuruStorage.push(new kuru(canvas));
}

function draw() {
	context.fillStyle = '#ffffff';

	for (let i = kuruStorage.length - 1; i > 0; i--) {
		kuruStorage[i].draw();
		if (kuru.position < 0) {
			kuruStorage[i].splice(i, 1);
		}
	}
}

canvas = new SimpleCanvas('kuru', {
	fps: 120,
	autoClear: true,
	calculateFPS: true,
	calculateCursor: false,
	calculateKeyboard: false,
	showLayerPosition: true,
	calculateOverlay: true,
	useCursor: true,
	useKeyboard: true,
	useScroll: false,
	useTouch: false,
	detectResize: true,
	detectWindowFocus: true,
	detectIntersection: false,
});

canvas.setup(setup);
canvas.resize(resize);
canvas.mouseDown(mouseDown);
canvas.draw(draw);
