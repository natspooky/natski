import Config from './config.js';
import Render from './render.js';
import EventManager from './events/eventManager.js';
import { jsonElementify } from './utilities.js';

export default class SimpleCanvas {
	#canvas;
	#config;
	#event;
	#render;

	constructor(element, initialConfig) {
		this.#config = new Config(initialConfig);

		this.#canvas = {};

		if (element && element.nodeType === Node.ELEMENT_NODE) {
			this.#canvas.element = element;
		} else if (typeof element === 'string') {
			this.#canvas.element = document.getElementById(element);

			if (!this.#canvas.element)
				throw new Error('Element ID has no corresponding HTMLElement');
		}

		this.#canvas.context = this.#canvas.element.getContext('2d');

		this.#event = new EventManager(this.#config);
		this.#render = new Render(this.#config);
	}

	get config() {
		return this.#config;
	}

	get event() {
		return this.#event;
	}

	get render() {
		return this.#render;
	}

	get canvas() {
		return this.#canvas.element;
	}

	get context() {
		return this.#canvas.context;
	}

	play() {}

	pause() {}

	static create(identifiers, initialConfig) {
		if (typeof identifiers !== 'string') {
			throw new TypeError('cannot asign ID or class to canvas element');
		}

		const tokenizer = (identifiers) => {
			const tokens = identifiers.split(' ');

			let classes = [],
				id;

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
		};

		const { id, classes } = tokenizer(identifiers);

		let element = {
			tag: 'canvas',
			attributes: {
				id: id,
			},
			classes: classes,
			load: (self) => {},
		};

		return new SimpleCanvas(jsonElementify(element), initialConfig);
	}
}
