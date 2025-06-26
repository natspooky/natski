/* -----------------------------------------------
/* Author : NATSKI - natski.dev
/* MIT license : https://opensource.org/license/MIT
/* GitHub : https://github.com/natspooky/test
/* How to use? : Check the GitHub README or visit https://natski.dev/api/encore/element-creator
/* ----------------------------------------------- */

export function testErrorThrow(func, ...params) {
	if (typeof func !== 'function')
		throw new Error('No function provided for testing');

	try {
		func(...params);
	} catch (error) {
		console.log(`Passed.\n(${error}) was thrown`);
		return true;
	}
	console.warn('Failed. No error was thrown');
	return false;
}

export function testEquals(input, output) {
	if (input === output) {
		console.log('Passed.');
		return true;
	}

	console.warn(
		`Failed.\nExpected: ${typeof input} ${input}\nRecieved: ${typeof output} ${output}`,
	);
	return false;
}

export function testType(input, type) {
	const inp = typeof input;

	if (typeof inp === type) {
		console.log('Passed.');
		return true;
	}

	console.warn(`Failed.\nExpected: ${type}\nRecieved: ${inp}`);
	return false;
}
