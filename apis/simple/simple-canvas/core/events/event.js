export default class Event {
	#eventRemovers;
	#eventListeners;

	constructor(canvas) {
		this.#eventRemovers = {};
		this.#eventListeners = [];
	}

	#addEvent(data) {
		data.hostElement.addEventListener(
			data.eventName,
			data.eventFunction.bind(this),
			data.eventOptions,
		);
		this.listeners.events.push(data);
	}

	#clearEvents() {
		this.listeners.events.forEach((data) => {
			data.hostElement.removeEventListener(
				data.eventName,
				data.eventFunction.bind(this),
			);
		});
	}

	remove() {
		this.#eventRemovers.forEach((eventRemover) => {
			eventRemover();
		});
	}
}
