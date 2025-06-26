import {
	jsonElementify,
	appendChildren,
	insertChildrenBefore,
	ComponentManager,
} from '../../../apis/encore/element-creator/ec.min.js';

import {
	testErrorThrow,
	testEquals,
	testType,
} from "from '../../../apis/encore/element-creator/ec.min.js';";

function load() {
	appendChildren(
		document.getElementsByTagName('main')[0],
		jsonElementify(IconGrid()),
	);
}

/*
		setup
*/

const cmpm = new ComponentManager();

const testBox = jsonElementify({
	tag: 'div',
	attributes: {
		id: 'Element Creator',
	},
});

document.body.appendChild(testBox);

/*
		JsonElementify
*/

/*
		AppendChildren
*/

/*
		InsertChildrenBefore
*/

/*
		ClassName
*/

/*
		ComponentManager
*/

cmpm.setComponent('burger', {
	tag: 'div',
	attributes: {
		style: 'width: 100px; height: 100px; background: red; position: relative; display: block',
	},
});

try {
	cmpm.setComponent('burger', {
		tag: 'test',
	});
} catch (err) {
	console.error(err);
}

cmpm.appendComponent(document.body, 'burger');

console.log(cmpm.getComponent('burger'), cmpm.componentNames);

setTimeout(() => {
	cmpm.replaceComponent('burger', {
		tag: 'span',
		attributes: {
			style: 'width: 100px; height: 100px; background: blue; position: relative; display: block',
		},
	});
	console.log(cmpm.getComponent('burger'), cmpm.componentNames);
}, 800);
