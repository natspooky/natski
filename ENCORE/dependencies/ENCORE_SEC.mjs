/*!
 * ENCORE SUPER ELEMENT CREATOR
 * Author: NATSKI
 * MIT License
 */

export function createElement(
	elementType,
	elementClass,
	elementEvents,
	elementAttributes,
	innerHTML,
	childElement,
) {
	let element = document.createElement(elementType);

	if (elementClass) {
		element.className = elementClass;
	}

	if (innerHTML) {
		element.innerHTML = innerHTML;
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

	if (childElement) {
		element.appendChild(childElement);
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
