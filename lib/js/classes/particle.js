export default class Particle {
	#canvasSize;
	#size;
	#position;
	#velocity;
	#acceleration;
	constructor(canvasSize) {
		this.#canvasSize = canvasSize;
		this.regenerateData();
	}

	step(time) {
		//console.log(this.#position);
		this.#position.x +=
			this.#velocity.x * time + 0.5 * this.#acceleration.x * time ** 2;
		this.#position.y +=
			this.#velocity.y * time + 0.5 * this.#acceleration.y * time ** 2;
	}

	get position() {
		return this.#position;
	}

	get size() {
		return this.#size;
	}

	resize(canvasSize) {
		this.#canvasSize = canvasSize;
	}

	regenerateData() {
		this.#size = Math.floor(Math.random() * 40 + 20);
		this.#position = {
			x: Math.floor(Math.random() * this.#canvasSize.x),
			y: Math.floor(Math.random() * this.#canvasSize.y),
		};
		this.#velocity = {
			x: Math.random() * 2 - 1,
			y: Math.random() * 2 - 1,
		};
		this.#acceleration = {
			x: Math.random() * 2 - 1,
			y: Math.random() * 2 - 1,
		};
	}
}
