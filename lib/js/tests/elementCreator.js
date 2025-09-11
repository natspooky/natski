import {
	buildComponent,
	appendChildren,
	insertChildrenBefore,
	ComponentManager,
} from '../../../apis/encore/element-creator/ec.js';

import TestSystem from '../../../apis/simple/simple-test/core/simpleTest.js';

import SimpleCanvas from '../../../apis/simple/simple-canvas/core/simpleCanvas.js';
const tester = new TestSystem();

tester.collection('parent collection', (test) => {
	test.collection('child collection', (test) => {
		test.collection('child child collection', (test, hooks) => {
			test.test('test 1', (assert) => {
				assert.false(1 === 1, 'john');
			});
		});

		test.test('test 2', (assert) => {
			assert.true(true);
		});
	});

	test.test('test 3', (assert) => {
		assert.true(true, 'passed');
		assert.true(true, 'passed');
		assert.true(true, 'passed');
		assert.true(true, 'passed');
		assert.true(true, 'passed');
		assert.true(true, 'passed');
	});
});

tester.start();

const simpleCanvas = SimpleCanvas.create('#burger .based', {
	autoClear: false,
});

console.log(simpleCanvas.config.autoClear);
