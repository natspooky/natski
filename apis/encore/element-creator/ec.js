/* -----------------------------------------------
/* Author : NATSKI - natski.net
/* MIT license : https://opensource.org/license/MIT
/* GitHub : https://github.com/natspooky/encore
/* How to use? : Check the GitHub README or visit https://natski.net/api/encore/element-creator
/* ----------------------------------------------- */

export function jsonElementify(elementData) {
	if (Array.isArray(elementData)) {
		return jsonMultiElementify(elementData);
	}

	let element = document.createElement(elementData.tag);

	if (!element) {
		throw new Error('an invalid TAG has been applied');
	}

	if (elementData.innerHTML) {
		element.innerHTML = elementData.innerHTML;
	}

	if (elementData.classes) {
		if (Array.isArray(elementData.classes)) {
			elementData.classes.forEach((className) => {
				element.classList.add(className);
			});
		} else {
			elementData.classes.split(' ').forEach((className) => {
				element.classList.add(className);
			});
		}
	}

	if (elementData.events) {
		Object.entries(elementData.events).forEach(([eventType, event]) => {
			if (event) {
				element.addEventListener(
					eventType,
					functionType(event, element),
					event.options,
				);
			}
		});
	}

	if (elementData.attributes) {
		Object.entries(elementData.attributes).forEach(([attribute, value]) => {
			if (checkExists(value)) {
				element.setAttribute(attribute, value);
			}
		});
	}

	if (elementData.dataset) {
		Object.entries(elementData.dataset).forEach(([dataName, value]) => {
			if (checkExists(value)) {
				//////////////////////change this
				element.dataset[
					dataName
						.split('-')
						.map((element, index) => {
							if (!index) return element;
							return (
								element.slice(0, 1).toUpperCase() +
								element.slice(1)
							);
						})
						.join('')
				] = value;
			}
		});
	}

	if (elementData.children) {
		appendChildren(element, jsonElementify(elementData.children));
	}

	return element;
}

export function appendChildren(element, children) {
	if (Array.isArray(children)) {
		for (const child of children) {
			element.appendChild(child);
		}
	} else {
		element.appendChild(children);
	}
}

export function insertChildrenBefore(element, children, beforeElement) {
	if (Array.isArray(children)) {
		for (const child of children) {
			element.insertBefore(child, beforeElement);
		}
	} else {
		element.insertBefore(children, beforeElement);
	}
}

function jsonMultiElementify(elements) {
	let arr = [];

	elements.forEach((element) => {
		if (checkForKeys(element)) {
			arr.push(jsonElementify(element));
		}
	});

	return arr;
}

function checkForKeys(obj) {
	return Object.keys(obj).length !== 0 && obj.constructor === Object;
}

function functionType(event, element) {
	if (!checkExists(event.var)) return () => event.func();

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
}

export function checkExists(data) {
	return undefined !== data && data !== null;
}

export function setFallback(data, fallback) {
	if (checkExists(data)) return data;
	return fallback;
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
		json.classes = element.className.split(' ');
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
