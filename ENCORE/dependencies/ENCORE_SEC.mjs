/*!
 * ENCORE SUPER ELEMENT CREATOR
 * Author: NATSKI
 * MIT License
 */

export function element(
	elementType,
	elementClass,
	elementEvents,
	elementAttributes,
	innerHTML,
	childElements,
) {
	let element = document.createElement(elementType);

	if (innerHTML) {
		element.innerHTML = innerHTML;
	}

	if (elementClass) {
		for (const value of elementClass) {
			element.classList.add(value);
		}
	}

	if (elementAttributes) {
		for (const [attribute, value] of Object.entries(elementAttributes)) {
			element.setAttribute(attribute, value);
		}
	}

	if (elementEvents) {
		for (const [eventType, event] of Object.entries(elementEvents)) {
			element.addEventListener(
				eventType,
				event.var ? () => event.func(event.var) : () => event.func(),
			);
		}
	}

	if (childElements) {
		if (typeof childElements[Symbol.iterator] === 'function') {
			appendChildren(element, childElements);
		} else {
			element.appendChild(childElements);
		}
	}

	return element;
}

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
