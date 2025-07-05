export default class Assert {
	#name;
	#reports;
	#passCount;
	#failCount;

	constructor(name) {
		this.#name = name;
		this.#reports = [];
		this.#passCount = 0;
		this.#failCount = 0;
	}

	#reporter({ result, expected, actual, message, negative }) {
		let hasPassed;

		const check = (value) => {
			return undefined !== value && null !== value;
		};

		if (check(expected) && check(actual)) {
			hasPassed = negative ? expected !== actual : expected === actual;
		} else {
			hasPassed = negative ? !result : result;
		}

		//const hasPassed = negative ? !result : result;

		if (hasPassed) {
			this.#passCount++;
		} else {
			this.#failCount++;
		}
		this.#reports.push({
			message: message,
			pass: hasPassed,
		});
	}

	true(value, message = 'true') {
		this.#reporter({
			result: value === true,
			message,
		});
	}

	false(value, message = 'false') {
		this.#reporter({
			result: value === false,
			message,
		});
	}

	equal(actual, expected, message) {
		this.#reporter({
			result: actual == expected,
			actual,
			expected,
			message,
		});
	}

	notEqual(actual, expected, message = 'not equal') {
		this.#reporter({
			result: actual == expected,
			actual,
			expected,
			message,
			negative: true,
		});
	}

	strictEqual(actual, expected, message = 'strict equal') {
		this.#reporter({
			result: actual === expected,
			actual,
			expected,
			message,
		});
	}

	notStrictEqual(actual, expected, message = 'not strict equal') {
		this.#reporter({
			result: actual === expected,
			actual,
			expected,
			message,
			negative: true,
		});
	}

	throws(func, error, message = 'throws') {
		let thrown = false;

		try {
			func();
		} catch (err) {
			thrown = true;
		}

		//this.#reporter({
		//	result: thrown && error ==
		//})
	}

	get report() {
		return {
			name: this.#name,
			entries: this.#reports,
			assertCount: this.#passCount + this.#failCount,
			passCount: this.#passCount,
		};
	}

	//send data to the collection
}
