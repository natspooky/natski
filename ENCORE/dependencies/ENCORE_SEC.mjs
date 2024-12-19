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
		if (Array.isArray(elementData.classes)) {
			for (const value of elementData.classes) {
				element.classList.add(value);
			}
		} else {
			element.classList.add(elementData.classes);
		}
	}

	if (elementData.attributes) {
		for (const [attribute, value] of Object.entries(
			elementData.attributes,
		)) {
			if (checkExists(value)) element.setAttribute(attribute, value);
		}
	}

	if (elementData.events) {
		for (const [eventType, event] of Object.entries(elementData.events)) {
			if (event)
				element.addEventListener(
					eventType,
					functionType(event, element),
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

function functionType(event, element) {
	if (checkExists(event.var)) {
		if (Array.isArray(event.var) && event.var.length > 1) {
			if (event.var[0] === 'self') {
				return () => event.func(element, ...event.var.slice(1));
			} else if (event.var[0] === 'event') {
				return (ev) => event.func(ev, ...event.var.slice(1));
			} else {
				return () => event.func(...event.var);
			}
		} else {
			if (Array.isArray(event.var)) event.var = event.var[0];
			if (event.var === 'self') {
				return () => event.func(element);
			} else if (event.var === 'event') {
				return (ev) => event.func(ev);
			} else {
				return () => event.func(event.var);
			}
		}
	} else {
		return () => event.func();
	}
}

export function appendChildren(element, children) {
	for (const child of children) {
		element.appendChild(child);
	}
}

export function checkExists(data) {
	return data !== null && data !== undefined;
}

export function setFallback(data, fallback) {
	if (checkExists(data)) return data;
	return fallback;
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

export function elementJsonify(element) {
	let json = {};

	json.tag = element.tagName;

	if (element.attributes) {
		json.attributes = {};
		for (const attribute of element.attributes) {
			if (attribute.nodeName !== 'class') {
				json.attributes[attribute.nodeName] = attribute.nodeValue;
			}
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
