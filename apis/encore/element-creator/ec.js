/* -----------------------------------------------
/* Author : NATSKI - natski.net
/* MIT license : https://opensource.org/license/MIT
/* GitHub : https://github.com/natspooky/encore
/* How to use? : Check the GitHub README or visit https://natski.net/apis/encore/element-creator
/* ----------------------------------------------- */

function jsonElementify(elementData) {
	if (Array.isArray(elementData)) {
		const arr = [];

		elementData.forEach((element) => {
			if (checkForKeys(element)) {
				arr.push(jsonElementify(element));
			}
		});

		return arr;
	}

	let element;

	if (elementData.tag) {
		switch (elementData.tag) {
			case 'text':
				return document.createTextNode(
					elementData.text ? elementData.text : '',
				);
			default:
				if (!elementData.namespace) {
					element = document.createElement(elementData.tag);
				} else {
					element = document.createElementNS(
						elementData.namespace,
						elementData.tag,
					);
				}
		}
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

	if (elementData.children) {
		appendChildren(element, jsonElementify(elementData.children));
	}

	if (elementData.events) {
		Object.entries(elementData.events).forEach(([eventType, event]) => {
			if (!event) {
				return;
			}

			if (!checkEvent(eventType)) {
				console.warn(
					`Event '${eventType}' is not supported on:`,
					element,
				);
				return;
			}

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
		});
	}

	if (elementData.onAppend) {
		// figure out a good name for this or find a way to join it into the event list
		elementAppended(element, elementData.onAppend);
	}

	elementData.onCreation?.(element);

	return element;
}

function checkEvent(eventName) {
	if (typeof eventName != 'string' || eventName.length == 0) return false;
	const TAGNAMES = {
		select: 'input',
		change: 'input',
		submit: 'form',
		reset: 'form',
		error: 'img',
		load: 'img',
		abort: 'img',
	};
	let element = document.createElement(TAGNAMES[eventName] || 'div');
	eventName = 'on' + eventName;
	let isSupported = eventName in element;
	if (!isSupported) {
		element.setAttribute(eventName, 'return;');
		isSupported = typeof element[eventName] == 'function';
	}
	element = null;
	return isSupported;
}

/*
function state(constructor) {
	const data = {
		value: constructor,
	};
	const variable = () => {
		return data.value;
	};

	const setter = (value) => {
		data.value = value;
	};

	return [variable, setter];
}*/

function jsonElementAppend(element, elementData) {
	if (element && element.nodeType === Node.ELEMENT_NODE) {
		throw new TypeError('Element provided is not a HTML Node');
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

	if (elementData.children) {
		appendChildren(element, jsonElementify(elementData.children));
	}

	if (elementData.events) {
		Object.entries(elementData.events).forEach(([eventType, event]) => {
			if (!event) {
				return;
			}

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
		});
	}

	if (elementData.onAppend) {
		// figure out a good name for this or find a way to join it into the event list
		elementAppended(element, elementData.onAppend);
	}

	return element;
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

function elementAppended(element, callback) {
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
	if (!checkExists(event.param)) return () => event.callback();

	if (Array.isArray(event.param) && event.param.length > 1) {
		if (event.param[0] === 'self') {
			return () => event.callback(element, ...event.param.slice(1));
		} else if (event.param[0] === 'event') {
			return (ev) => event.callback(ev, ...event.param.slice(1));
		} else {
			return () => event.callback(...event.param);
		}
	} else {
		if (Array.isArray(event.param)) event.param = event.param[0];
		if (event.param === 'self') {
			return () => event.callback(element);
		} else if (event.param === 'event') {
			return (ev) => event.callback(ev);
		} else {
			return () => event.callback(event.param);
		}
	}
}

function checkExists(data) {
	return undefined !== data && data !== null;
}

function setFallback(data, fallback) {
	if (checkExists(data)) return data;
	return fallback;
}

function appendChildren(element, children) {
	if (Array.isArray(children)) {
		for (const child of children) {
			element.appendChild(child);
		}
	} else {
		element.appendChild(children);
	}
}

function insertChildrenBefore(element, children, beforeElement) {
	if (Array.isArray(children)) {
		for (const child of children) {
			element.insertBefore(child, beforeElement);
		}
	} else {
		element.insertBefore(children, beforeElement);
	}
}

function className(classes, ...extraClasses) {
	if (![...extraClasses][0]) return classes;
	if (!Array.isArray(classes)) classes = classes.split(' ');
	[...extraClasses].forEach((classData) => {
		if (!Array.isArray(classData)) classData = classData.split(' ');
		classes.push(...classData);
	});

	return classes;
}

class ComponentManager {
	#components;

	constructor() {
		this.#components = {};
	}

	setComponent(ID, jsonString) {
		if (this.getComponent(ID))
			throw new Error(`Component ID "${ID}" is already assigned`);

		const component = jsonElementify(jsonString);

		this.#components[ID] = {
			json: jsonString,
			element: component,
			type: Array.isArray(component) ? 'Element Array' : 'Element',
		};
	}

	getComponent(ID) {
		return this.#components?.[ID];
	}

	getComponents(...IDs) {
		return [...IDs].map((ID) => this.getComponent(ID));
	}

	getAllComponents() {
		return Object.entries(this.#components).map(([_, element]) => {
			return element;
		});
	}

	removeComponent(ID) {
		const component = this.getComponent(ID).element;
		if (!component) throw new Error(`Component ID "${ID}" does not exist`);

		if (!Array.isArray(component) && document.body.contains(component)) {
			component.remove();
		} else {
			component.forEach((element) => {
				if (document.body.contains(element)) element.remove();
			});
		}

		delete this.#components[ID];
	}

	removeComponents(...IDs) {
		[...IDs].forEach((ID) => this.removeComponent(ID));
	}

	removeAllComponents() {
		Object.entries(this.#components).forEach(([ID, _]) =>
			this.removeComponent(ID),
		);
	}

	changeComponentID(oldID, newID) {
		if (oldID === newID) return;

		const oldComponent = this.getComponent(oldID),
			newComponent = this.getComponent(newID);

		if (!oldComponent)
			throw new Error(`Component ID "${oldID}" does not exist`);

		if (newComponent)
			throw new Error(`Component ID "${newID}" is already assigned`);

		this.setComponent(newID, oldComponent.json);
		delete this.#components[oldID];
	}

	//FIX -- wont work. consider a diff approach
	replaceComponent(ID, jsonString) {
		const oldComponent = this.getComponent(ID),
			newComponent = jsonElementify(jsonString);
		if (!oldComponent) {
			this.setComponent(ID, jsonString);
			return;
		}
		//fix .contains to work with arr
		if (document.body.contains(oldComponent.element)) {
			console.log(oldComponent.element);

			if (Array.isArray(oldComponent.element)) {
				[...oldComponent.element].forEach((element) => {
					element.replace(...newComponent);
				});
			} else {
				oldComponent.element.replaceWith(newComponent);
			}
		}

		this.#components[ID] = {
			json: jsonString,
			element: newComponent,
			type: Array.isArray(newComponent) ? 'Element Array' : 'Element',
		};
	}

	appendComponent(element, ID) {
		const component = this.getComponent(ID).element;
		if (!component) throw new Error(`Component ID "${ID}" does not exist`);
		appendChildren(element, component);
	}

	insertComponentBefore(element, ID, beforeElement) {
		const component = this.getComponent(ID).element;
		if (!component) throw new Error(`Component ID "${ID}" does not exist`);
		insertChildrenBefore(element, component, beforeElement);
	}

	get componentCount() {
		return Object.entries(this.#components).length;
	}

	// kinda useless? maybe get rid of
	get componentIDsByType() {
		let el = [],
			elarr = [];

		Object.entries(this.#components).forEach(([ID, data]) => {
			if (data.type === 'Element') {
				el.push(ID);
			} else {
				elarr.push(ID);
			}
		});

		return {
			Element: el,
			'Element Array': elarr,
		};
	}

	// VERY useless 100% remove unless i can find a usecase
	get componentIDs() {
		return Object.entries(this.#components).map(([ID, _]) => {
			return ID;
		});
	}
}

export {
	jsonElementify,
	jsonElementAppend,
	checkExists,
	setFallback,
	appendChildren,
	insertChildrenBefore,
	className,
	elementAppended,
	ComponentManager,
	checkEvent,
	//state,
};
