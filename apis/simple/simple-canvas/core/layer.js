export default class Layer {
	#name;
	#left;
	#top;
	#width;
	#height;
	#embeddedLayers;

	constructor(name, left, top, width, height, ...innerLayers) {
		this.#name = name;
		this.#left = left;
		this.#top = top;
		this.#width = width;
		this.#height = height;

		if ([...innerLayers].length > 0) {
			this.#embeddedLayers = [...innerLayers];
		}
	}

	get name() {
		return this.#name;
	}

	draw(callback) {
		callback({
			left: this.#left,
			top: this.#top,
			right: this.#left + this.#width,
			bottom: this.#top + this.#height,
			width: this.#width,
			height: this.#height,
		});
	}

	/**
	 * @param {number} left
	 */

	set left(left) {
		this.#left = left;
	}

	/**
	 * @param {number} top
	 */

	set top(top) {
		this.#top = top;
	}

	/**
	 * @param {{ x: number; y: number; }} position
	 */

	set position(position) {
		this.#left = position.x;
		this.#top = position.y;
	}

	/**
	 * @param {{ x: number; y: number; }} size
	 */

	set size(size) {
		this.#width = size.x;
		this.#height = size.y;
	}

	/**
	 * @param {number} width
	 */

	set width(width) {
		this.#width = width;
	}

	/**
	 * @param {number} height
	 */

	set height(height) {
		this.#height = height;
	}

	cascade() {
		//update the embed layers
	}
}
