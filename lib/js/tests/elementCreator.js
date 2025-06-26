import {
	jsonElementify,
	appendChildren,
	insertChildrenBefore,
	ComponentManager,
} from '../../../apis/encore/element-creator/ec.js';

import TestSystem from '../../../apis/simple/simple-test/ts.js';

const tester = new TestSystem();

tester.module('new module', () => {
	console.log('fired');
});

tester.module.burger();
