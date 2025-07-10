import Assert from './assert.js';
import Hooks from './hooks.js';

//add hooks

export default class Collection {
	#hooks;
	#name;
	#config;
	#tests;
	#collections;
	#counter;
	#passed;
	#failed;

	constructor(name, config) {
		this.#name = name;
		this.#config = config;
		this.#hooks = new Hooks();
		this.#collections = [];
		this.#tests = [];
		this.#passed = [];
		this.#failed = [];
		this.#counter = 0;
	}

	collection(name, callback) {
		const collection = new Collection(name);
		this.#collections.push(collection);
		callback(collection); // , hooks
	}

	get hooks() {
		return this.#hooks;
	}

	test(name, callback) {
		this.#tests.push({
			assert: new Assert(name, this),
			callback: callback,
		});
	}

	start() {
		this.#collections.forEach((collection) => {
			this.#hooks.before?.();

			collection.start();

			this.#hooks.after?.();
		});
		this.#tests.forEach((test) => {
			test.callback(test.assert);
			console.log(test.assert.report);
		});
	}

	get report() {}

	/*
	
	if(name, condition, callback) {}

	only(name, callback) {}

	skip(name, callback) {}

	todo(name, callback) {}

	each(name, dataset, callback) {}

	get report() {
		return {
			name: this.#name,
		};
	}
	*/
}
