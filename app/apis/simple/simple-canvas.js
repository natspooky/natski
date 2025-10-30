/* -----------------------------------------------
/* Author : NATSKI - natski.dev
/* MIT license : https://opensource.org/license/MIT
/* GitHub : https://github.com/natspooky/simple-canvas
/* How to use? : Check the GitHub README or visit https://natski.dev/api/simple-canvas
/* ----------------------------------------------- */

import Console from '../dependencies/console.js';

const append = new Event('append');
const simpleCanvasConsole = new Console('Simple Canvas', '#48953r');

export default class SimpleCanvas {
	#supportedEvents = [
		//mouse
		'mousedown',
		'mouseup',
		'mousemove',
		'mouseenter',
		'mouseleave',
		'dblclick',
		'click',
		'contextmenu',
		'auxclick',

		//touch
		'touchstart',
		'touchend',
		'touchmove',
		'touchcancel',

		//key
		'keyup',
		'keydown',

		//wheel
		'wheel',

		//scroll
		'scroll',
		'scrollend',

		//window focus
		'blur',
		'focus',

		//resize
		'resize',
	].filter(this.#checkEventSupport);

	#userEventListeners = {};
	#canvasEventRemovers = {};
	#wheelState = {
		scrolling: false,
	};
	#scrollState = {
		scrolling: false,
	};
	#keyState = {
		pressing: false,
		pressCount: 0,
	};
	#mouseState = {
		pressed: false,
		covering: false,
		click: {
			startPosition: {}, //maybe? think of a good application first i guess
			endPosition: {},
		},
		motion: {
			position: {
				x: undefined,
				y: undefined,
			},
			lastPostion: {
				x: undefined,
				y: undefined,
			},
			velocity: {
				x: 0,
				y: 0,
			},
			acceleration: {
				x: 0,
				y: 0,
			},
			speed: 0,
		},
	};
	#touchState = {
		touching: false,
		touchCount: 0,
	};
	#canvasState = {
		canvas: undefined,
		context: undefined,
		id: undefined,
		size: {
			width: 300,
			height: 150,
			locked: false,
			scale: window.devicePixelRatio || 1,
		},
	};
	#drawingState = {
		paused: false,
		drawing: false,
		renderTime: 0,
		interval: 1000 / 60,
		runTime: 0,
		drawFn: undefined,
		setupFn: undefined,
		resizeFn: undefined,
		appendFn: undefined,
	};

	#diagnosticsData = {
		fps: {
			frameBuffer: [],
			renderBuffer: 0,
			renderBufferTwo: 0,
			currentFPS: 0,
		},
	};

	#timers = {
		motionState: undefined,
		wheelMotionState: undefined,
		scrollMotionState: undefined, //possibly dont need
	};

	constructor(canvas, settings = {}, name = 'Unnamed Canvas') {
		this.#mergeSettings(settings);

		switch (typeof canvas) {
			case 'string':
				this.#canvasState.canvas = document.getElementById(canvas);
				if (!this.#canvasState.canvas)
					simpleCanvasConsole.message({
						message: 'Assignment error:',
						error: `The ID '${canvas}' does not exist in the DOM`,
					});
				break;
			case 'object':
				if (
					!(
						canvas.tagName === 'CANVAS' &&
						canvas.nodeType === Node.ELEMENT_NODE
					)
				) {
					simpleCanvasConsole.message({
						message: 'Assignment error:',
						error: "HTML Node is not a 'CANVAS'",
					});
					return;
				}

				this.#canvasState.canvas = canvas;

				break;
			default:
				simpleCanvasConsole.message({
					message: 'Type error:',
					error: 'Passed canvas is not of type HTML Node or String ID',
				});
		}

		this.#canvasState.context = this.#canvasState.canvas.getContext('2d');
		this.#canvasState.id = name;

		this.#attachEvents();

		if (!document.body.contains(this.#canvasState.canvas)) {
			this.#canvasState.canvas.addEventListener(
				'append',
				() => {
					this.#resize();
					this.#drawingState.appendFn?.();
				},
				{
					once: true,
				},
			);
			this.#awaitAppend(this.#canvasState.canvas);
			return;
		}

		this.#resize();
	}

	//user functions

	static create(
		identifiers,
		settings,
		name,
		//fallbackText, add this
	) {
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
					simpleCanvasConsole.message({
						message: 'Assignment error:',
						error: 'Class and ID keys dont match required syntax: (#Id .class)',
					});
					break;
			}
		});

		return new SimpleCanvas(element, settings, name);
	}

	static console(message) {
		if (!Array.isArray(message)) {
			message = [message];
		}

		const checkType = (single) => {
			if (single.error)
				return [
					'background-color: #ff000049; padding: 3px 5px; border-radius: 7px;',
					'font-weight: normal;',
				];
			if (single.warn)
				return [
					'background-color: #ffff0049; padding: 3px 5px; border-radius: 7px;',
					'font-weight: normal;',
				];
			return [];
		};

		message.forEach((single) => {
			if (!single) return;

			console.log(
				`%cSimple-Canvas%c ${single.message}${
					single.error || single.warn
						? '\n%c' + (single.error || single.warn) + '%c'
						: ''
				}`,
				'font-weight: bold; color: #29a36aff; background-color: black; padding: 0 5px; border-radius: 7px; border: 1px solid #29a36aff',
				'font-weight: normal;',
				...checkType(single),
			);
		});
	}

	async render() {
		if (!this.#drawingState.drawFn) {
			simpleCanvasConsole.message({
				message: 'Render error:',
				error: 'No draw function provided',
			});
			return;
		}

		if (!document.body.contains(this.#canvasState.canvas)) {
			simpleCanvasConsole.message({
				message: 'Render error:',
				error: 'Canvas cannot render content while outside of the Document body',
			});
			return;
		}

		await this.#drawingState.setupFn?.();

		simpleCanvasConsole.message({
			message: `Rendering '${this.#canvasState.id}' at ${
				this.settings.fps
			}fps`,
		});

		this.#drawingState.drawing = true;

		this.#frameLoop();
	}

	paintAll(colour) {
		this.#transformlessWrapper((ctx) => {
			if (colour) ctx.fillStyle = colour;
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		});
	}

	disconnect() {
		this.#removeEvents(); //do this
	}

	pause() {
		this.#drawingState.paused = true;
	}

	play() {
		this.#drawingState.paused = false;
	}

	setup(fn) {
		this.#drawingState.setupFn = fn;
	}

	append(fn) {
		this.#drawingState.appendFn = fn;
	}

	draw(fn) {
		this.#drawingState.drawFn = fn;
	}

	resize(fn) {
		this.#drawingState.resizeFn = fn;
	}

	set size({ height, width }) {
		this.settings.size.locked = true; //do this
	}

	set fps(newFPS) {
		new Promise((resolve) =>
			requestAnimationFrame((t1) =>
				requestAnimationFrame((t2) =>
					resolve(Math.floor(1000 / (t2 - t1))),
				),
			),
		).then((calculatedFPS) => {
			const closestRate = [
				30, 60, 75, 90, 100, 120, 144, 180, 240, 360,
			].reduce((previous, current) =>
				Math.abs(current - calculatedFPS) <
				Math.abs(previous - calculatedFPS)
					? current
					: previous,
			);

			newFPS = Math.min(newFPS, closestRate);

			this.settings.fps = newFPS;
			this.#drawingState.interval = 1000 / newFPS;
		});
	}

	get fps() {
		return this.settings.fps;
	}

	on(eventName, fn) {
		if (!this.#supportedEvents.includes(eventName)) {
			simpleCanvasConsole.message({
				message: 'Event warning:',
				warn: `'${eventName}' is not supported in Simple Canvas`,
			});
		}
		this.#userEventListeners[eventName] = fn;
	}

	removeEvent(eventName) {
		if (!this.#supportedEvents.includes(eventName)) {
			console.log('uh oh');
		}

		delete this.#userEventListeners[eventName];
	}

	//util

	#mergeSettings(userSettings) {
		this.settings = {
			fps: 60,
			autoClear: true,
			autoResize: true,
			setupOnResize: true,
			useCursor: false,
			useTouch: false,
			useWheel: false,
			useScroll: false,
			useKey: false,
			diagnostics: false,
			detectWindowFocus: true,
			debugConsole: false,

			...userSettings,
		};

		this.fps = this.settings.fps;

		if (this.settings.size) {
			this.#canvasState.size.locked = true;
			this.#canvasState.size.width = this.settings.size.width;
			this.#canvasState.size.height = this.settings.size.height;
		}
	}

	#checkEventSupport(eventName) {
		if (typeof eventName != 'string' || eventName.length == 0) return false;
		const tagNames = {
			select: 'input',
			change: 'input',
			submit: 'form',
			reset: 'form',
			error: 'img',
			load: 'img',
			abort: 'img',
		};
		let element = document.createElement(tagNames[eventName] || 'div');
		eventName = 'on' + eventName;
		let isSupported = eventName in element;
		if (!isSupported) {
			element.setAttribute(eventName, 'return;');
			isSupported = typeof element[eventName] == 'function';
		}
		element = null;
		return isSupported;
	}

	#buildEmbedEvent({ target, eventName, fn, options }) {
		if (!this.#supportedEvents.includes(eventName)) return;

		const boundEventFn = fn.bind(this);

		target.addEventListener(eventName, boundEventFn, options);

		this.#canvasEventRemovers[eventName] = () =>
			target.removeEventListener(eventName, boundEventFn);
	}

	#removeEvents(eventName) {
		if (!eventName) {
			Object.values(this.#canvasEventRemovers).forEach((eventRemover) =>
				eventRemover(),
			);

			return;
		}

		this.#canvasEventRemovers[eventName]?.();
	}

	#attachEvents() {
		//mouse

		if (this.settings.useCursor) {
			this.#buildEmbedEvent({
				target: this.#canvasState.canvas,
				eventName: 'mouseup',
				fn: this.#mouseUp,
				options: { passive: true },
			});

			this.#buildEmbedEvent({
				target: document,
				eventName: 'mousedown',
				fn: this.#mouseDown,
			});

			this.#buildEmbedEvent({
				target: document,
				eventName: 'mousemove',
				fn: this.#mouseMove,
				options: { passive: true },
			});

			this.#buildEmbedEvent({
				target: this.#canvasState.canvas,
				eventName: 'contextmenu',
				fn: this.#contextMenu,
			});

			this.#buildEmbedEvent({
				target: this.#canvasState.canvas,
				eventName: 'mouseenter',
				fn: this.#mouseEnter,
				options: { passive: true },
			});

			this.#buildEmbedEvent({
				target: this.#canvasState.canvas,
				eventName: 'mouseleave',
				fn: this.#mouseLeave,
				options: { passive: true },
			});
		}

		//touch

		if (this.settings.useTouch) {
			this.#buildEmbedEvent({
				target: this.#canvasState.canvas,
				eventName: 'touchstart',
				fn: this.#touchStart,
			});
			this.#buildEmbedEvent({
				target: document,
				eventName: 'touchend',
				fn: this.#touchEnd,
				options: { passive: true },
			});

			this.#buildEmbedEvent({
				target: this.#canvasState.canvas,
				eventName: 'touchmove',
				fn: this.#touchMove,
			});

			this.#buildEmbedEvent({
				target: document,
				eventName: 'touchcancel',
				fn: this.#touchCancel,
			});
		}

		//keyboard

		if (this.settings.useKey) {
			this.#buildEmbedEvent({
				target: document,
				eventName: 'keyup',
				fn: this.#keyUp,
				options: { passive: true },
			});
			this.#buildEmbedEvent({
				target: document,
				eventName: 'keydown',
				fn: this.#keyDown,
			});
		}

		//wheel

		if (this.settings.useWheel) {
			this.#buildEmbedEvent({
				target: this.#canvasState.canvas,
				eventName: 'wheel',
				fn: this.#wheel,
			});
		}

		//scroll

		if (this.settings.useScroll) {
			this.#buildEmbedEvent({
				target: document,
				eventName: 'scroll',
				fn: this.#scroll,
			});
		}

		//resize

		if (this.settings.autoResize) {
			const resizeFn = this.#resize.bind(this);
			const observer = new ResizeObserver(() => resizeFn());
			observer.observe(this.#canvasState.canvas);
		}

		this.#buildEmbedEvent({
			target: window,
			eventName: 'resize',
			fn: this.#locationUpdate,
			options: { passive: true },
		});

		//focus

		if (this.settings.detectWindowFocus) {
			this.#buildEmbedEvent({
				target: window,
				eventName: 'blur',
				fn: this.#pageBlur,
			});
			this.#buildEmbedEvent({
				target: window,
				eventName: 'focus',
				fn: this.#pageFocus,
			});
		}
	}

	#awaitAppend(element) {
		const isAppended = (element) => {
			while (element.parentNode) element = element.parentNode;
			return element instanceof Document;
		};

		if (isAppended(element)) {
			element.dispatchEvent(append);
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
				element.dispatchEvent(append);
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	// listener & observer functions

	#pageBlur() {
		this.#drawingState.paused = true;
	}

	#pageFocus() {
		this.#drawingState.paused = false;
	}

	#locationUpdate() {
		const box = this.#canvasState.canvas.getBoundingClientRect();

		const body = document.body;
		const docEl = document.documentElement;

		const scrollTop = docEl.scrollTop || body.scrollTop;
		const scrollLeft = docEl.scrollLeft || body.scrollLeft;

		const clientTop = docEl.clientTop || body.clientTop || 0;
		const clientLeft = docEl.clientLeft || body.clientLeft || 0;
		//do this
		this.#canvasState.dimensions.position = {
			x: Math.round(box.left + scrollLeft - clientLeft),
			y: Math.round(box.top + scrollTop - clientTop),
		};
	}

	async #resize() {
		this.#sizeUpdate();
		this.#locationUpdate();

		if (this.settings.setupOnResize && this.settings.autoResize)
			await this.#drawingState.setupFn?.();

		this.#drawingState.resizeFn?.({
			width: this.#canvasState.size.width,
			height: this.#canvasState.size.height,
		});

		if (this.#drawingState.drawing && !this.#drawingState.paused)
			this.#drawSequence();
	}

	#mouseDown(event) {
		if (!this.#mouseState.covering) return;
		event.preventDefault();

		this.#mouseState.pressed = true;

		this.#mouseState.click.startPosition = this.#mouseState.motion.position;

		this.#userEventListeners['mousedown']?.(event);
	}

	#mouseUp(event) {
		if (!this.#mouseState.pressed) return;

		this.#mouseState.pressed = false;

		this.#mouseState.click.endPosition = this.#mouseState.motion.position;

		this.#userEventListeners['mouseup']?.(event);
	}

	#mouseMove(event) {
		if (!this.#mouseState.covering) return;

		this.#mouseState.motion.lastPostion = this.#mouseState.motion.position;

		clearTimeout(this.#timers.motionState);

		this.#mouseState.moving = true;

		this.#timers.motionState = setTimeout(() => {
			this.#mouseState.moving = false;
		}, 10);

		this.#userEventListeners['mousemove']?.(event);
	}

	#contextMenu(event) {
		event.preventDefault();
	}

	#mouseEnter(event) {
		this.#mouseState.covering = true;

		this.#userEventListeners['mouseenter']?.(event);
	}

	#mouseLeave(event) {
		this.#mouseState.covering = false;

		this.#userEventListeners['mouseleave']?.(event);
	}

	#touchStart(event) {
		this.#touchState.touching = true;

		this.#touchState.touchCount++;

		this.#userEventListeners['touchstart']?.(event);
	}

	#touchEnd(event) {
		this.#touchState.touchCount--;

		if (this.#touchState.touchCount <= 0) this.#touchState.touching = true;

		this.#userEventListeners['touchend']?.(event);
	}

	#touchMove(event) {
		clearTimeout(this.#timers.motionState);

		this.#touchState.moving = true;

		this.#timers.motionState = setTimeout(() => {
			this.#touchState.moving = false;
		}, 10);

		this.#userEventListeners['touchmove']?.(event);
	}

	#touchCancel(event) {
		this.#userEventListeners['touchcancel']?.(event);
	}

	#keyDown(event) {
		this.#keyState.pressed = true;

		this.#keyState.pressedCount++;

		this.#userEventListeners['keydown']?.(event);
	}

	#keyUp(event) {
		this.#keyState.pressedCount--;

		if (this.#keyState.pressedCount <= 0) this.#keyState.pressed = false;

		this.#userEventListeners['keyup']?.(event);
	}

	#wheel(event) {
		//maybe get rid of this or add a settings
		event.preventDefault();

		clearTimeout(this.#timers.wheelMotionState);

		this.#wheelState.scrolling = true;

		this.#timers.wheelMotionState = setTimeout(() => {
			this.#wheelState.scrolling = false;
		}, 10);

		this.#userEventListeners['wheel']?.(event);
	}

	#scroll(event) {
		clearTimeout(this.#timers.wheelMotionState);

		this.#scrollState.scrolling = true;

		this.#timers.wheelMotionState = setTimeout(() => {
			this.#scrollState.scrolling = false;
		}, 10);

		this.#userEventListeners['scroll']?.(event);
	}

	// canvas body data update functions

	#sizeUpdate() {
		if (!this.#canvasState.size.locked) {
			this.#canvasState.size.width = Math.floor(
				this.#canvasState.canvas.offsetWidth *
					this.#canvasState.size.scale,
			);
			this.#canvasState.size.height = Math.floor(
				this.#canvasState.canvas.offsetHeight *
					this.#canvasState.size.scale,
			);
		}

		this.#canvasState.canvas.width = this.#canvasState.size.width;
		this.#canvasState.canvas.height = this.#canvasState.size.height;
	}

	#drawSequence() {
		if (this.settings.autoClear) this.#clear();

		this.#drawingState.drawFn();

		if (this.settings.diagnostics) this.#diagnostics();
	}

	async #frameLoop() {
		let then = performance.now(),
			delta = 0,
			now = 0;

		while (this.#drawingState.drawing) {
			now = await new Promise(requestAnimationFrame);

			if (now - then < this.#drawingState.interval - delta) continue;

			delta = Math.min(
				this.#drawingState.interval,
				delta + now - then - this.#drawingState.interval,
			);

			if (this.#drawingState.paused) continue;

			this.#drawingState.renderTime = (now - then) / 1000;
			this.#drawingState.runTime += this.#drawingState.renderTime;

			then = now;

			this.#drawSequence();
		}
	}

	#clear() {
		this.#transformlessWrapper((ctx) => {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		});
	}

	#diagnostics() {
		this.#transformlessWrapper((ctx) => {
			this.#fps(ctx);
			this.#mouse(ctx);
		});
	}

	#container({ width, height, padding, clip, child, fn, round, parentData }) {
		//give option to scale with dpi!
	}

	#fps(ctx) {
		const textWidth = 15;
		const boxWidth = 10;
		const graphBoxWidth = 100;
		const margin = 20;
		const padding = 10;
		const textSize = 30;
		const boxHeight = textSize * 2;
		const graphBoxHeight = boxHeight - padding * 2;

		if (this.#diagnosticsData.fps.renderBufferTwo >= 1) {
			this.#diagnosticsData.fps.currentFPS =
				this.#diagnosticsData.fps.renderBuffer;
			this.#diagnosticsData.fps.renderBuffer = 0;
			this.#diagnosticsData.fps.renderBufferTwo = 0;
		} else {
			this.#diagnosticsData.fps.renderBuffer++;
			this.#diagnosticsData.fps.renderBufferTwo +=
				this.#drawingState.renderTime;
		}

		const text =
			this.#diagnosticsData.fps.currentFPS +
			'/' +
			this.settings.fps +
			'fps';
		const boxContainerWidth =
			graphBoxWidth + boxWidth + (textSize / textWidth) * text.length;

		if (this.#diagnosticsData.fps.frameBuffer.length >= 50)
			this.#diagnosticsData.fps.frameBuffer.shift();

		this.#diagnosticsData.fps.frameBuffer.push(
			this.#drawingState.renderTime,
		);

		ctx.fillStyle = '#00000090';
		ctx.font = `${textSize}px monospace`;

		ctx.beginPath();
		ctx.roundRect(
			20,
			20,
			boxContainerWidth + textWidth * text.length + 20,
			boxHeight,
			[15],
		);
		ctx.fill();
		ctx.beginPath();
		ctx.roundRect(
			margin + padding,
			margin + padding,
			graphBoxWidth,
			graphBoxHeight,
			[5],
		);
		ctx.fill();

		ctx.strokeStyle = '#ffffff';
		ctx.fillStyle = '#ffffff';
		ctx.fillText(
			text,
			graphBoxWidth + margin + padding * 2,
			margin + padding + textSize,
		);
		let region = new Path2D();
		region.roundRect(
			margin + padding,
			margin + padding,
			graphBoxWidth,
			graphBoxHeight,
			[5],
		);
		ctx.clip(region);
		ctx.beginPath();
		this.#diagnosticsData.fps.frameBuffer.forEach((height, index, arr) => {
			const scaledHeight = Math.max(
				0,
				graphBoxHeight -
					(this.#drawingState.interval / (height * 1000)) *
						graphBoxHeight,
			);

			const xPos =
				(graphBoxWidth / arr.length) * index + margin + padding;

			if (index === 0) {
				ctx.moveTo(xPos, scaledHeight + padding + margin);
				return;
			}

			ctx.lineTo(xPos, scaledHeight + padding + margin);
		});
		ctx.stroke();
	}

	#mouse(ctx) {
		//	ctx.fillText(text, graphBoxWidth + margin * 2, margin + textSize);
	}

	// utility

	#transformlessWrapper(fn) {
		const context = this.context;

		context.save();

		context.setTransform(1, 0, 0, 1, 0, 0);

		fn(context);

		context.restore();
	}

	// canvas getter

	get element() {
		return this.#canvasState.canvas;
	}

	get context() {
		return this.#canvasState.context;
	}

	get width() {
		return this.#canvasState.size.width;
	}

	get height() {
		return this.#canvasState.size.height;
	}

	//mouse getter

	get cursor() {
		return {
			pressed: this.#mouseState.pressed,
		};
	}
}
