/* -----------------------------------------------
/* Author : NATSKI - natski.dev
/* MIT license : https://opensource.org/license/MIT
/* GitHub : https://github.com/natspooky/simple-canvas
/* How to use? : Check the GitHub README or visit https://natski.dev/api/simple-canvas
/* ----------------------------------------------- */

export default class SimpleCanvas {
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
			resize: false,
			intersection: false,
		},
		canvas: {
			clear: false,
		},
		fps: {
			set: 30,
			interval: 1000 / 30,
		},
		events: {
			mouse: false,
			touch: false,
			wheel: false,
			keyboard: false,
			focus: false,
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
			touchData: false,
			wheelData: false,
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
		keys: {
			current: null,
			previous: null,
			active: {},
			pressCount: 0,
		},
		events: {
			pressed: false,
			repeating: false,
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
			size: {
				DOMSize: {
					x: 0,
					y: 0,
				},
				canvasSize: {
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
				canvasAspectRatio: 0,
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
		time: {
			runTime: 0,
			render: 0,
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

		this.#setSettings(settings);

		/////////////////////////////// render mode

		this.#setListeners();
		this.#updateCanvasData();
	}

	static create(identifiers, settings) {
		if (typeof identifiers !== 'string') {
			throw new Error('cannot asign ID or class to canvas element');
		}

		let canvas = document.createElement('canvas');

		identifiers = identifiers.split(' ');

		for (const value of identifiers) {
			switch (value.slice(0, 1)) {
				case '#':
					canvas.id = value.slice(1, value.length);
					break;
				case '.':
					canvas.classList.add(value.slice(1, value.length));
					break;
				default:
					throw new Error('entry is not an ID or Class');
			}
		}

		return new SimpleCanvas(canvas, settings);
	}

	#setSettings(settings) {
		const check = (value) => {
			if (value === undefined || value === null) return false;
			return true;
		};

		//fps
		if (check(settings.fps)) {
			this.#settings.fps.set = settings.fps;
			this.#settings.fps.interval = 1000 / settings.fps;
		}

		//clear
		this.#settings.canvas.clear = check(settings.autoClear)
			? settings.autoClear
			: false;

		//events
		this.#settings.events.mouse = check(settings.useCursor)
			? settings.useCursor
			: false;
		this.#settings.events.touch = check(settings.useTouch)
			? settings.useTouch
			: false;
		this.#settings.events.wheel = check(settings.useWheel)
			? settings.useWheel
			: false;
		this.#settings.events.keyboard = check(settings.useKeyboard)
			? settings.useKeyboard
			: false;
		this.#settings.events.focus = check(settings.detectWindowFocus)
			? settings.detectWindowFocus
			: false;

		//diagnostic
		this.#settings.diagnostic.positionLayerData = check(
			settings.showLayerPosition,
		)
			? settings.showLayerPosition
			: false;
		this.#settings.diagnostic.fpsData = check(settings.calculateFPS)
			? settings.calculateFPS
			: false;
		this.#settings.diagnostic.cursorData = check(settings.calculateCursor)
			? settings.calculateCursor
			: false;
		this.#settings.diagnostic.keyboardData = check(
			settings.calculateKeyboard,
		)
			? settings.calculateKeyboard
			: false;
		this.#settings.diagnostic.wheelData = check(settings.calculateWheel)
			? settings.calculateWheel
			: false;
		this.#settings.diagnostic.touchData = check(settings.calculateTouch)
			? settings.calculateTouch
			: false;
		this.#settings.diagnostic.overlayData = check(settings.calculateOverlay)
			? settings.calculateOverlay
			: false;

		//observer
		this.#settings.observer.resize = check(settings.detectResize)
			? settings.detectResize
			: true;
		this.#settings.observer.intersection = check(
			settings.detectIntersection,
		)
			? settings.detectIntersection
			: false;

		//sizing
		if (check(settings.size)) {
			this.#settings.sizing.isFixedSize = true;
			this.#settings.sizing.fixedSize = settings.size;
			this.#canvas.dimensions.size.canvasSize = settings.size;
		}
	}

	/* canvas getter functions */

	get element() {
		return this.#canvas.body;
	}

	get context() {
		return this.#canvas.context;
	}

	/* canvas sizing getter functions */

	get DOMSize() {
		return this.#canvas.dimensions.size.DOMSize;
	}

	get canvasSize() {
		return this.#canvas.dimensions.size.canvasSize;
	}

	get transformSize() {
		return this.#canvas.dimensions.size.transformSize;
	}

	get DOMAspectRatio() {
		return this.#canvas.dimensions.ratio.DOMAspectRatio;
	}

	get canvasAspectRatio() {
		return this.#canvas.dimensions.ratio.canvasAspectRatio;
	}

	get transformAspectRatio() {
		return this.#canvas.dimensions.ratio.transformAspectRatio;
	}

	/* cursor getter functions */

	get cursor() {
		return this.#cursor;
	}

	get cursorEvents() {
		return this.#cursor.events;
	}

	get cursorPosition() {
		return this.cursor.position.current;
	}

	get cursorPreviousPosition() {
		return this.#cursor.position.previous;
	}

	get cursorClickPosition() {
		return this.#cursor.position.click;
	}

	/* keyboard getter functions */

	get keyboard() {
		return this.#key;
	}

	get currentKey() {
		return this.#key.keys.current;
	}

	get previousKey() {
		return this.#key.keys.previous;
	}

	get activeKeys() {
		return this.#key.keys.active;
	}

	get keyboardEvents() {
		return this.#key.events;
	}

	/* transform getter functions */

	get canvasScale() {
		return this.#canvas.transform.current.scale;
	}

	get canvasTranslate() {
		return this.#canvas.transform.current.translate;
	}

	/* timing getter functions */

	get renderTime() {
		return this.#canvas.time.render;
	}

	get runTime() {
		return this.#canvas.time.runTime;
	}

	/* canvas setter functions */

	/**
	 * @param {number} value
	 */

	set fps(value) {
		this.#settings.fps.set = value;
		this.#settings.fps.interval = 1000 / value;
	}

	/**
	 * @param {object} size
	 */

	set size(size) {
		this.#canvas.dimensions.size.canvasSize = size;
		this.#settings.sizing.fixedSize = size;
		this.#settings.sizing.isFixedSize = true;

		this.#updateCanvasData();
	}

	/* user mouse / touch event functions */

	mouseMove(func) {
		this.#functions.user.mouseMove = func;
	}

	mouseEnter(func) {
		this.#functions.user.mouseEnter = func;
	}

	mouseLeave(func) {
		this.#functions.user.mouseLeave = func;
	}

	mouseDown(func) {
		this.#functions.user.mouseDown = func;
	}

	mouseUp(func) {
		this.#functions.user.mouseUp = func;
	}

	touchStart(func) {
		this.#functions.user.touchStart = func;
	}

	touchEnd(func) {
		this.#functions.user.touchEnd = func;
	}

	touchMove(func) {
		this.#functions.user.touchMove = func;
	}

	wheel(func) {
		this.#functions.user.wheel = func;
	}

	leftClick(func) {
		this.#functions.user.leftClick = func;
	}

	rightClick(func) {
		this.#functions.user.rightClick = func;
	}

	middleClick(func) {
		this.#functions.user.middleClick = func;
	}

	/* user keyboard event functions */

	keyDown(func) {
		this.#functions.user.keyDown = func;
	}

	keyUp(func) {
		this.#functions.user.keyUp = func;
	}

	/* user misc event functions */

	resize(func) {
		this.#functions.user.resize = func;
	}

	/* SC mouse / touch event functions */

	#mouseMove(event) {
		this.#cursor.position.previous = this.#cursor.position.current;

		if (this.#settings.sizing.isFixedSize) {
			this.#cursor.position.current = this.#fixedSize(event);
		} else {
			this.#cursor.position.current = this.#dynamicSize(event);
		}

		clearTimeout(this.#timers.mouseMove);
		this.#cursor.events.moving = true;

		this.#timers.mouseMove = setTimeout(() => {
			this.#cursor.events.moving = false;
		}, 10);

		this.#functions.user.mouseMove?.();

		if (this.#settings.renderMode.click.move) this.#functions.user.draw?.();
	}

	#dynamicSize(event) {
		return {
			x:
				(event.pageX - this.#canvas.dimensions.position.x) /
					(this.#canvas.transform.current.scale.x /
						this.#settings.sizing.retinaSize) +
				this.#canvas.dimensions.size.transformSize.left,
			y:
				(event.pageY - this.#canvas.dimensions.position.y) /
					(this.#canvas.transform.current.scale.y /
						this.#settings.sizing.retinaSize) +
				this.#canvas.dimensions.size.transformSize.top,
		};
	}

	#fixedSize(event) {
		return {
			x:
				(event.pageX - this.#canvas.dimensions.position.x) /
					((this.#canvas.dimensions.size.DOMSize.x /
						this.#canvas.dimensions.size.canvasSize.x) *
						this.#canvas.transform.current.scale.x) +
				this.#canvas.dimensions.size.transformSize.left,
			y:
				(event.pageY - this.#canvas.dimensions.position.y) /
					((this.#canvas.dimensions.size.DOMSize.y /
						this.#canvas.dimensions.size.canvasSize.y) *
						this.#canvas.transform.current.scale.y) +
				this.#canvas.dimensions.size.transformSize.top,
		};
	}

	#mouseEnter(event) {
		this.#cursor.events.hover = true;

		this.#functions.user.mouseEnter?.();
	}

	#mouseLeave(event) {
		this.#cursor.events.hover = false;

		this.#functions.user.mouseLeave?.();
	}

	#mouseDown(event) {
		this.#cursor.events.pressed = true;

		this.#cursor.position.click.start = this.#cursor.position.current;

		this.#functions.user.mouseDown?.();

		if (this.#settings.renderMode.click.down) this.#functions.user.draw?.();
	}

	#mouseUp(event) {
		this.#cursor.events.pressed = false;

		this.#cursor.position.click.end = this.#cursor.position.current;

		this.#functions.user.mouseUp?.();

		if (this.#settings.renderMode.click.up) this.#functions.user.draw?.();
	}

	#click(event) {
		switch (event.button) {
			case 0:
				this.#functions.user.leftClick?.();
				break;
			case 1:
				this.#functions.user.rightClick?.();
				break;
			case 2:
				this.#functions.user.middleClick?.();
				break;
		}
	}

	#contextMenu(event) {
		event.preventDefault();
	}

	#wheel(event) {
		event.preventDefault();

		this.#scroll.events.scrolling = true;

		clearTimeout(this.#timers.wheel);
		this.#timers.wheel = setTimeout(() => {
			this.#scroll.events.scrolling = false;
		}, 10);

		this.#functions.user.wheel?.();

		if (this.#settings.renderMode.wheel) this.#functions.user.draw?.();
	}

	#touchMove(event) {
		event.preventDefault();

		this.#functions.user.touchMove?.();

		if (this.#settings.renderMode.touch.move) this.#functions.user.draw?.();
	}

	#touchStart(event) {
		this.#functions.user.touchStart?.();

		if (this.#settings.renderMode.touch.down) this.#functions.user.draw?.();
	}

	#touchEnd(event) {
		this.#functions.user.touchStart?.();

		if (this.#settings.renderMode.touch.up) this.#functions.user.draw?.();
	}

	/* SC keyboard event functions */

	#keyUp(event) {
		this.#key.keys.pressCount--;
		if (this.#key.keys.pressCount < 1) {
			this.#key.events.pressed = false;
			this.#key.events.repeating;
		}

		this.#key.keys.active[event.key] = null;

		this.#functions.user.keyUp?.();

		if (this.#settings.renderMode.keyboard.up)
			this.#functions.user.draw?.();
	}

	#keyDown(event) {
		this.#key.keys.previous = this.#key.keys.current;
		this.#key.keys.current = event.key;

		this.#key.events.pressed = true;
		this.#key.events.repeating = event.repeat;
		this.#key.keys.pressCount++;
		this.#key.keys.active[event.key] = true;

		this.#functions.user.keyDown?.();

		if (this.#settings.renderMode.keyboard.down)
			this.#functions.user.draw?.();
	}

	/* SC misc event functions */

	#windowResize() {
		this.#updateCanvasPosition();
	}

	#canvasResize() {
		this.#updateCanvasData();

		this.#applyTransforms();

		this.#functions.user.resize?.();

		this.#functions.user.draw?.();

		if (this.#settings.diagnostic.overlayData) this.#diagnostics();
	}

	#applyTransforms() {
		this.#canvas.context.scale(
			this.#canvas.transform.current.scale.x,
			this.#canvas.transform.current.scale.y,
		);
		this.#canvas.context.translate(
			this.#canvas.transform.current.translate.x,
			this.#canvas.transform.current.translate.y,
		);
	}

	#intersection(entries) {
		entries.forEach((entry) => {
			if (entry.intersectionRatio >= 0.2) {
				clearTimeout(this.#timers.intersection);
				this.#settings.drawState.paused.intersection = false;
			} else {
				this.#timers.intersection = setTimeout(() => {
					this.#settings.drawState.paused.intersection = true;
				}, 200);
			}
		});
	}

	#focus() {
		this.#settings.drawState.paused.focus = false;
	}

	#blur() {
		this.#settings.drawState.paused.focus = true;
	}

	/* canvas context functions */

	save() {
		this.#canvas.transform.saved = this.#canvas.transform.current;
		this.#canvas.context.save();
	}

	restore() {
		this.#canvas.transform.current = this.#canvas.transform.saved;
		this.#canvas.context.restore();

		this.#updateTransformSize();
	}

	reset() {
		this.#canvas.transform.current = this.#canvas.transform.saved =
			this.#resetTransformValues();

		this.#canvas.context.reset();

		this.#updateTransformSize();
	}

	/* painting & clearing functions */

	clear() {
		this.#canvas.context.clearRect(
			this.#canvas.dimensions.size.transformSize.left,
			this.#canvas.dimensions.size.transformSize.top,
			this.#canvas.dimensions.size.transformSize.width,
			this.#canvas.dimensions.size.transformSize.height,
		);
	}

	paint(color) {
		this.save();

		if (color !== undefined) {
			this.#canvas.context.fillStyle = color;
		}

		this.#canvas.context.fillRect(
			this.#canvas.dimensions.size.transformSize.left,
			this.#canvas.dimensions.size.transformSize.top,
			this.#canvas.dimensions.size.transformSize.width,
			this.#canvas.dimensions.size.transformSize.height,
		);

		this.restore();
	}

	/* transform functions */

	scale(x, y) {
		this.#canvas.context.scale(x, y);

		this.#canvas.transform.current.scale.x *= x;
		this.#canvas.transform.current.scale.y *= y;

		this.#updateTransformSize();
	}

	translate(x, y) {
		this.#canvas.context.translate(x, y);

		this.#canvas.transform.current.translate.x +=
			x * this.#canvas.transform.current.scale.x;
		this.#canvas.transform.current.translate.y +=
			y * this.#canvas.transform.current.scale.y;

		this.#updateTransformSize();
	}

	resetTransform() {
		this.#canvas.context.resetTransform();

		this.#canvas.transform.current = this.#resetTransformValues();

		this.#updateTransformSize();
	}

	#resetTransformValues() {
		if (this.#settings.sizing.isFixedSize)
			return {
				scale: {
					x: 1,
					y: 1,
				},
				translate: {
					x: 0,
					y: 0,
				},
			};

		return {
			scale: {
				x: 1 * this.#settings.sizing.retinaSize,
				y: 1 * this.#settings.sizing.retinaSize,
			},
			translate: {
				x: 0,
				y: 0,
			},
		};
	}

	/* drawing functions */

	setup(func) {
		this.#functions.user.setup = func;
	}

	draw(func) {
		this.#functions.user.draw = func;

		this.#updateCanvasData();

		this.#functions.user.setup?.();

		if (
			!this.#settings.drawState.drawing &&
			this.#settings.renderMode.frameRate
		) {
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

			this.#canvas.time.render = (now - then) / 1000;
			this.#canvas.time.runTime += this.#canvas.time.render;

			delta = Math.min(
				this.#settings.fps.interval,
				delta + now - then - this.#settings.fps.interval,
			);
			then = now;

			if (this.#settings.canvas.clear) this.clear();

			this.#functions.user.draw();

			if (this.#settings.diagnostic.overlayData) this.#diagnostics();
		}
	}

	/* SC diagnostic functions */

	#diagnostics() {
		this.save();

		this.#canvas.context.font = '24px serif';

		if (this.#settings.diagnostic.positionLayerData)
			this.#positionLayerData();

		this.resetTransform();

		this.#canvas.context.fillStyle = this.#canvas.context.strokeStyle =
			'#ffffff';

		if (this.#settings.diagnostic.fpsData) this.#fpsData();

		if (this.#settings.diagnostic.cursorData) this.#cursorData();

		if (this.#settings.diagnostic.keyboardData) this.#keyboardData();

		if (this.#settings.diagnostic.transformData) this.#transformData();

		this.restore();
	}

	#positionLayerData() {
		this.#canvas.context.fillStyle = this.#canvas.context.strokeStyle =
			'#0000ff';

		this.#canvas.context.strokeRect(
			this.#canvas.dimensions.size.transformSize.left,
			this.#canvas.dimensions.size.transformSize.top,
			this.#canvas.dimensions.size.transformSize.width,
			this.#canvas.dimensions.size.transformSize.height,
		);

		this.#canvas.context.beginPath();
		this.#canvas.context.moveTo(
			this.#canvas.dimensions.size.transformSize.left,
			this.#canvas.dimensions.size.transformSize.top,
		);
		this.#canvas.context.lineTo(
			this.#canvas.dimensions.size.transformSize.left +
				this.#canvas.dimensions.size.transformSize.width,
			this.#canvas.dimensions.size.transformSize.top +
				this.#canvas.dimensions.size.transformSize.height,
		);
		this.#canvas.context.stroke();

		this.#canvas.context.fillText(
			'Transform',
			this.#canvas.dimensions.size.transformSize.left + 10,
			this.#canvas.dimensions.size.transformSize.top +
				this.#canvas.dimensions.size.transformSize.height -
				10,
		);

		this.#canvas.context.fillStyle = this.#canvas.context.strokeStyle =
			'#00ff00';

		this.#canvas.context.strokeRect(
			0,
			0,
			this.#canvas.dimensions.size.canvasSize.x,
			this.#canvas.dimensions.size.canvasSize.y,
		);

		this.#canvas.context.beginPath();
		this.#canvas.context.moveTo(
			0,
			this.#canvas.dimensions.size.canvasSize.y,
		);
		this.#canvas.context.lineTo(
			this.#canvas.dimensions.size.canvasSize.x,
			0,
		);
		this.#canvas.context.stroke();

		this.#canvas.context.fillText(
			'Canvas',
			this.#canvas.dimensions.size.canvasSize.x - 80,
			this.#canvas.dimensions.size.canvasSize.y - 10,
		);

		this.#canvas.context.fillStyle = this.#canvas.context.strokeStyle =
			'#ff0000';

		this.#canvas.context.strokeRect(
			0,
			0,
			this.#canvas.dimensions.size.DOMSize.x,
			this.#canvas.dimensions.size.DOMSize.y,
		);

		this.#canvas.context.beginPath();
		this.#canvas.context.moveTo(0, 0);
		this.#canvas.context.lineTo(
			this.#canvas.dimensions.size.DOMSize.x,
			this.#canvas.dimensions.size.DOMSize.y,
		);
		this.#canvas.context.stroke();

		this.#canvas.context.fillText(
			'Document',
			this.#canvas.dimensions.size.DOMSize.x - 110,
			25,
		);
	}

	#fpsData() {
		this.#canvas.context.fillStyle = '#00000040';
		this.#canvas.context.fillRect(10, 10, 210, 70);
		this.#canvas.context.fillStyle = '#ffffff';
		if (this.#settings.diagnostic.data.fpsBufferTwo >= 1) {
			this.#settings.diagnostic.data.currentFPS =
				this.#settings.diagnostic.data.fpsBuffer;
			this.#settings.diagnostic.data.fpsBuffer = 0;
			this.#settings.diagnostic.data.fpsBufferTwo = 0;
		} else {
			this.#settings.diagnostic.data.fpsBuffer++;
			this.#settings.diagnostic.data.fpsBufferTwo +=
				this.#canvas.time.render;
		}

		if (this.#settings.diagnostic.data.frameDelta.length >= 50) {
			this.#settings.diagnostic.data.frameDelta.shift();
		}

		this.#settings.diagnostic.data.frameDelta.push(
			Math.min(this.#settings.fps.set * this.#canvas.time.render, 50),
		);

		this.#settings.diagnostic.data.frameDelta.forEach((item, index) => {
			this.#canvas.context.fillRect(index + 20, 70 - item, 1, item);
		});

		this.#canvas.context.fillText(
			`current: ${this.#settings.diagnostic.data.currentFPS}`,
			90,
			65,
		);
		this.#canvas.context.fillText(
			`target: ${this.#settings.fps.set}`,
			90,
			40,
		);
	}

	#cursorData() {}

	#keyboardData() {}

	#transformData() {}

	/* SC event & observer setting functions */

	#createObserver(data) {
		this.#functions.observer[data.observerName] = new data.observerName(
			data.observerFunction.bind(this),
			data.observerOptions,
		);

		this.#functions.observer[data.observerName].observe(data.targetElement);

		this.#listeners.observers.push(data);
	}

	#generateThreshholdList() {
		let thresholds = [],
			numSteps = 50;
		for (let i = 1.0; i <= numSteps; i++) {
			let ratio = i / numSteps;
			thresholds.push(ratio);
		}
		thresholds.push(0);
		return thresholds;
	}

	#clearObservers() {
		this.#listeners.observers.forEach((data) => {
			this.#functions.observer[data.observerName].disconnect();
		});
	}

	#createEvent(data) {
		data.hostElement.addEventListener(
			data.eventName,
			data.eventFunction.bind(this),
			data.eventOptions,
		);
		this.#listeners.events.push(data);
	}

	#clearEvents() {
		this.#listeners.events.forEach((data) => {
			data.hostElement.removeEventListener(
				data.eventName,
				data.eventFunction.bind(this),
			);
		});
	}

	#setListeners() {
		if (this.#settings.observer.resize) {
			this.#createObserver({
				observerName: ResizeObserver,
				observerFunction: this.#canvasResize,
				observerOptions: '',
				targetElement: this.#canvas.body,
			});

			this.#createEvent({
				hostElement: window,
				eventName: 'resize',
				eventFunction: this.#windowResize,
				eventOptions: false,
			});
		}

		if (this.#settings.observer.intersection) {
			this.#createObserver({
				observerName: IntersectionObserver,
				observerFunction: this.#intersection,
				observerOptions: {
					root: null,
					rootMargin: '0px',
					threshold: this.#generateThreshholdList(),
				},
				targetElement: this.#canvas.body,
			});
		}

		if (this.#settings.events.focus) {
			this.#createEvent({
				hostElement: window,
				eventName: 'focus',
				eventFunction: this.#focus,
				eventOptions: false,
			});
			this.#createEvent({
				hostElement: window,
				eventName: 'blur',
				eventFunction: this.#blur,
				eventOptions: false,
			});
		}

		if (this.#settings.events.keyboard) {
			this.#createEvent({
				hostElement: document,
				eventName: 'keyup',
				eventFunction: this.#keyUp,
				eventOptions: false,
			});
			this.#createEvent({
				hostElement: document,
				eventName: 'keydown',
				eventFunction: this.#keyDown,
				eventOptions: false,
			});
		}

		if (this.#settings.events.scroll && this.#settings.eventSupport.wheel) {
			this.#createEvent({
				hostElement: this.#canvas.body,
				eventName: 'wheel',
				eventFunction: this.#wheel,
				eventOptions: true,
			});
		}

		if (this.#settings.events.mouse) {
			if (this.#settings.eventSupport.hover) {
				this.#createEvent({
					hostElement: this.#canvas.body,
					eventName: 'mouseenter',
					eventFunction: this.#mouseEnter,
					eventOptions: false,
				});

				this.#createEvent({
					hostElement: this.#canvas.body,
					eventName: 'mouseleave',
					eventFunction: this.#mouseLeave,
					eventOptions: false,
				});
			}

			this.#createEvent({
				hostElement: this.#canvas.body,
				eventName: 'mousemove',
				eventFunction: this.#mouseMove,
				eventOptions: false,
			});

			this.#createEvent({
				hostElement: this.#canvas.body,
				eventName: 'mousedown',
				eventFunction: this.#mouseDown,
				eventOptions: false,
			});

			this.#createEvent({
				hostElement: document,
				eventName: 'mouseup',
				eventFunction: this.#mouseUp,
				eventOptions: false,
			});

			this.#createEvent({
				hostElement: this.#canvas.body,
				eventName: 'click',
				eventFunction: this.#click,
				eventOptions: false,
			});

			this.#createEvent({
				hostElement: this.#canvas.body,
				eventName: 'contextmenu',
				eventFunction: this.#contextMenu,
				eventOptions: false,
			});
		}

		if (this.#settings.events.touch && this.#settings.eventSupport.touch) {
			this.#createEvent({
				hostElement: this.#canvas.body,
				eventName: 'touchstart',
				eventFunction: this.#touchStart,
				eventOptions: false,
			});
			this.#createEvent({
				hostElement: this.#canvas.body,
				eventName: 'touchend',
				eventFunction: this.#touchEnd,
				eventOptions: false,
			});

			this.#createEvent({
				hostElement: this.#canvas.body,
				eventName: 'touchmove',
				eventFunction: this.#touchMove,
				eventOptions: true,
			});
		}
	}

	/* SC canvas size & position functions */

	#updateCanvasData() {
		this.#updateDOMSize();
		this.#updateCanvasSize();
		this.#updateTransformSize();
		this.#updateCanvasPosition();
	}

	#updateDOMSize() {
		this.#canvas.dimensions.size.DOMSize = {
			x: this.#canvas.body.offsetWidth,
			y: this.#canvas.body.offsetHeight,
		};

		this.#canvas.dimensions.ratio.DOMAspectRatio =
			this.#canvas.dimensions.size.DOMSize.x /
			this.#canvas.dimensions.size.DOMSize.y;
	}

	#updateCanvasSize() {
		this.save();

		if (this.#settings.sizing.isFixedSize) {
			this.#canvas.dimensions.size.canvasSize =
				this.#settings.sizing.fixedSize;
		} else {
			this.#canvas.dimensions.size.canvasSize.x =
				this.#canvas.dimensions.size.DOMSize.x *
				this.#settings.sizing.retinaSize;
			this.#canvas.dimensions.size.canvasSize.y =
				this.#canvas.dimensions.size.DOMSize.y *
				this.#settings.sizing.retinaSize;
		}

		this.#canvas.dimensions.ratio.canvasAspectRatio =
			this.#canvas.dimensions.size.canvasSize.x /
			this.#canvas.dimensions.size.canvasSize.y;

		this.#canvas.body.width = this.#canvas.dimensions.size.canvasSize.x;
		this.#canvas.body.height = this.#canvas.dimensions.size.canvasSize.y;

		this.restore();
	}

	#updateTransformSize() {
		this.#canvas.dimensions.size.transformSize = {
			top: 0 - this.#canvas.transform.current.translate.y,
			left: 0 - this.#canvas.transform.current.translate.x,
			height:
				this.#canvas.dimensions.size.canvasSize.y /
				this.#canvas.transform.current.scale.y,
			width:
				this.#canvas.dimensions.size.canvasSize.x /
				this.#canvas.transform.current.scale.x,
		};

		this.#canvas.dimensions.ratio.transformAspectRatio =
			this.#canvas.dimensions.size.transformSize.width /
			this.#canvas.dimensions.size.transformSize.height;
	}

	#updateCanvasPosition() {
		const box = this.#canvas.body.getBoundingClientRect();

		const body = document.body;
		const docEl = document.documentElement;

		const scrollTop = docEl.scrollTop || body.scrollTop;
		const scrollLeft = docEl.scrollLeft || body.scrollLeft;

		const clientTop = docEl.clientTop || body.clientTop || 0;
		const clientLeft = docEl.clientLeft || body.clientLeft || 0;

		this.#canvas.dimensions.position = {
			x: Math.round(box.left + scrollLeft - clientLeft),
			y: Math.round(box.top + scrollTop - clientTop),
		};
	}

	/* exit functions */

	disconnect() {
		this.endDraw();
		this.#clearObservers();
		this.#clearEvents();
	}

	endDraw() {
		this.#settings.drawState.drawing = false;
	}

	pause() {
		this.#settings.drawState.paused.user = true;
	}

	play() {
		this.#settings.drawState.paused.user = false;
	}
}

//new simple canvas

//
//
// actually make dispatching events work this time considering it is a closed system
//
//


const append = new Event("append")


class Canvas {
	#supportedEvents = {
		mousedown: true,
		mousemove: true,
		mouseup: true,

		touch:
			'ontouchstart' in window ||
			navigator.maxTouchPoints > 0 ||
			navigator.msMaxTouchPoints > 0,
		wheel: 'onwheel' in document,
		hover: window.matchMedia('(hover: hover)').matches,
	};

	#customEvents = {
		append: undefined,
	};

	#eventListeners = {};
	#wheelState = {};
	#keyState = {};
	#mouseState = {
		pressed: false,

		motion: {
			position: {
				x: undefined,
				y: undefined,
			},
			lastPostion: {
				x: undefined,
				y: undefined,
			},
			vel: {},
		},
	};
	#canvasState = {
		canvas: undefined,
		context: undefined,
		inDocument: false,
		size: {
			width: 0,
			height: 0,
			locked: false,
		},
	};
	#transformState = {};
	#drawingState = {
		drawing: false,
		drawFn: undefined,
	};

	constructor(canvas, settings = {}) {
		this.#mergeSettings(settings);

		let canvasElement;

		switch (typeof canvas) {
			case 'string':
				canvasElement = document.getElementById(canvas);
				if (!canvasElement) throw new Error('brokey asf');
				break;
			case 'object':
				if (
					!(
						(canvas.tagName === 'CANVAS') &
						(canvas.nodeType === Node.ELEMENT_NODE)
					)
				) {
					throw new Error();
				}

				canvasElement = canvas;

				break;
			default:
				throw new Error('uh oh');
		}

		if (!document.body.contains(canvasElement)) {
			canvasElement.addEventListener("append")
			this.#awaitAppend(canvasElement, () => {});
		}

		//checkDOMconnected();
	}

	//user functions

	static create(identifiers, settings) {
		const element = document.createElement('canvas');

		identifiers.split(' ').forEach((identifier) => {
			switch (identifier.slice(0, 1)) {
				case '#':
					element.id = identifier.slice(1);
					break;
				case '.':
					element.classList.add(identifier.slice(1));
					break;
				default:
					console.error('passed param is not a className or ID');
			}
		});

		return new Canvas(element, settings);
	}

	start() {}

	stop() {}

	on(eventName, listener, options = {}) {
		if (!this.#supportedEvents[eventName]) {
			console.log('uh oh');
		}
		this.#eventListeners[eventName] = { listener, options };
	}

	removeEvent(eventName) {
		if (!this.#supportedEvents[eventName]) {
			console.log('uh oh');
		}

		this.canvas.element.removeEventListener(
			eventName,
			this.#eventListeners[eventName],
		);
		delete this.#eventListeners[eventName];
	}

	//util

	#mergeSettings(userSettings) {
		const defaultSettings = {
			fps: 60,
			autoClear: true,

			useCursor: false,
			useTouch: false,
			useWheel: false,
			useKey: false,
			detectWindowFocus: false,
			autoResize: true,
		};

		this.settings = {
			...defaultSettings,
			...userSettings,
		};
	}

	#removeEvents() {}

	#createEvents() {
		if (this.settings.autoResize) {
			window.addEventListener() {}
		}

		//

		//mouse

		if (this.settings.useCursor) {
			const mouseOptions = {
				capture: false,
				once: false,
				passive: false,
			};

			this.canvas.element.addEventListener('mouseup', fn, mouseOptions);
			this.canvas.element.addEventListener('mousedown', fn, mouseOptions);
			this.canvas.element.addEventListener('mousemove', fn, mouseOptions);
		}

		//keyboard

		if (this.settings.useKey) {
			const keyOptions = {
				capture: false,
				once: false,
				passive: false,
			};

			this.canvas.element.addEventListener('keyup', fn, keyOptions);
			this.canvas.element.addEventListener('keydown', fn, keyOptions);
		}
	}

	#awaitAppend(element, callback) {
		const isAppended = (element) => {
			while (element.parentNode) element = element.parentNode;
			return element instanceof Document;
		};

		if (isAppended(element)) {
			element.dispatchEvent(this.#customEvents.append);
			//	callback(element);
			return;
		}

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.addedNodes.length === 0) continue;
				if (
					!Array.from(mutation.addedNodes).some((node) =>
						node.contains(element),
					)
				)
					continue;

				observer.disconnect();
				element.dispatchEvent(this.#customEvents.append);
				//callback(element);
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	// listener & observer functions

	#windowResize() {}

	#resize() {}

	#mouseDown() {}

	#mouseUp() {}

	#mouseMove() {}

	#keyUp() {}

	#keyDown() { }
	
	
	// canvas body data update functions

	#sizeUpdate() { }
	

}
