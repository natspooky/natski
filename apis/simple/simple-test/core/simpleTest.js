import Collection from './collection.js';
import Config from './config.js';

export default class SimpleTest {
	#collections;
	#config;
	constructor(initialConfig) {
		this.#collections = [];
		this.#config = new Config(initialConfig);
	}

	collection(name, callback) {
		const collection = new Collection(this.#config, name);
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
