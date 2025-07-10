import Layer from './layer.js';

export default class LayerManager {
	#config;
	#layers;
	constructor(config) {
		this.#config = config;
		this.#layers = {}; // contains the reference sheet for the other layers#
		this.create('transform');
	}

	create(ID, left, top, x, y) {
		if (this.#layers[ID]) {
			throw new Error('Cannot overwrite already existing layer ID');
		}

		this.#layers[ID] = new Layer(left, top, x, y);
	}

	get(ID) {
		return this.#layers[ID];
	}

	remove() {}

	edit() {}
}
