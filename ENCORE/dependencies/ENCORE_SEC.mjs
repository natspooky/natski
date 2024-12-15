/*!
 * ENCORE SUPER ELEMENT CREATOR
 * Author: NATSKI
 * MIT License
 */

export function jsonElementify(elementData) {
	let element = document.createElement(elementData.tag);

	if (elementData.innerHTML) {
		element.innerHTML = elementData.innerHTML;
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
			if (value) element.setAttribute(attribute, value);
		}
	}

	if (elementData.events) {
		for (const [eventType, event] of Object.entries(elementData.events)) {
			element.addEventListener(
				eventType,
				event.var
					? event.var === 'self'
						? () => event.func(element)
						: event.var === 'event'
						? (ev) => event.func(ev)
						: () => event.func(event.var)
					: () => event.func(),
			);
		}
	}

	if (elementData.children) {
		for (const child of elementData.children) {
			if (
				!(
					Object.keys(child).length === 0 &&
					child.constructor === Object
				)
			) {
				element.appendChild(jsonElementify(child));
			}
		}
	}

	return element;
}

export function elementJsonify(element) {
	let json = {};

	json.tag = element.tagName;

	if (element.attributes) {
		json.attributes = {};
		for (const attribute of element.attributes) {
			if (attribute.nodeName === 'class') continue;
			json.attributes[attribute.nodeName] = attribute.nodeValue;
		}
	}

	if (element.className) {
		json.classes = [...element.className.split(' ')];
	}

	if (element.children.length > 0) {
		json.children = [];
		for (const child of element.children) {
			json.children.push(elementJsonify(child));
		}
	} else {
		json.innerHTML = element.innerHTML;
	}
	return json;
}

export function appendChildren(element, children) {
	for (const child of children) {
		element.appendChild(child);
	}
}

export function jsonMultiElementify(elements) {
	let arr = [];
	for (const element of elements) {
		if (
			!(
				Object.keys(element).length === 0 &&
				element.constructor === Object
			)
		) {
			arr.push(jsonElementify(element));
		}
	}
	return arr;
}
