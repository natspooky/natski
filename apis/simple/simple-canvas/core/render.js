export default class Render {
	#drawFunctions;
	#config;
	#layers;

	constructor(config) {
		this.#config = config;
		this.#drawFunctions = {};
	}

	draw(callback) {}

	async #frameRate() {
		let then = performance.now(),
			delta = 0,
			now = 0;

		while (this.#settings.drawState.drawing) {
			now = await new Promise(requestAnimationFrame);

			if (
				this.#settings.drawState.paused.user ||
				this.#settings.drawState.paused.intersection ||
				this.#settings.drawState.paused.focus ||
				now - then < this.#settings.fps.interval - delta
			)
				continue;

			this.#timers.rendering.render = (now - then) / 1000;
			this.#timers.rendering.runTime += this.#timers.rendering.render;

			delta = Math.min(
				this.#settings.fps.interval,
				delta + now - then - this.#settings.fps.interval,
			);
			then = now;

			this.#render();
		}
	}

	#render() {
		if (this.#settings.canvas.clear) this.clear();

		this.#functions.user.draw();

		//if (this.#settings.diagnostic.overlayData) this.#diagnostics();
	}
}
