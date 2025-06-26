/* -----------------------------------------------
/* Author : NATSKI - natski.dev
/* MIT license : https://opensource.org/license/MIT
/* GitHub : https://github.com/natspooky/test
/* How to use? : Check the GitHub README or visit https://natski.dev/api/encore/element-creator
/* ----------------------------------------------- */

/*
export default class TestSystem {
	#counter;
	#total;
	#name;

	constructor(name) {
		this.#name = name;
		this.#counter = 0;
		this.#total = 0;
	}

	test() {
		return this;
	}

	module(callback) {
		if(m)
	}

	each() {}

	testErrorThrow(func, ...params) {
		if (typeof func !== 'function')
			throw new Error('No function provided for testing');

		try {
			func(...params);
		} catch (error) {
			console.log(`Passed.\n(${error}) was thrown`);
			this.#increment(true);
			return;
		}
		console.warn(`Failed. "${func.name}" did not throw an error`);
		this.#increment(false);
	}

	testExists(input) {
		if (undefined === input || input === null) {
			console.warn('Failed. Variable is NULL or undefined');
			this.#increment(false);
			return;
		}

		console.log('Passed. Variable exists');
		this.#increment(true);
	}

	testEquals(input, output) {
		if (input && input.nodeType && input.isEqualNode(output)) {
			console.log('Passed. Elements are equal');
			this.#increment(true);
			return;
		}

		if (input === output) {
			console.log('Passed. Variables are equal');
			this.#increment(true);
			return;
		}

		console.warn(
			`Failed.\nExpected: ${typeof input}`,
			input,
			`\nRecieved: ${typeof output}`,
			output,
		);
		this.#increment(false);
	}

	testType(input, type) {
		const inp = typeof input;

		if (typeof inp === type) {
			console.log('Passed.');
			this.#increment(true);
			return;
		}

		console.warn(`Failed.\nExpected: ${type}\nRecieved: ${inp}`);
		this.#increment(false);
	}
}*/

export default class TestSystem {
	#modules;
	#config;

	constructor() {
		this.#modules = [];
		this.#config = new TestConfig();
	}

	test() {
		return this;
	}

	module(name, scope) {
		if (!(name || scope)) return this;
		this.#modules.push({
			name: name,
			id: `Module.${name}`,
		});

		scope(new Test());
	}

	burger() {
		console.log('ass');
	}

	config() {
		return this.#config;
	}

	get modules() {
		return this.#modules;
	}
}

class TestConfig {
	#changeTitle = false;

	constructor() {}

	/**
	 * @param {boolean} startValue
	 */
	set changeTitle(startValue) {
		this.#changeTitle = bool;
	}
}

class Test {
	constructor() {}

	each(name, dataset, callback) {}

	get only() {}

	only(name, callback) {
		return this;
	}

	skip() {
		return this;
	}

	todo() {
		return this;
	}

	if() {
		return this;
	}
}

class Assert {
	constructor() {}

	aysnc() {}

	closeTo() {}

	hardEqual() {}

	equal() {}

	notHardEqual() {}

	notEqual() {}

	notOk() {}

	ok() {}

	expect() {}

	false() {}
}
