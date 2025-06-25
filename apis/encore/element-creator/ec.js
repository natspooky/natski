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

	let element = elementData.namespace
		? document.createElementNS(elementData.namespace, elementData.tag)
		: document.createElement(elementData.tag);

	if (!element) {
		throw new Error('an invalid TAG has been applied');
	}

	if (elementData.innerHTML) {
		element.innerHTML = elementData.innerHTML;
	}

	if (elementData.classes) {
		if (Array.isArray(elementData.classes)) {
			elementData.classes.forEach((className) => {
				if (className.includes(' ')) {
					elementData.classes.split(' ').forEach((className) => {
						element.classList.add(className);
					});
				} else {
					element.classList.add(className);
				}
			});
		} else {
			elementData.classes.split(' ').forEach((className) => {
				element.classList.add(className);
			});
		}
	}

	if (elementData.attributes) {
		Object.entries(elementData.attributes).forEach(([attribute, value]) => {
			if (checkExists(value)) {
				element.setAttribute(attribute, value);
			}
		});
	}
	/*
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
*/
	if (elementData.children) {
		appendChildren(element, jsonElementify(elementData.children));
	}

	if (elementData.events) {
		Object.entries(elementData.events).forEach(([eventType, event]) => {
			if (event) {
				if (Array.isArray(event)) {
					event.forEach((eventData) => {
						element.addEventListener(
							eventType,
							functionType(eventData, element),
							eventData.options,
						);
					});
				} else {
					element.addEventListener(
						eventType,
						functionType(event, element),
						event.options,
					);
				}
			}
		});
	}

	if (elementData.load) {
		onceAppendedSync(element, elementData.load);
	}

	return element;
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

function useDeprecatedMethod(element, callback) {
	let listener;
	return element.addEventListener(
		`DOMNodeInserted`,
		(listener = (ev) => {
			if (
				ev.path.length > 1 &&
				ev.path[ev.length - 2] instanceof Document
			) {
				element.removeEventListener(`DOMNodeInserted`, listener);
				callback(element);
			}
		}),
		false,
	);
}

function isAppended(element) {
	while (element.parentNode) element = element.parentNode;
	return element instanceof Document;
}

function onceAppendedSync(element, callback) {
	if (isAppended(element)) {
		callback(element);
		return;
	}

	if (!MutationObserver) return useDeprecatedMethod(element, callback);

	const observer = new MutationObserver((mutations) => {
		if (mutations[0].addedNodes.length === 0) return;
		if (
			Array.from(mutations[0].addedNodes).filter((node) =>
				node.contains(element),
			).length === 0
		)
			return;
		observer.disconnect();
		callback(element);
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
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

export function className(classes, ...extraClasses) {
	if (![...extraClasses][0]) return classes;
	if (!Array.isArray(classes)) classes = classes.split(' ');
	[...extraClasses].forEach((classData) => {
		if (!Array.isArray(classData)) classData = classData.split(' ');
		classes.push(...classData);
	});

	return classes;
}

export class ComponentManager {
	#componentTable = {};
	#managerName;

	constructor(name) {
		this.#managerName = name;
	}

	get name() {
		return this.#managerName;
	}

	setComponent(ID, element) {
		if (this.getComponent(ID))
			throw new Error(
				'Component ID is already in use. Use "replaceComponent" for reassigning components',
			);

		if (element && element.nodeType === Node.ELEMENT_NODE) {
			this.#componentTable[ID] = element;
			return;
		}

		this.#componentTable[ID] = jsonElementify(jsonString);
	}

	getComponent(ID) {
		return this.#componentTable?.[ID];
	}

	getComponents(...IDs) {
		return [...IDs].map((ID) => this.getComponent(ID));
	}

	getAllComponents() {
		return Object.entries(this.#componentTable).map(([_, element]) => {
			return element;
		});
	}

	removeComponent(ID) {
		const component = this.getComponent(ID);
		if (!component) return;

		if (document.body.contains(component)) component.remove();

		delete this.#componentTable[ID];
	}

	removeComponents(...IDs) {
		[...IDs].forEach((ID) => this.removeComponent(ID));
	}

	removeAllComponents() {
		Object.entries(this.#componentTable).forEach(([ID, _]) =>
			this.removeComponent(ID),
		);
	}

	changeComponentID(oldID, newID) {
		const oldComponent = this.getComponent(oldID),
			newComponent = this.getComponent(newID);

		if (!oldComponent)
			throw new Error(
				"Component ID doesn't match any existing components",
			);

		if (newComponent)
			throw new Error(
				'New component ID is already assigned to a component',
			);

		this.setComponent(newID, oldComponent);
		delete this.#componentTable[oldID];
	}

	replaceComponent(ID, jsonString) {
		const oldComponent = this.getComponent(ID),
			newComponent = jsonElementify(jsonString);
		if (!oldComponent) {
			this.setComponent(ID, jsonString);
			return;
		}

		this.#componentTable[ID] = newComponent;

		if (document.body.contains(oldComponent)) {
			insertChildrenBefore(
				oldComponent.parentNode,
				newComponent,
				oldComponent,
			);
			oldComponent.remove();
		}
	}

	appendComponent(element, ID) {
		appendChildren(element, this.getComponent(ID));
	}

	insertComponent(element, ID, beforeElement) {
		insertChildrenBefore(element, this.getComponent(ID), beforeElement);
	}

	get componentCount() {
		return this.#componentTable.length;
	}
}
