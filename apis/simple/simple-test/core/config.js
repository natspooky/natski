export default class Config {
	#changeTitle = false;

	constructor() {}

	set changeTitle(changeTitle) {
		this.#changeTitle = changeTitle;
	}

	get changeTitle() {
		return this.#changeTitle;
	}
}
