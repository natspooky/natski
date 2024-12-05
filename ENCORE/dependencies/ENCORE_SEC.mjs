/*!
 * ENCORE SUPER ELEMENT CREATOR
 * Author: NATSKI
 * MIT License
 */

export function element(elementData) {
	let element = document.createElement(elementData.type);

	if (elementData.innerHTML) {
		element.innerHTML = innerHTML;
	}

	if (elementData.classes) {
		for (const value of elementData.classes) {
			element.classList.add(value);
		}
	}

	if (elementData.attributes) {
		for (const [attribute, value] of Object.entries(
			elementData.attributes,
		)) {
			element.setAttribute(attribute, value);
		}
	}

	if (elementData.events) {
		for (const [eventType, event] of Object.entries(elementData.events)) {
			element.addEventListener(
				eventType,
				event.var ? () => event.func(event.var) : () => event.func(),
			);
		}
	}

	if (elementData.children) {
		if (typeof elementData.children[Symbol.iterator] === 'function') {
			appendChildren(element, elementData.children);
		} else {
			element.appendChild(elementData.children);
		}
	}

	return element;
}

// structure
/*
{
	type: 'div',
	classes: [],
	events: {
		
	},
	attributes: {

	},
	innnerHTML: "",
	children: []
	
	
}
*/

export function editElement(
	element,
	elementClass,
	elementAttributes,
	innerText,
) {
	if (elementClass) {
		element.className = elementClass;
	}

	if (innerText) {
		element.innerHTML = innerHTML;
	}

	if (elementAttributes) {
		for (const [attribute, value] of Object.entries(elementAttributes)) {
			element.setAttribute(attribute, value);
		}
	}

	return element;
}

export function appendChildren(element, children) {
	for (const child of children) {
		element.appendChild(child);
	}
}
