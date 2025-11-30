/* -----------------------------------------------
/* Author : NATSKI - natski.dev
/* MIT license : https://opensource.org/license/MIT
/* GitHub : https://github.com/natspooky/encore
/* How to use? : Check the GitHub README or visit https://natski.dev/apis/encore/element-creator
/* ----------------------------------------------- */

//const ecWorker = new Worker(new URL("ecWorker.js", import.meta.url));
//use this to start preloading links

import IconSystem from './icon-system.js';
import Console from '../dependencies/console.js';

const elementCreatorConsole = new Console('Element Creator', '#5967ffff');

class ComponentManager {
	#components;
	#groups;
	#layout;

	constructor() {
		this.#components = {};
		this.#groups = {};
	}

	//groups

	appendGroup(element, ID) {
		const group = this.getGroup(ID);
		if (!group) {
			elementCreatorConsole.message({
				message: 'Error:',
				error: `The group '${ID}' does not exist`,
			});
			return;
		}

		if (group.layout) appendChildren(element, group.componentList());
	}

	setGroup(ID) {
		if (this.getGroup(ID)) {
			elementCreatorConsole.message({
				message: 'Assignment Error:',
				error: `The group '${ID}' is already assigned`,
			});
			return;
		}

		this.#groups[ID] = new ComponentManager();

		return this;
	}

	getGroup(ID) {
		return this.#groups?.[ID];
	}

	removeGroup(ID, settings) {
		const group = this.getGroup(ID);
		if (!group) {
			elementCreatorConsole.message({
				message: 'Error:',
				error: `The group '${ID}' does not exist`,
			});
			return;
		}

		group.removeAllComponents({ deleteComponent: true });

		if (settings?.deleteGroup) delete this.#groups[ID];

		return this;
	}

	// components

	#generateComponent(jsonString) {
		let fragment,
			element = buildComponent(jsonString);

		if (Array.isArray(element)) {
			fragment = document.createDocumentFragment();

			element.forEach((item) => {
				fragment.appendChild(item);
			});
		}

		return { fragment, element };
	}

	setComponent(ID, json, settings) {
		if (this.getComponent(ID)) {
			elementCreatorConsole.message({
				message: 'Assignment Error:',
				error: `The component '${ID}' is already assigned`,
			});
			return;
		}

		const { fragment, element } = this.#generateComponent(json, settings);

		this.#components[ID] = {
			json,
			element,
			fragment,
			settings,
		};

		return this;
	}

	getComponent(ID) {
		return this.#components?.[ID];
	}

	getComponents(...IDs) {
		return [...IDs].map((ID) => this.getComponent(ID));
	}

	componentList() {
		return Object.values(this.#components).map((component) => {
			return component.fragment ?? component.element;
		});
	}

	removeComponent(ID, settings) {
		const component = this.getComponent(ID)?.element;
		if (!component) {
			elementCreatorConsole.message({
				message: 'Error:',
				error: `The component '${ID}' does not exist`,
			});
			return;
		}

		if (!Array.isArray(component)) {
			if (document.body.contains(component)) component.remove();
		} else {
			component.forEach((element) => {
				if (document.body.contains(element)) element.remove();
			});
		}

		if (settings?.deleteComponent) delete this.#components[ID];

		return this;
	}

	removeComponents(...IDs) {
		[...IDs].forEach((ID) => this.removeComponent(ID));

		return this;
	}

	removeAllComponents(settings) {
		Object.keys(this.#components).forEach((ID) =>
			this.removeComponent(ID, settings),
		);

		return this;
	}

	changeComponentID(oldID, newID) {
		if (oldID === newID) return;

		const oldComponent = this.getComponent(oldID),
			newComponent = this.getComponent(newID);

		if (!oldComponent) {
			elementCreatorConsole.message({
				message: 'Error:',
				error: `The component '${oldID}' does not exist`,
			});
			return;
		}

		if (newComponent) {
			elementCreatorConsole.message({
				message: 'Assignment error:',
				error: `The component '${newID}' is already assigned`,
			});
			return;
		}

		this.setComponent(newID, oldComponent.json);
		delete this.#components[oldID];

		return this;
	}

	replaceComponent(ID, componentData, settings) {
		const oldComponent = this.getComponent(ID);

		let replacingComponent;

		if (typeof componentData === 'string') {
			replacingComponent = this.getComponent(componentData);

			if (!replacingComponent) {
				elementCreatorConsole.message({
					message: 'Error:',
					error: `The component '${ID}' does not exist`,
				});
				return;
			}
		} else {
			replacingComponent = this.#generateComponent(
				componentData,
				settings,
			);
		}

		if (!oldComponent) {
			elementCreatorConsole.message({
				message: 'Error:',
				error: `The component '${ID}' does not exist`,
			});
			return;
		}

		if (Array.isArray(oldComponent.element)) {
			if (!document.body.contains(oldComponent.element[0])) {
				elementCreatorConsole.message({
					message: 'Error:',
					error: `The component '${ID}' does not exist`,
				});
				return;
			}

			oldComponent[0].element.replaceWith(
				replacingComponent.fragment ?? replacingComponent.element,
			);
			oldComponent.slice(1).forEach((element) => element.remove());
		} else {
			if (!document.body.contains(oldComponent.element)) {
				elementCreatorConsole.message({
					message: 'Error:',
					error: `The component '${ID}' does not exist`,
				});
				return;
			}
			oldComponent.element.replaceWith(
				replacingComponent.fragment ?? replacingComponent.element,
			);
		}

		this.#components[ID] = {
			json: replacingComponent.json ?? componentData,
			element: replacingComponent.element,
			fragment: replacingComponent.fragment,
			settings,
		};

		return this;
	}

	swapComponent(firstID, secondID) {
		const firstComponent = this.getComponent(firstID)?.json,
			secondComponent = this.getComponent(secondID)?.json;

		if (!firstComponent) {
			elementCreatorConsole.message({
				message: 'Error:',
				error: `The component '${firstID}' does not exist`,
			});
			return;
		}
		if (!secondComponent) {
			elementCreatorConsole.message({
				message: 'Error:',
				error: `The component '${secondID}' does not exist`,
			});
			return;
		}

		this.replaceComponent(firstID, secondComponent);
		this.replaceComponent(secondID, firstComponent);

		return this;
	}

	appendComponent(element, ID) {
		const component = this.getComponent(ID);
		if (!component) {
			elementCreatorConsole.message({
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
			elementCreatorConsole.message({
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
		return Object.keys(this.#components).length;
	}

	get componentIDs() {
		return Object.keys(this.#components);
	}

	set layout(callback) {
		this.#layout = callback;
	}

	get layout() {
		return this.#layout;
	}
}

function buildText(text) {
	const textData = document.createTextNode(text);
	const trackingComment = document.createComment('');
	const textFragment = document.createDocumentFragment();
	appendChildren(textFragment, [textData, trackingComment]);
	return textFragment;
}

function buildComponent(elementData) {
	if (Array.isArray(elementData)) {
		const elementArr = elementData
			.flat(Infinity)
			.filter(
				(element) =>
					checkForKeys(element) ||
					element.nodeType ||
					typeof element === 'string' ||
					typeof element === 'number',
			)
			.map((element) => {
				return buildComponent(element);
			});

		return elementArr;
	}

	if (elementData?.nodeType) return elementData;

	if (typeof elementData === 'string' || typeof elementData === 'number')
		return buildText(elementData);

	let element;

	if (!elementData.tag) {
		elementCreatorConsole.message({
			message: 'Component error:',
			error: 'Cannot create HTML Node without a tag',
		});
		return;
	}

	switch (elementData.tag) {
		case 'text': {
			return buildText(elementData.text ?? '');
		}
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

	if (elementData.innerHTML) {
		element.innerHTML = elementData.innerHTML;
	}

	if (elementData.classes) {
		element.classList.add(...className(elementData.classes));
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
				elementCreatorConsole.message({
					message: 'Support warning:',
					warn: `Event '${eventType}' is not supported in current Document`,
				});
				return;
			}

			const events = Array.isArray(event) ? event : [event];

			events.forEach((eventData) => {
				if (!eventData || !eventData.callback) return;
				(eventData.target ?? element).addEventListener(
					eventType,
					functionType(eventData, element),
					eventData.options,
				);
			});
		});
	}

	if (elementData.onAppend && elementData.onAppend.callback) {
		//do this
		//make it support and array of append requests with different options

		elementAppended(
			element,
			elementData.onAppend.callback,
			elementData.onAppend?.options,
		);
	}

	if (elementData.onOrientationChange) {
		//do this
	}

	if (elementData.onInView && elementData.onInView.callback) {
		createIntersect(
			element,
			elementData.onInView.callback,
			elementData.onInView?.options,
		); //do this
	}

	//element.dispatchEvent(create);

	if (elementData.onCreate) {
		if (typeof elementData.onCreate !== 'function') {
			elementCreatorConsole.message({
				message: 'Event error:',
				error: `The onCreate event value '${elementData.onCreate}' is not a function`,
			});
		} else {
			elementData.onCreate(element);
		}
	}

	return element;
}

class Anchor extends HTMLElement {
	#self;

	constructor() {
		const self = super();

		this.#self = self;
	}

	connectedCallback() {
		this.#self.setAttribute('hidden', '');
	}

	disconnectedCallback() {}
}

function loadElement(element) {
	return new Promise((resolve) => {
		if (element.complete) resolve();
		element.addEventListener('load', resolve, true);
		element.addEventListener(
			'error',
			() => {
				elementCreatorConsole.message({
					message: 'Element load error:',
					error: `The ${element.tagName} failed to load`,
				});
				resolve();
			},
			true,
		);
	});
}

function loadVideo(element) {
	return new Promise((resolve) => {
		if (element.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) resolve();
		element.addEventListener('loadeddata', resolve, true);
		element.addEventListener(
			'error',
			() => {
				elementCreatorConsole.message({
					message: 'Element load error:',
					error: `The ${element.tagName} with data ${element.src} failed to load`,
				});
				resolve();
			},
			true,
		);
	});
}

function awaitContentLoad(element) {
	const loadableElements = [];

	const elements = Array.isArray(element) ? element : [element];

	const elementType = (element) => {
		switch (element.tagName) {
			case 'IMG':
			case 'SVG':
				if (element.src && element.getAttribute('type') !== 'lazy')
					loadableElements.push(loadElement(element));
				return true;
			case 'INPUT':
				if (
					element.hasAttribute('type') &&
					element.getAttribute('type') === 'image'
				)
					loadableElements.push(loadElement(element));
				return true;
			case 'IFRAME':
			case 'FRAME':
			case 'SCRIPT':
			case 'LINK':
			case 'STYLE':
			case 'BODY':
				loadableElements.push(loadElement(element));
				return false;
			case 'VIDEO':
				loadableElements.push(loadVideo(element));
				return false;
			default:
				return false;
		}
	};

	const crawlChildren = (element) => {
		if (element.children.length === 0 && elementType(element)) return;

		Array.from(element.children).forEach((child) => {
			if (elementType(child)) return;

			crawlChildren(child);
		});
	};

	elements.forEach((element) => {
		crawlChildren(element);
	});

	if (loadableElements.length === 0) return Promise.resolve(0);

	return Promise.all(loadableElements);
}

function useSuspense(fn, loading, fallback) {
	let suspenseFired = false;

	return useState((content, setContent) => {
		if (!suspenseFired) {
			suspenseFired = true;
			const element = buildComponent(fn());

			awaitContentLoad(element).then(
				() => {
					setContent(element);
				},
				() => {
					fallback
						? setContent(buildComponent(fallback()))
						: setContent(element);
				},
			);
		}
		return content;
	}, loading);
}

function useId() {
	if (!window.elementCreatorIdSessionStorage)
		window.elementCreatorIdSessionStorage = 0;

	return ':' + (window.elementCreatorIdSessionStorage++).toString(16) + '&e:';
}

function usePath() {
	return new URL(window.location.href);
}

function createContext(name, init) {
	window.elementCreatorContext;

	localStorage.setItem();

	return ({ value, children, ...props }) => {
		return {
			contextProvider: value ?? init,
			tag: 'context-wrapper',
			children,
			...props,
		};
	};
}

function useContext({ children, id }) {}

function useRef(init) {}

function useState(fn, initVal) {
	const checkState = (val) => {
		if (val) return val;
		return { tag: 'ec-anchor' };
	};

	const stateManager = {
		element: null,
		container: document.createDocumentFragment(),
		state: initVal,

		setter: async (value) => {
			let skipFlag = false;
			switch (typeof value) {
				case 'object':
					skipFlag =
						JSON.stringify(stateManager.state) ===
						JSON.stringify(value);
					break;
				default:
					skipFlag = stateManager.state === value;
					break;
			}

			if (skipFlag) return;

			stateManager.state = value;

			const newElement = buildComponent(
				checkState(fn(stateManager.getter, stateManager.setter)),
			);

			if (!stateManager.element) await stateManager.check();

			stateManager.element.replaceWith(newElement);

			stateManager.element = newElement;
		},

		get getter() {
			return stateManager.state;
		},

		check() {
			return new Promise((res) => {
				const interval = setInterval(() => {
					if (stateManager.element) {
						clearInterval(interval);
						res();
					}
				}, 1);
			});
		},
	};

	stateManager.element = buildComponent(
		checkState(fn(stateManager.getter, stateManager.setter)),
	);

	stateManager.container.appendChild(stateManager.element);

	return stateManager.container;
}

function isObject(item) {
	return item && typeof item === 'object' && !Array.isArray(item);
}

function merge(target, ...sources) {
	if (!sources.length) return target;
	const source = sources.shift();
	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				merge(target[key], source[key]);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		}
	}
	return merge(target, ...sources);
}

function checkEvent(eventName) {
	if (typeof eventName !== 'string' || eventName.length === 0) return false;
	const tagNames = {
		select: 'input',
		change: 'input',
		submit: 'form',
		reset: 'form',
		error: 'img',
		load: 'img',
		abort: 'img',
	};
	let element = document.createElement(tagNames[eventName] || 'div');
	eventName = 'on' + eventName;
	let isSupported = eventName in element;
	if (!isSupported) {
		element.setAttribute(eventName, 'return;');
		isSupported = typeof element[eventName] === 'function';
	}
	element = null;
	return isSupported;
}

function render(root, fn, settings) {
	if (window.components) {
		elementCreatorConsole.message({
			message: 'Hydration error:',
			error: 'Only one render call can be made per page',
		});
		return;
	}

	elementCreatorConsole.message({
		message: 'Hydrating page',
	});

	if (settings?.useIcons) new IconSystem();

	if (settings?.htmlElements)
		Object.entries(settings.htmlElements).forEach(
			([name, elementClass]) => {
				customElements.define(name, elementClass);
			},
		);

	customElements.define('ec-anchor', Anchor);

	if (settings?.customEvents) {
		//do this
	}

	window.components = new ComponentManager();
	const rootType = typeof root;
	let rootElement;

	if (rootType !== 'string' && rootType !== 'object') {
		elementCreatorConsole.message({
			message: 'Hydration error:',
			error: `The root element '${root}' is not an ID or a HTMLElement`,
		});
		return;
	}

	if (rootType === 'string') {
		rootElement = document.getElementById(root);
		if (!rootElement) {
			elementCreatorConsole.message({
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
			elementCreatorConsole.message({
				message: 'Hydration error:',
				error: `The root element '${rootElement}' does not exist in the document`,
			});
			return;
		}
	}

	const hydrate = async () => {
		try {
			await settings?.hooks?.before?.();

			const time = performance.now();

			const renderComponent = await fn();
			const layout = window.components.layout;
			const componentName = 'content';

			const content = window.components
				.setComponent(componentName, renderComponent)
				.getComponent(componentName);

			if (layout) {
				window.components.setComponent(
					'layout',
					layout({
						children: content.fragment ?? content.element,
					}),
				);
			}

			window.components.appendComponent(
				rootElement,
				layout ? 'layout' : componentName,
			);

			const finalTime = Math.round(performance.now() - time);
			const printTime = returnIf(finalTime > 0, finalTime, '< 1');

			elementCreatorConsole.message({
				message: `Hydration complete in ${printTime}ms`,
			});
		} catch (error) {
			elementCreatorConsole.message({
				message: 'Hydration failed:',
			});
			console.error(error);
		}

		settings?.hooks?.after?.();
	};

	if (settings?.awaitPageLoad && document.readyState !== 'complete') {
		window.addEventListener('load', hydrate);
		elementCreatorConsole.message({
			message: "Awaiting document state 'complete'",
		});
		return;
	}

	if (document.readyState === 'loading') {
		window.addEventListener('DOMContentLoaded', hydrate);
		return;
	}

	hydrate();
}

function createIntersect(element, callback, options) {
	const intersectFunction = (entries, observer) => {
		const entry = entries[0];

		if (entry.isIntersecting) {
			if (options?.clearOnceInView) observer.unobserve(element);
			callback?.visible(element, entry);
		} else {
			callback?.hidden(element, entry);
		}
	};

	const intersectSettings = {
		root: options?.root ?? document,
		rootMargin: '0px',
		scrollMargin: '0px',
		threshold: options?.threshold ?? [0, 0.25, 0.5, 0.75, 1],
	};

	const observer = new IntersectionObserver(
		intersectFunction,
		intersectSettings,
	);

	if (options?.awaitContentLoad) {
		if (document.readyState === 'complete') {
			observer.observe(element);
		} else {
			window.addEventListener('load', () => {
				observer.observe(element);
			});
		}
	} else {
		observer.observe(element);
	}
}

function useDeprecatedMethodToAppend(element, callback) {
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

//do this
//refresh page on back button

function elementAppended(element, callback, options) {
	if (isAppended(element)) {
		callback(element);
		return;
	}

	if (!MutationObserver)
		return useDeprecatedMethodToAppend(element, callback);

	const observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.addedNodes.length === 0) continue;
			if (
				!Array.from(mutation.addedNodes).some((node) =>
					node.contains(element),
				)
			)
				continue;

			if (!options?.perminant) observer.disconnect();

			if (!options?.awaitPageLoad && !options?.awaitFontLoad) {
				callback(element);
				break;
			}

			if (options?.awaitFontLoad) {
				const awaitFont = async () => {
					await document.fonts.ready;
					callback(element);
				};

				awaitFont();
				break;
			}

			if (document.readyState === 'complete') {
				callback(element);
			} else {
				window.addEventListener('load', () => {
					callback(element);
				});
			}

			break;
		}
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
}

function functionType({ param, callback, target }, element) {
	if (!checkExists(param)) return callback;

	if (Array.isArray(param)) {
		return (event) =>
			callback(
				...param.map((value) =>
					checkValue(value, target, element, event),
				),
			);
	}
	return (event) => callback(checkValue(param, target, element, event));
}

function checkValue(value, target, element, event) {
	switch (value) {
		case 'self':
			return element;
		case 'parent':
			return element.parentNode;
		case 'target':
			if (target) return target;

			elementCreatorConsole.message({
				message: 'Type Error:',
				error: `the target value in '${element}' has not been set`,
			});
			break;
		case 'event':
			return event;
		//case 'remover': //do this
		//	return (target ?? element).removeEventListener(callback);
		default:
			return value;
	}
}

function checkExists(data) {
	return undefined !== data && data !== null;
}

function setFallback(data, fallback) {
	return returnIf(checkExists(data), data, fallback);
}

function returnIf(bool, value, fallback) {
	if (bool) return value;
	return fallback;
}

function appendChildren(element, children) {
	if (!children) return;

	const childArr = Array.isArray(children) ? children : [children];

	childArr.forEach((child) => {
		element.appendChild(child);
	});
}

function insertChildrenBefore(element, children, beforeElement) {
	if (!children) return;

	const childArr = Array.isArray(children) ? children : [children];

	childArr.forEach((child) => {
		element.insertBefore(child, beforeElement);
	});
}

function className(classes, ...extraClasses) {
	if (![...extraClasses][0] && [...extraClasses].length === 1) return classes;

	classes = Array.isArray(classes)
		? [...classes, ...extraClasses]
		: [classes, ...extraClasses];

	const tempArr = [];

	classes
		.flat(Infinity)
		.filter(Boolean)
		.forEach((classData) => {
			if (classData === '') return;
			tempArr.push(...classData.split(' '));
		});

	return Array.from(new Set(tempArr));
}

function checkForKeys(component) {
	return (
		Object.keys(component).length !== 0 && component.constructor === Object
	);
}

export {
	buildComponent,
	checkExists,
	setFallback,
	returnIf,
	appendChildren,
	insertChildrenBefore,
	className,
	elementAppended,
	ComponentManager,
	checkEvent,
	render,
	useState,
	useSuspense,
	useId,
	usePath,
	merge,
};
