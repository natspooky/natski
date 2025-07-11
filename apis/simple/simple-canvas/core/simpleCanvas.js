import Config from './config.js';
import Render from './render.js';
import Event from './event.js';
import LayerManager from './layerManager.js';
import { jsonElementify } from './utilities.js';

export default class SimpleCanvas {
	#canvas;
	#config;
	#event;
	#render;
	#layers;

	constructor(element, initialConfig) {
		this.#config = new Config(initialConfig);

		this.#canvas = {};

		if (
			element &&
			element.nodeType === Node.ELEMENT_NODE &&
			element.tagName === 'canvas'
		) {
			this.#canvas.element = element;
		} else if (typeof element === 'string') {
			this.#canvas.element = document.getElementById(element);

			if (!this.#canvas.element)
				throw new Error('Element ID has no corresponding HTMLElement');
		} else {
			throw new TypeErorr(
				"Element provided is not of type 'string' or 'ELEMENT_NODE'",
			);
		}

		if (!document.body.contains(this.#canvas.element)) {
			jsonElementAppend(this.#canvas.element, {
				onAppend: (self) => {
					console.log(canvas.config);
				},
			});
		}

		this.#canvas.context = this.#canvas.element.getContext('2d');

		//this.#layers = new LayerManager(this.#config);
		//this.#event = new Event(this.#config);
		//this.#render = new Render(this.#config);
	}

	static create(identifiers, initialConfig) {
		// check for type to ensure that we can process the input
		if (typeof identifiers !== 'string') {
			throw new TypeError(
				"ID and Class identifiers must be of type 'string'",
			);
		}

		const { id, classes } = ((identifiers) => {
			const tokens = identifiers.split(' '),
				classes = [];
			let id;

			for (const token of tokens) {
				switch (token.slice(0, 1)) {
					case '#':
						id = token.slice(1);
						break;
					case '.':
						classes.push(token.slice(1));
						break;
					default:
						throw new Error(); // change later to have message
				}
			}
			return { id, classes };
		})(identifiers); // call function immediately

		const element = jsonElementify({
			tag: 'canvas',
			attributes: {
				id: id,
			},
			classes: classes,
		}); // generate element and populate ID and Classes using ENCORE EC.js

		const canvas = new SimpleCanvas(element, initialConfig);

		jsonElementAppend(element, {
			onAppend: (self) => {
				console.log(canvas.config);
			},
		}); // add an event that will calculate initial canvas data when first added onto the page

		return canvas;
	}

	play() {
		this.#render.play();
	}

	pause() {
		this.#render.pause();
	}

	get config() {
		return this.#config;
	}

	get event() {
		return this.#event;
	}

	get layers() {
		return this.#layers;
	}

	get canvas() {
		return this.#canvas.element;
	}

	get context() {
		return this.#canvas.context;
	}
}
