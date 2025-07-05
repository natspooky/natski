import Collection from './collection.js';
import Config from './config.js';

export default class SimpleTest {
	#collections;
	#config;
	constructor() {
		this.#collections = [];
		this.#config = new Config();
	}

	collection(name, callback) {
		const collection = new Collection(name, this.#config);
		this.#collections.push(collection);
		callback(collection);
	}

	start() {
		this.#collections.forEach((collection) => {
			collection.start();
		});
	}

	report() {}
}
