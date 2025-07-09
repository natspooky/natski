import { setFallback } from './utilities.js';

export default class Config {
	#canvas;
	#events;
	#observers;
	#render;
	#debug;
	#misc;

	#system; // stuff like supported events and retina

	constructor(config) {
		this.#canvas = {};
		this.#events = {};
		this.#debug = {};
		this.#render = {};
		this.#system = {};

		this.#setFallbacks(config);
	}

	#setFallbacks(config) {
		//system
		this.system = this.#systemConfig;

		//canvas
		this.autoClear = setFallback(config.autoClear, true);
		this.autoPaint = setFallback(config.autoPaint, false);

		//event
		this.mouseEvents = setFallback(config.mouseEvents, false);
		this.touchEvents = setFallback(config.touchEvents, false);
		this.keyEvents = setFallback(config.keyEvents, false);
		this.scrollEvents = setFallback(config.scrollEvents, false);

		//debug
		this.layerBorders = setFallback(config.layerBorders, false);

		//render
		this.frameRate;
		this.eventRender = {
			touch: setFallback(config.touchRender, false),
			mouse: setFallback(config.mouseRender, false),
			key: setFallback(config.keyRender, false),
			scroll: setFallback(config.scrollRender, false),
			frameRate: setFallback(config.frameRateRender, false),
		};
		this.touchRender;
		this.keyRender;
		this.scrollRender;
	}

	get #systemConfig() {
		const event_exists = (eventName) => {
			if (typeof eventName != 'string' || eventName.length == 0)
				return false;
			const TAGNAMES = {
				select: 'input',
				change: 'input',
				submit: 'form',
				reset: 'form',
				error: 'img',
				load: 'img',
				abort: 'img',
			};
			let element = document.createElement(TAGNAMES[eventName] || 'div');
			eventName = 'on' + eventName;
			let isSupported = eventName in element;
			if (!isSupported) {
				element.setAttribute(eventName, 'return;');
				isSupported = typeof element[eventName] == 'function';
			}
			element = null;
			return isSupported;
		};

		return {
			supported: {
				touch:
					'ontouchstart' in window ||
					navigator.maxTouchPoints > 0 ||
					navigator.msMaxTouchPoints > 0,
				wheel: 'onwheel' in document && event_exists('wheel'),
				mouse:
					matchMedia('(pointer:fine)').matches &&
					event_exists('mousemove'),
				hover:
					window.matchMedia('(hover: hover)').matches &&
					event_exists('mouseover'),
				key: event_exists('keydown'),
			},
			retina: window.devicePixelRatio > 1 ? window.devicePixelRatio : 1,
		};
	}

	default() {
		this.#setFallbacks({});
	}

	set autoClear(autoClear) {
		this.#canvas.autoClear = autoClear;
	}

	get autoClear() {
		return this.#canvas.autoClear;
	}

	set autoPaint(autoPaint) {
		this.#canvas.autoPaint = autoPaint;
	}

	get autoPaint() {
		return this.#canvas.autoPaint;
	}

	set mouseEvents(mouse) {
		this.#events.mouse = mouse;
	}

	get mouseEvents() {
		return this.#events.mouse;
	}

	set touchEvents(touch) {
		this.#events.touch = touch;
	}

	get touchEvents() {
		return this.#events.touch;
	}

	set keyEvents(key) {
		this.#events.key = key;
	}

	get keyEvents() {
		return this.#events.key;
	}

	set scrollEvents(scroll) {
		this.#events.scroll = scroll;
	}

	get scrollEvents() {
		return this.#events.scroll;
	}

	set layerBorders(layerBorders) {
		this.#debug.layerBorders = layerBorders;
	}

	get layerBorders() {
		return this.#debug.layerBorders;
	}

	// system

	get retina() {
		return this.#system.retina;
	}

	get supported() {
		return this.#system.supported;
	}
}
