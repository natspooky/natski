/* -----------------------------------------------
/* Author : NATSKI - natski.dev
/* MIT license : https://opensource.org/license/MIT
/* GitHub : https://github.com/natspooky/encore
/* How to use? : Check the GitHub README or visit https://natski.dev/apis/encore/element-creator
/* ----------------------------------------------- */

import IconSystem from './icon-system.js';
import Console from '../dependencies/console.js';

const elementCreatorConsole = new Console('Element Creator', '#5967ffff');

function buildComponent(obj) {
	if (undefined === obj || null === obj) return;

	if (obj && Array.isArray(obj)) {
		const components = obj
			.flat(Infinity)
			.map(buildComponent)
			.filter(Boolean);

		return components;
	}

	if (obj.nodeType && obj.nodeType === Node.ELEMENT_NODE) return obj;

	const textTypes = ['number', 'bigint', 'string', 'boolean'];
	const componentType = typeof obj;

	let component;

	if (![...textTypes, 'object'].includes(componentType)) {
		elementCreatorConsole.message({
			message: 'Component build error:',
			error: `${componentType} is not a valid component data type. (e.g. ${['object', ...textTypes].join(' ')})`,
		});

		return document.createElement('ec-error');
	}

	if (textTypes.includes(componentType)) {
		const textComponent = document.createElement('ec-text');

		appendChildren(textComponent, [
			document.createTextNode(obj),
			document.createComment(
				`DataType='${textTypes[textTypes.indexOf(componentType)]}'`,
			),
		]);
		return textComponent;
	}

	if (!obj.tag) {
		elementCreatorConsole.message({
			message: 'Component build error:',
			error: 'Components must have a "tag" parameter.',
		});
		return document.createElement('ec-error');
	}

	if (obj.namespace) {
		component = document.createElementNS(obj.namespace, obj.tag);
	} else {
		component = document.createElement(obj.tag);
	}

	if (obj.ref && typeof obj.ref === 'object') {
		obj.ref.current = component;
	}

	obj.classes =
		obj.style || obj.classes
			? [obj.classes, obj.style ? useId() : null]
			: null;

	if (obj.classes) component.classList.add(...className(obj.classes));

	if (obj.attributes) {
		Object.entries(obj.attributes).forEach(([attribute, value]) => {
			if (checkExists(value)) component.setAttribute(attribute, value);
		});
	}

	if (obj.innerHTML) component.innerHTML = obj.innerHTML;

	if (obj.style)
		obj.children = [
			{
				tag: 'style',
				innerHTML: styleSheet(
					obj.style,
					obj.classes[obj.classes.length - 1],
				),
			},
			obj.children,
		];

	if (obj.children) appendChildren(component, buildComponent(obj.children));

	if (obj.events) {
		Object.entries(obj.events)
			.filter(([, event]) => event)
			.forEach(([eventType, event]) => {
				if (!checkEvent(eventType)) {
					elementCreatorConsole.message({
						message: 'Support warning:',
						warn: `Event '${eventType}' is not supported in current Document. EventListener Rejected.`,
					});
					return;
				}

				(Array.isArray(event) ? event : [event]).forEach(
					(eventData) => {
						if (!eventData || !eventData.callback) return;
						(eventData?.target
							? (eventData.target?.current ?? eventData.target)
							: component
						).addEventListener(
							eventType,
							functionType(
								{ eventType, ...eventData },
								component,
							),
							eventData.options,
						);
					},
				);
			});
	}

	if (obj.onAppend && obj.onAppend.callback)
		elementAppended(
			component,
			obj.onAppend.callback,
			obj.onAppend?.options,
		);

	if (obj.onCreate) obj.onCreate(component);

	return component;
}

function embedSheet(className, [key, data]) {
	if (!data) return '';
	return `.${className}${key.replaceAll(
		'className',
		className,
	)}{${Object.entries(data)
		.map((obj) => {
			return dataSheet(className, obj);
		})
		.join('')}}`;
}

function embedSheetAlt(className, [key, data]) {
	if (!data) return '';
	return `${key.replaceAll('className', className)}{${Object.entries(data)
		.map((obj) => {
			return dataSheet(className, obj);
		})
		.join('')}}`;
}

function dataSheet(className, [key, data]) {
	if (!data) return '';
	return `${key
		.split(/(?=[A-Z])/)
		.join('-')
		.toLowerCase()}:${data};`.replaceAll('className', className);
}

function styleSheet(obj, className) {
	let normalSheetArr = [];
	let embedSheetArr = [];

	Object.entries(obj).forEach(([key, data]) => {
		if (!data) return;
		if (isObject(data)) {
			if (key.match(/(:)/)) {
				embedSheetArr.push(embedSheet(className, [key, data]));
				return;
			}
			if (key.match(/(@|\.)/)) {
				embedSheetArr.push(embedSheetAlt(className, [key, data]));
				return;
			}
		}

		normalSheetArr.push(dataSheet(className, [key, data]));
	});

	return `.${className}{${normalSheetArr.join('')}}${embedSheetArr.join('')}`;
}

class ECAnchor extends HTMLElement {
	#self;

	constructor() {
		const self = super();

		this.#self = self;
	}

	connectedCallback() {
		this.#self = this;
		this.#self.setAttribute('hidden', '');
	}

	disconnectedCallback() {
		this.#self = null;
	}
}

class ECWrapper extends HTMLElement {
	#self;

	constructor() {
		const self = super();

		this.#self = self;
	}

	connectedCallback() {
		this.#self = this;
		this.#self.style.display = 'contents';
	}

	disconnectedCallback() {
		this.#self = null;
	}
}

class ECError extends HTMLElement {
	#self;

	constructor() {
		const self = super();

		this.#self = self;
	}

	connectedCallback() {
		this.#self = this;
		this.#self.style.display = 'block';
		this.#self.style.backgroundColor = '#ff000070';
		this.#self.style.border = '2px solid #000000';
		this.#self.style.fontWeight = 'bold';
		this.#self.style.padding = '5px 10px';
		this.#self.style.borderRadius = '10px';
		this.#self.style.width = 'fit-content';
		this.#self.style.height = 'fit-content';
		this.#self.innerHTML = 'Error';
	}

	disconnectedCallback() {
		this.#self = null;
	}
}

class ECState extends ECWrapper {
	constructor() {
		super();
	}
}

class ECText extends ECWrapper {
	constructor() {
		super();
	}
}

class ECFragment extends ECWrapper {
	constructor() {
		super();
	}
}

function loadElement(element) {
	return new Promise((resolve, reject) => {
		function load() {
			element.removeEventListener('error', error);
			resolve();
		}

		function error() {
			element.removeEventListener('load', load);
			elementCreatorConsole.message({
				message: 'Element load error:',
				error: `The ${element.tagName} with data ${element.src ?? element.href} failed to load`,
			});
			reject();
		}

		if (element.complete) resolve();

		element.addEventListener('load', load, { once: true });
		element.addEventListener('error', error, { once: true });
	});
}

function loadVideoAudio(element) {
	return new Promise((resolve, reject) => {
		function load() {
			element.removeEventListener('error', error);
			resolve();
		}

		function error() {
			element.removeEventListener('loadeddata', load);
			elementCreatorConsole.message({
				message: 'Element load error:',
				error: `The ${element.tagName} with data ${element.src} failed to load`,
			});
			reject();
		}

		if (element.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) resolve();
		element.addEventListener('loadeddata', load, { once: true });
		element.addEventListener('error', error, { once: true });
	});
}

function awaitContentLoad(element) {
	const loadableElements = [];

	const elements = Array.isArray(element) ? element : [element];

	const elementType = (element) => {
		switch (element.tagName) {
			case 'SCRIPT':
			case 'IMG':
			case 'SVG':
				if (element.src && element.getAttribute('loading') !== 'lazy')
					loadableElements.push(loadElement(element));
				return true;
			case 'LINK':
				if (element.href && element.getAttribute('loading') !== 'lazy')
					loadableElements.push(loadElement(element));
				return true;
			case 'VIDEO':
			case 'AUDIO':
				if (element.src && element.getAttribute('loading') !== 'lazy')
					loadableElements.push(loadVideoAudio(element));
				return false;
			default:
				return false;
		}
	};

	const crawlChildren = (element) => {
		if (elementType(element) || element.children.length === 0) return;
		Array.from(element.children).forEach((child) => {
			if (elementType(child)) return;
			crawlChildren(child);
		});
	};

	elements.forEach(crawlChildren);

	if (loadableElements.length === 0) return Promise.resolve(0);

	return Promise.all(loadableElements);
}

function useSuspense(fn, loading, fallback) {
	const isFn = (item) => {
		return typeof item === 'function' ? item() : item;
	};

	const [suspense, , setState] = useState((content) => {
		return content;
	}, isFn(loading));

	const element = buildComponent(fn());

	awaitContentLoad(element).then(
		() => setState(element),
		() =>
			fallback
				? setState(buildComponent(isFn(fallback)))
				: setState(element),
	);

	return suspense;
}

function useId() {
	if (window.elementCreator) {
		if (!window.elementCreator.useIdSession)
			window.elementCreator.useIdSession = 0;
		return `e${(window.elementCreator.useIdSession++).toString(16)}c`;
	}

	if (!window.ecIdStorage) window.ecIdStorage = 0;
	return `e${(window.ecIdStorage++).toString(16)}c`;
}

function useRef(initVal) {
	const ref = {
		currentRef: initVal,
		previousRef: null,

		set current(value) {
			this.previousRef = this.currentRef;
			this.currentRef = value;
		},
		get current() {
			return this.currentRef;
		},
		get previous() {
			return this.previousRef;
		},
	};

	return ref;
}

function useNavigate(root) {
	if (!window.elementCreator.navigator) {
		window.addEventListener('popstate', async (event) => {
			if (!event.state) return;

			const { visited, to } = event.state;

			if (visited) await navigate({ to, visited: true });
		});
	}

	let renderable = !!window.elementCreator;
	if (renderable && !window.elementCreator.navigator) {
		window.elementCreator.navigator = {};
	}

	const storage = window.elementCreator
		? window.elementCreator.navigator
		: {};

	const detectIfMultiState = ({ meta, layout }) => {
		return true;
		return window.elementCreator?.layoutData &&
			window.elementCreator.layoutData.name == layout.name
			? true
			: false;
	};

	function formatURL(url) {
		return `${root ?? ''}${url.replace(/.htm(l|)/g, '')}.js`;
	}

	const preload = async ({ to }) => {
		if (!to || !renderable) return;

		const url = new URL(
			to.startsWith(window.location.origin)
				? to
				: window.location.origin + to,
		);

		to = url.pathname;

		if (storage[to]) return;

		const dataImport = await import(formatURL(to));

		const { default: page, Meta: meta, Layout: layout } = dataImport;

		const pageComponent = page?.();

		const pageElement = buildComponent(pageComponent);

		storage[to] = {
			data: {
				page: pageElement,
				meta,
				layout,
			},
			multiState: detectIfMultiState({ meta, layout }),
		};
	};

	const navigate = async ({ to, target = '_self', visited }) => {
		if (!to) return;

		if (!renderable || target !== '_self') {
			window.open(to, target);
			return;
		}

		const url = new URL(
			to.startsWith(window.location.origin)
				? to
				: window.location.origin + to,
		);

		to = url.pathname;

		if (!storage[to]) await preload({ to });

		const currentStorage = storage[to];

		window.elementCreator.setPageState(currentStorage.data.page);

		if (!visited) {
			window.history.pushState(
				{ visited: true, to: to + url.hash },
				'',
				to + url.hash,
			);

			const el = document.getElementById(url.hash.slice(1));
			if (!el) {
				window.scrollTo(0, 0);
			} else {
				el.scrollIntoView();
			}

			const pageTitle =
				currentStorage.data?.meta?.title ??
				window.location.pathname
					.split('/')
					[window.location.pathname.split('/').length - 1].replace(
						/.htm(l|)|\//g,
						'',
					)
					.split('-')
					.map((word) => {
						return word.slice(0, 1).toUpperCase() + word.slice(1);
					})
					.join(' ');

			document.title = pageTitle;
		}
	};

	return {
		navigate,
		preload,
		storage,
	};
}

function checkState(val) {
	if (!val)
		return {
			tag: 'ec-anchor',
		};
	if (Array.isArray(val)) {
		if (val.length < 1)
			return {
				tag: 'ec-anchor',
			};
		if (val.length === 1) return val[0];
		return {
			tag: 'ec-fragment',
			children: val,
		};
	}
	return val;
}

function useState(fn, initVal) {
	const stateManager = {
		element: null,
		container: buildComponent({ tag: 'ec-state-fragment' }),
		state: initVal,

		setter: async (value) => {
			switch (typeof value) {
				case 'object':
					if (
						JSON.stringify(stateManager.state) ===
						JSON.stringify(value)
					)
						return;
					break;
				default:
					if (stateManager.state === value) return;
					break;
			}

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

		getterFn() {
			return stateManager.getter;
		},

		check() {
			return new Promise((res) => {
				const interval = setInterval(() => {
					if (stateManager.element) {
						clearInterval(interval);
						res();
					}
				}, 0.5);
			});
		},
	};

	stateManager.element = buildComponent(
		checkState(fn(stateManager.getter, stateManager.setter)),
	);

	stateManager.container.appendChild(stateManager.element);

	return [stateManager.container, stateManager.getterFn, stateManager.setter];
}

function usePageState(Fn) {
	const [pageState, , setPageState] = useState(Fn, {
		url: window.location,
		title: document.title,
	});

	navigation.addEventListener('navigate', (event) => {
		setPageState({
			url: new URL(event.destination.url),
			title: document.title,
		});
	});

	return pageState;
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
				if (Array.isArray(target[key]) || Array.isArray(source[key])) {
					Object.assign(target, {
						[key]: [
							...(Array.isArray((target[key] ??= []))
								? target[key]
								: [target[key]]),

							...(Array.isArray((source[key] ??= []))
								? source[key]
								: [source[key]]),
						],
					});
				} else {
					Object.assign(target, {
						[key]: source[key],
					});
				}
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

function render(root, pageFn, settings) {
	if (window.elementCreator) {
		elementCreatorConsole.message({
			message: 'Hydration error:',
			error: 'Only one render call can be made per page',
		});
		return;
	}

	customElements.define('ec-anchor', ECAnchor);
	customElements.define('ec-text', ECText);
	customElements.define('ec-fragment', ECFragment);
	customElements.define('ec-state-fragment', ECState);
	customElements.define('ec-error', ECError);

	window.elementCreator = {};

	if (settings?.useIcons) new IconSystem();

	if (settings?.navigate) {
	} //make this work :DDDDD

	elementCreatorConsole.message({
		message: 'Starting page hydration',
	});

	if (settings?.htmlElements)
		Object.entries(settings.htmlElements).forEach(
			([name, elementClass]) => {
				customElements.define(name, elementClass);
			},
		);

	const hydrate = async () => {
		try {
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

			const renderTimer = performance.now();

			const encoreSettings = { layout: {} };

			const pageBody = await pageFn(encoreSettings);
			const layout = encoreSettings.layout;

			const [pageRootState, getPageState, setPageState] = useState(
				(content) => {
					return content;
				},
				pageBody,
			);

			window.elementCreator.getPageState = getPageState;
			window.elementCreator.setPageState = setPageState;
			window.elementCreator.layoutData = layout;

			const renderBody =
				layout?.body && typeof layout.body === 'function'
					? buildComponent(layout.body({ children: pageRootState }))
					: pageRootState;

			appendChildren(rootElement, renderBody);

			const renderTime = Math.round(performance.now() - renderTimer);

			elementCreatorConsole.message({
				message: `Hydration complete in ${returnIf(renderTime > 0, renderTime, '< 1')}ms`,
			});
		} catch (error) {
			elementCreatorConsole.message({
				message: 'Hydration failed:',
			});
			console.error(error);
		}
	};

	if (settings?.awaitPageLoad && document.readyState !== 'complete') {
		window.addEventListener('load', hydrate, { once: true });
		elementCreatorConsole.message({
			message: "Awaiting document state 'complete'",
		});
		return;
	}

	if (document.readyState === 'loading' || !document.body) {
		window.addEventListener('DOMContentLoaded', hydrate, { once: true });
		elementCreatorConsole.message({
			message: 'Awaiting document body',
		});
		return;
	}

	hydrate();
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
				window.addEventListener(
					'load',
					() => {
						callback(element);
					},
					{ once: true },
				);
			}

			break;
		}
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
}

function functionType({ param, callback, target, eventType }, element) {
	if (!checkExists(param)) return callback;

	function eventListener(event) {
		callback(
			...(Array.isArray(param) ? param : [param]).map((value) =>
				checkValue(
					value,
					target?.current ?? target,
					element,
					event,
					eventListener,
					eventType,
				),
			),
		);
	}

	return eventListener;
}

function checkValue(value, target, element, event, callback, eventType) {
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
		case 'remover':
			return () =>
				(target ?? element).removeEventListener(eventType, callback);
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

	(Array.isArray(children) ? children : [children])
		.filter(Boolean)
		.forEach((child) => {
			element.appendChild(child);
		});
}

function insertChildrenBefore(element, children, beforeElement) {
	if (!children || !beforeElement.parentNode.isEqualNode(element)) return;
	if (!beforeElement) {
		appendChildren(element, children);
		return;
	}

	(Array.isArray(children) ? children : [children])
		.filter(Boolean)
		.forEach((child) => {
			element.insertBefore(child, beforeElement);
		});
}

function insertChildrenAfter(element, children, afterElement) {
	if (!children || !afterElement.parentNode.isEqualNode(element)) return;
	if (!afterElement || element.lastChild.isEqualNode(afterElement)) {
		appendChildren(element, children);
		return;
	}

	let beforeElIndex = Array.from(element.children).indexOf(afterElement) + 1;

	(Array.isArray(children) ? children : [children])
		.filter(Boolean)
		.forEach((child, index) => {
			insertChildrenBefore(
				element,
				child,
				element.children[beforeElIndex + index],
			);
		});
}

function createPortal(element, root) {
	if (!root) root = document.body;
	appendChildren(root, buildComponent(element));
}

function className(classes, ...extraClasses) {
	if (![...extraClasses][0] && [...extraClasses].length === 1) return classes;

	const tempArr = [];

	(Array.isArray(classes)
		? [...classes, ...extraClasses]
		: [classes, ...extraClasses]
	)
		.flat(Infinity)
		.filter(Boolean)
		.forEach((classData) => {
			if (classData === '') return;
			tempArr.push(...classData.split(' '));
		});

	return Array.from(new Set(tempArr));
}

export {
	buildComponent,
	checkExists,
	setFallback,
	returnIf,
	appendChildren,
	insertChildrenBefore,
	insertChildrenAfter,
	className,
	elementAppended,
	checkEvent,
	render,
	useState,
	usePageState,
	useSuspense,
	useId,
	useRef,
	useNavigate,
	merge,
	createPortal,
};
