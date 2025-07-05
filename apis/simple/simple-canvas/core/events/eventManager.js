import Mouse from './mouse.js';

export default class EventManager {
	#canvasElement;
	#events;
	#event;
	constructor(canvas) {
		this.#canvasElement = canvas;
		this.#events = {};
	}

	add(eventName, callback) {
		//dont use lmao
		const event = eventIdenitfy(eventName);

		if (!event)
			throw new Error('Requested event does not exist or isnt supported');

		const eventClass = this.#events[event];

		if (!eventClass) throw new Error(`Event ${eventName}`);

		console.log(eventName, 'event');
		//eventClass.add(eventName, callback);
	}

	remove(eventName) {}

	// idk if thisll work in tandem with the event classes

	eventIdenitfy(eventName) {
		switch (eventName) {
			case 'mousemove':
			case 'onmousemove':
			case 'onmousemove':
				break;

			default:
				return undefined;
		}
	}
}
