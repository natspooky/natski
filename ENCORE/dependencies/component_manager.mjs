import * as SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';

export function component(data) {
	// {data, componentFunct}
	return SEC.jsonElementify(data.element(data.data));
}

export function setComponentFromValue(data) {
	setComponent();
}

export function setComponent(data) {
	// {component, data: [{}]}

	if (
		!(
			SEC.checkExists(data.component) &&
			typeof data.component === 'function'
		)
	) {
		return;
	}

	let elements = document.querySelectorAll(data.component.name);

	if (Array.isArray(elements)) {
		for (let i = 0; i < elements.length; i++) {
			if (Array.isArray(data.data)) {
				elements[i].replaceWith(component(data.data[i]));
			} else {
				elements[i].replaceWith(component(data.data));
			}
		}
	} else {
		if (Array.isArray(data.data)) {
			elements.replaceWith(component(data));
		} else {
			elements.replaceWith(component(data[0]));
		}
	}
}
