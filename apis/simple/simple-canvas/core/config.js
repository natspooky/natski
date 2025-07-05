import { setFallback } from './utilities.js';

export default class Config {
	#canvas;
	#events;
	#supportedEvents;
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

		this.#supportedEvents = {
			touch:
				'ontouchstart' in window ||
				navigator.maxTouchPoints > 0 ||
				navigator.msMaxTouchPoints > 0,
			wheel: 'onwheel' in document,
			hover: window.matchMedia('(hover: hover)').matches,
		};

		this.#setFallbacks(config);
	}

	#setFallbacks(config) {
		//canvas
		this.autoClear = setFallback(config.autoClear, true);
		this.autoPaint = setFallback(config.autoPaint, false);

		//event
		this.mouseEvents = setFallback(config.mouseEvents, false);
		this.touchEvents = setFallback(config.touchEvents, false);
		this.keyEvents = setFallback(config.keyEvents, false);
		this.scrollEvents = setFallback(config.scrollEvents, false);

		//debug
		this.layerBorders = setFallback(config.scrollEvents, false);

		//render
		this.frameRate;
		this.eventRender = {
			touch: false,
			mouse: false,
			key: false,
			scroll: false,
		};
		this.touchRender;
		this.keyRender;
		this.scrollRender;
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
}
