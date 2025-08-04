/* -----------------------------------------------
/* Author : NATSKI - natski.dev
/* MIT license : https://opensource.org/license/MIT
/* GitHub : https://github.com/natspooky/encore
/* How to use? : Check the GitHub README or visit https://natski.dev/apis/encore/element-creator
/* ----------------------------------------------- */

//const ecWorker = new Worker(new URL("ecWorker.js", import.meta.url));

import IconSystem from '../icon-system/is.min.js';
import encoreConsole from '../dependencies/encoreConsole.js';

function buildComponent(elementData) {
	if (Array.isArray(elementData)) {
		const arr = [];

		elementData.forEach((element) => {
			if (checkForKeys(element) || element.nodeType)
				arr.push(buildComponent(element));
		});

		return arr;
	}

	if (elementData && elementData.nodeType) return elementData;

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
		appendChildren(element, buildComponent(elementData.children));
	}

	if (elementData.events) {
		Object.entries(elementData.events).forEach(([eventType, event]) => {
			if (!event) {
				return;
			}

			if (!checkEvent(eventType)) {
				encoreConsole({
					message: 'Support warning:',
					warn: `Event '${eventType}' is not supported in current Document`,
				});
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
		if (typeof elementData.onAppend !== 'function') {
			encoreConsole({
				message: 'Event error:',
				error: `The onAppend event value '${elementData.onAppend}' is not a function`,
			});
		} else {
			elementAppended(element, elementData.onAppend);
		}
	}

	if (elementData.onCreation) {
		if (typeof elementData.onCreation !== 'function') {
			encoreConsole({
				message: 'Event error:',
				error: `The onCreation event value '${elementData.onCreation}' is not a function`,
			});
		} else {
			elementData.onCreation(element);
		}
	}

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

function render(root, callback, settings) {
	if (window.EncoreRender) {
		encoreConsole({
			message: 'Hydration error:',
			error: 'Only one render call can be made per page',
		});
		return;
	}

	window.EncoreRender = true;

	encoreConsole({
		message: 'Hydrating page',
	});

	if (settings?.useIcons && !window.IconSystem) new IconSystem();

	const manager = new ComponentManager();
	const rootType = typeof root;
	let rootElement;

	if (rootType !== 'string' && rootType !== 'object') {
		encoreConsole({
			message: 'Hydration error:',
			error: `The root element '${root}' is not an ID or a HTMLElement`,
		});
		return;
	}

	if (rootType === 'string') {
		rootElement = document.getElementById(root);
		if (!rootElement) {
			encoreConsole({
				message: 'Hydration error:',
				error: `The root element '${root}' does not exist in the document`,
			});
			return;
		}
	}

	if (rootType === 'object') {
		rootElement = root;
		if (
			!(
				rootElement.nodeType &&
				rootElement.nodeType === Node.ELEMENT_NODE
			)
		) {
			encoreConsole({
				message: 'Hydration error:',
				error: `The root element '${rootElement}' does not exist in the document`,
			});
			return;
		}
	}

	const hydrate = async (components) => {
		try {
			const time = performance.now();
			const renderComponent = await callback(components);
			const componentName = 'content';
			const layout = components.layout;

			const content = components
				.setComponent(componentName, renderComponent)
				.getComponent(componentName);

			if (layout) {
				components.setComponent(
					'layout',
					layout({
						children: content.fragment ?? content.element,
					}),
				);
			}

			components.appendComponent(
				rootElement,
				layout ? 'layout' : componentName,
			);

			const finalTime = Math.round(performance.now() - time);

			components.componentIDs.forEach((ID) => {
				encoreConsole({
					message: `Component '${ID}' rendered`,
				});
			});

			encoreConsole({
				message: `Hydration complete in ${
					finalTime > 0 ? finalTime : '< 1'
				}ms`,
			});

			if (finalTime > 500) {
				encoreConsole({
					message: 'Performance warning:',
					warn: `${finalTime}ms. :(`,
				});
			}
		} catch (error) {
			encoreConsole({
				message: 'Hydration failed:',
			});
			console.error(error);
		}
	};

	if (document.readyState === 'loading') {
		window.addEventListener('DOMContentLoaded', () => {
			hydrate(manager);
		});
		return;
	}

	hydrate(manager);

	if (document.readyState === 'complete')
		encoreConsole({
			message: 'Performance warning:',
			warn: 'Rendering after document load is unadvised',
		});
}

function jsonElementAppend(element, elementData) {
	if (!(element.nodeType && element.nodeType === Node.ELEMENT_NODE)) {
		encoreConsole({
			message: 'Type error:',
			error: 'Element provided is not a HTML Node',
		});
		return;
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
		appendChildren(element, buildComponent(elementData.children));
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
		if (typeof elementData.onAppend !== 'function') {
			encoreConsole({
				message: 'Event error:',
				error: `The onAppend event value '${elementData.onAppend}' is not a function`,
			});
			return;
		}

		elementAppended(element, elementData.onAppend);
	}

	if (elementData.onCreation) {
		if (typeof elementData.onCreation !== 'function') {
			encoreConsole({
				message: 'Event error:',
				error: `The onCreation event value '${elementData.onCreation}' is not a function`,
			});
			return;
		}
		elementData.onCreation(element);
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
		for (const mutation of mutations) {
			if (mutation.addedNodes.length === 0) continue;
			if (
				Array.from(mutation.addedNodes).filter((node) =>
					node.contains(element),
				).length === 0
			)
				continue;
			observer.disconnect();
			callback(element);
			break;
		}
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
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
	if (!children) return;
	if (Array.isArray(children)) {
		for (const child of children) {
			element.appendChild(child);
		}
	} else {
		element.appendChild(children);
	}

	return element;
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

function checkForKeys(component) {
	return (
		Object.keys(component).length !== 0 && component.constructor === Object
	);
}

class ComponentManager {
	#components;
	#componentGroups;
	#layout;

	constructor() {
		this.#components = {};
		this.#componentGroups = {};
	}

	//groups

	setGroup(ID) {
		if (this.getGroup(ID)) {
			encoreConsole({
				message: 'Assignment Error:',
				error: `The group '${ID}' is already assigned`,
			});
			return;
		}
		this.#componentGroups[ID] = new ComponentManager();

		return this.#componentGroups[ID];
	}

	getGroup(ID) {
		return this.#componentGroups?.[ID];
	}

	getGroups(...IDs) {
		return [...IDs].map((ID) => this.getGroup(ID));
	}

	getAllGroups() {
		return Object.entries(this.#componentGroups).map(([, group]) => {
			return group;
		});
	}

	removeGroup(ID) {
		const group = this.getGroup(ID);
		if (!group) {
			encoreConsole({
				message: 'Error:',
				error: `The group '${ID}' does not exist`,
			});
			return;
		}

		group.removeAllComponents();

		delete this.#components[ID];
	}

	removeGroups(...IDs) {
		[...IDs].forEach((ID) => this.removeGroup(ID));
	}

	removeAllGroups() {
		Object.entries(this.#componentGroups).forEach(([ID]) =>
			this.removeGroup(ID),
		);
	}

	//components

	#createComponent(jsonString) {
		let fragment,
			component = buildComponent(jsonString);

		if (Array.isArray(component)) {
			fragment = document.createDocumentFragment();

			component.forEach((element) => {
				fragment.appendChild(element);
			});
		}

		return { fragment, component };
	}

	setComponent(ID, jsonString, settings) {
		if (this.getComponent(ID)) {
			encoreConsole({
				message: 'Assignment Error:',
				error: `The component '${ID}' is already assigned`,
			});
			return;
		}

		const { fragment, component } = this.#createComponent(
			jsonString,
			settings,
		);

		this.#components[ID] = {
			json: jsonString,
			element: component,
			fragment: fragment,
			settings: settings,
		};

		return this;
	}

	getComponent(ID) {
		return this.#components?.[ID];
	}

	getComponents(...IDs) {
		return [...IDs].map((ID) => this.getComponent(ID));
	}

	getAllComponents() {
		return Object.entries(this.#components).map(([, element]) => {
			return element;
		});
	}

	removeComponent(ID) {
		const component = this.getComponent(ID)?.element;
		if (!component) {
			encoreConsole({
				message: 'Error:',
				error: `The component '${ID}' does not exist`,
			});
			return;
		}

		if (!Array.isArray(component) && document.body.contains(component)) {
			component.remove();
		} else {
			component.forEach((element) => {
				if (document.body.contains(element)) element.remove();
			});
		}

		delete this.#components[ID];

		return this;
	}

	removeComponents(...IDs) {
		[...IDs].forEach((ID) => this.removeComponent(ID));

		return this;
	}

	removeAllComponents() {
		Object.entries(this.#components).forEach(([ID]) =>
			this.removeComponent(ID),
		);

		return this;
	}

	changeComponentID(oldID, newID) {
		if (oldID === newID) return;

		const oldComponent = this.getComponent(oldID),
			newComponent = this.getComponent(newID);

		if (!oldComponent) {
			encoreConsole({
				message: 'Error:',
				error: `The component '${oldID}' does not exist`,
			});
			return;
		}

		if (newComponent) {
			encoreConsole({
				message: 'Assignment error:',
				error: `The component '${newID}' is already assigned`,
			});
			return;
		}

		this.setComponent(newID, oldComponent.json);
		delete this.#components[oldID];

		return this;
	}

	replaceComponent(ID, jsonString, settings) {
		const oldComponent = this.getComponent(ID),
			{ fragment, component } = this.#createComponent(
				jsonString,
				settings,
			);

		if (!oldComponent) {
			encoreConsole({
				message: 'Error:',
				error: `The component '${ID}' does not exist`,
			});
			return;
		}

		if (Array.isArray(oldComponent.element)) {
			if (!document.body.contains(oldComponent.element[0])) {
				encoreConsole({
					message: 'Error:',
					error: `The component '${ID}' does not exist`,
				});
				return;
			}
			oldComponent.element.forEach((element) => {
				element.replaceWith(fragment ?? component);
			});
		} else {
			if (!document.body.contains(oldComponent.element)) {
				encoreConsole({
					message: 'Error:',
					error: `The component '${ID}' does not exist`,
				});
				return;
			}
			oldComponent.element.replaceWith(fragment ?? component);
		}

		this.#components[ID] = {
			json: jsonString,
			element: component,
			fragment: fragment,
			settings: settings,
		};

		return this;
	}

	appendComponent(element, ID) {
		const component = this.getComponent(ID);
		if (!component) {
			encoreConsole({
				message: 'Error:',
				error: `The component '${ID}' does not exist`,
			});
			return;
		}

		appendChildren(element, component.fragment ?? component.element);

		return this;
	}

	insertComponentBefore(element, ID, beforeElement) {
		const component = this.getComponent(ID);
		if (!component) {
			encoreConsole({
				message: 'Error:',
				error: `The component '${ID}' does not exist`,
			});
			return;
		}

		insertChildrenBefore(
			element,
			component.fragment ?? component.element,
			beforeElement,
		);

		return this;
	}

	get componentCount() {
		return Object.entries(this.#components).length;
	}

	get componentIDs() {
		return Object.entries(this.#components).map(([ID]) => {
			return ID;
		});
	}

	set layout(callback) {
		this.#layout = callback;
	}

	get layout() {
		return this.#layout;
	}
}

export {
	buildComponent as jsonElementify,
	jsonElementAppend,
	checkExists,
	setFallback,
	appendChildren,
	insertChildrenBefore,
	className,
	elementAppended,
	ComponentManager,
	checkEvent,
	render,
};
