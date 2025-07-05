import Event from './event.js';
export default class Mouse extends Event {
	#mouseData;
	constructor() {
		super();
		this.#mouseData = {};
	}
}
