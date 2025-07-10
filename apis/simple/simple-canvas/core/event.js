export default class Event {
	#listenerData;

	#config;

	constructor(config) {
		this.#listenerData = {};

		this.#config = config;

		//prepare events

		if (this.#config.mouseSupport && this.#config.mouseEvents) {
		}

		if (this.#config.touchSupport && this.#config.touchEvents) {
		}

		if (this.#config.keySupport && this.#config.keyEvents) {
		}

		if (this.#config.hoverSupport && this.#config.hoverEvents) {
		}

		if (this.#config.wheelSupport && this.#config.wheelEvents) {
		}

		if (this.#config.resizeEvents) {
		}
	}

	#addEvent({ eventName, targetElement, callback, options, system }) {
		targetElement.addEventListener(eventName, callback.bind(this), options);

		this.#listenerData.push({
			eventRemover: () => {
				targetElement.removeEventListener(
					eventName,
					callback.bind(this),
				);
			},
			eventData: {
				eventName,
				targetElement,
				callback,
				options,
				system,
			},
			suspended: false,
		});
	}

	detectEvent(eventName) {
		switch (eventName) {
			case 'mousemove':
		}
	}

	suspendEvent() {}

	continueEvent() {}

	clearEvent() {}

	#clearEvents() {
		this.#listenerData.forEach((eventData) => eventData.removeListener());
	}

	#mousemove() {}
}
