import Assert from './assert.js';

export default class Test {
	#module;
	#type;
	#counter;
	constructor(Module) {
		this.#module = Module;
	}

	if() {
		this.#type = 'IF';
		return this;
	}

	only() {
		this.#type = 'ONLY';
		return this;
	}

	skip() {
		this.#type = 'SKIP';
		return this;
	}

	todo() {
		this.#type = 'TODO';
		return this;
	}

	each(name, dataset, callback) {
		switch (this.#type) {
			case 'IF':
				break;
			case 'ONLY':
				break;
			case 'SKIP':
				break;
			case 'TODO':
				break;

			default:
				break;
		}
	}
}
