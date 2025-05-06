/* -----------------------------------------------
/* Author : NATSKI - natski.net
/* MIT license : https://opensource.org/license/MIT
/* GitHub : https://github.com/natspooky/simple-canvas
/* How to use? : Check the GitHub README or visit https://natski.net/SimpleCanvas
/* ----------------------------------------------- */

'use strict';

export default class stacker {
	#settings = {
		drawState: {
			drawing: false,
			paused: {
				user: false,
				intersection: false,
				focus: false,
			},
		},
		observer: {
			resize: true,
			intersection: true,
		},
		canvas: {
			clear: false,
		},
		fps: {
			value: 30,
			interval: 1000 / 30,
		},
		events: {
			mouse: false,
			touch: false,
			wheel: false,
			keyboard: false,
			focus: true,
		},
		eventSupport: {
			touch:
				'ontouchstart' in window ||
				navigator.maxTouchPoints > 0 ||
				navigator.msMaxTouchPoints > 0,
			wheel: 'onwheel' in document,
			hover: window.matchMedia('(hover: hover)').matches,
		},
		diagnostic: {
			positionLayerData: false,
			fpsData: false,
			cursorData: false,
			keyboardData: false,
			transformData: false,
			overlayData: false,
			data: {
				currentFPS: 0,
				frameDelta: [],
				fpsBuffer: 0,
				fpsBufferTwo: 0,
			},
		},
		sizing: {
			isFixedSize: false,
			fixedSize: {
				x: 0,
				y: 0,
			},
			retinaSize:
				window.devicePixelRatio > 1 ? window.devicePixelRatio : 1,
		},
		renderMode: {
			click: {
				move: false,
				down: false,
				up: false,
			},
			touch: {
				move: false,
				down: false,
				up: false,
			},
			wheel: false,
			keyboard: {
				down: false,
				up: false,
			},
			frameRate: true,
		},
	};

	#key = {
		keys: {},
		events: {
			pressed: false,
			repeating: false,
		},
		e: {
			key: 'c',

			code: 'KeyC',
			location: 0,
			altKey: false,
			ctrlKey: true,
			metaKey: false,
			shiftKey: false,
			repeat: false,
		},
	};

	#cursor = {
		position: {
			current: {
				x: 0,
				y: 0,
			},
			previous: {
				x: 0,
				y: 0,
			},
			click: {
				start: {
					x: 0,
					y: 0,
				},
				end: {
					x: 0,
					y: 0,
				},
			},
		},
		events: {
			pressed: false,
			hover: false,
			moving: false,
		},
		kinematics: {
			acceleration: {
				x: 0,
				y: 0,
			},
			velocity: {
				x: 0,
				y: 0,
			},
			speed: 0,
		},
	};

	#layers = {
		nodes: [],
	};

	#scroll = {
		events: {
			scrolling: false,
		},
	};

	#canvas = {
		dimensions: {
			position: {
				x: 0,
				y: 0,
			},
			sizes: {
				DOMSize: {
					x: 0,
					y: 0,
				},
				virtualSize: {
					x: 0,
					y: 0,
				},
				transformSize: {
					top: 0,
					left: 0,
					width: 0,
					height: 0,
				},
			},
			ratio: {
				DOMAspectRatio: 0,
				virtualAspectRatio: 0,
				transformAspectRatio: 0,
			},
		},
		transform: {
			current: {
				scale: {
					x: 1,
					y: 1,
				},
				translate: {
					x: 0,
					y: 0,
				},
			},
			saved: {
				scale: {
					x: 1,
					y: 1,
				},
				translate: {
					x: 0,
					y: 0,
				},
			},
		},
	};

	#listeners = {
		observers: [],
		events: [],
	};

	#functions = {
		user: {},
		observer: {},
	};

	#timers = {
		mouseMove: 0,
		wheel: 0,
		intersection: 0,
		rendering: {
			runTime: 0,
			render: 0,
		},
	};

	constructor(element, settings) {
		let canvas;

		if (
			typeof element === 'object' &&
			element.nodeType === Node.ELEMENT_NODE
		) {
			canvas = element;
		} else if (typeof element === 'string') {
			canvas = document.getElementById(element);

			if (canvas === null) {
				throw new Error('element ID has no corresponding HTMLElement');
			}
		} else {
			throw new Error('input is not a valid HTMLElement');
		}

		this.#canvas.body = canvas;
		this.#canvas.context = canvas.getContext('2d');

		//this.#setSettings(settings);

		/////////////////////////////// render mode

		//this.#setListeners();
	}

	static create(identifiers, settings) {
		if (typeof identifiers !== 'string') {
			throw new Error('cannot asign ID or class to canvas element');
		}

		let canvas = document.createElement('canvas'),
			identifiers = identifiers.split(' ');

		for (const value of identifiers) {
			switch (value.slice(0, 1)) {
				case '#':
					canvas.id = value.slice(1, value.length);
					break;
				case '.':
					canvas.classList.add(value.slice(1, value.length));
					break;
			}
		}
		return new SimpleCanvas(canvas, settings);
	}

	/* canvas getter functions */

	get element() {
		return this.#canvas.body;
	}

	get context() {
		return this.#canvas.context;
	}

	draw(func) {
		this.#functions.user.draw = func;

		if (this.#functions.user.setup) this.#functions.user.setup();

		if (!this.#settings.drawState.drawing) {
			this.#settings.drawState.drawing = true;
			this.#frame();
		}
	}

	async #frame() {
		let then = performance.now(),
			delta = 0,
			now = 0;

		while (this.#settings.drawState.drawing) {
			now = await new Promise(requestAnimationFrame);

			if (
				this.#settings.drawState.paused.user ||
				this.#settings.drawState.paused.intersection ||
				this.#settings.drawState.paused.focus ||
				now - then < this.#settings.fps.interval - delta
			)
				continue;

			this.#timers.rendering.render = (now - then) / 1000;
			this.#timers.rendering.runTime += this.#timers.rendering.render;

			delta = Math.min(
				this.#settings.fps.interval,
				delta + now - then - this.#settings.fps.interval,
			);
			then = now;

			this.#render();
		}
	}

	#render() {
		if (this.#settings.canvas.clear) this.clear();

		this.#functions.user.draw();

		//if (this.#settings.diagnostic.overlayData) this.#diagnostics();
	}
}

class component {
	#parent = {
		x,
		y,
		w,
		h,
	};
	#position = {};
	#size = {};
	#settings = {
		contain: false,
	};
	#scale = {};
	#childList = [];
	#userFunction = null;

	constructor(x, y, w, h, px, py, pw, ph) {
		this.#position.x = x;
		this.#position.y = y;
		this.#size.x = w;
		this.#size.y = h;
		this.#parent.x = px;
		this.#parent.y = py;
		this.#parent.w = pw;
		this.#parent.h = ph;
	}

	get width() {
		return this.#size.x;
	}

	get height() {
		return this.#size.y;
	}

	get left() {
		return this.#position.x;
	}

	get top() {
		return this.#position.y;
	}

	get pLeft() {
		return this.#parent.x;
	}

	get pTop() {
		return this.#parent.y;
	}

	get pWidth() {
		return this.#parent.w;
	}

	get pHeight() {
		return this.#parent.h;
	}

	set pLeft(int) {
		this.#parent.x = int;
	}

	set pTop(int) {
		this.#parent.y = int;
	}

	set pWidth(int) {
		this.#parent.w = int;
	}

	set pHeight(int) {
		this.#parent.h = int;
	}

	set width(w) {
		this.#size.x = w;
		this.updateChildren();
	}

	set height(h) {
		this.#size.y = h;
		this.updateChildren();
	}

	set left(x) {
		this.#position.x = x;
		this.updateChildren();
	}

	set top(y) {
		this.#position.y = y;
		this.updateChildren();
	}

	draw(func) {
		this.#userFunction = func;
	}

	appendChild(x, y, w, h) {
		this.#childList.push(
			new component(
				x,
				y,
				w,
				h,
				this.left,
				this.top,
				this.width,
				this.height,
			),
		);
	}

	updateChildren() {
		this.#childList.forEach((child) => {
			child.pLeft = this.left;
			child.ptop = this.top;
			child.pWidth = this.width;
			child.pHeight = this.height;
			child.updateChildren();
		});
	}

	render() {
		if (this.#userFunction) {
			this.#userFunction({
				x: (int) => {
					return this.left + this.pLeft + int;
				},
				y: (int) => {
					return this.top + this.pTop + int;
				},
				width: (int) => {
					return int;
				},
				height: (int) => {
					return int;
				},
			});
		}
	}
}

class SCLayerComponent {}

/// allow for full canvas transforms or specific layer transforms

//to do this add a global transform layer
