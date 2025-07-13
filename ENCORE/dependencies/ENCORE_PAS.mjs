/*!
 * ENCORE PORTABLE ALERT SYSTEM
 * Author: NATSKI
 * MIT License
 */

import * as SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';
import GIS from 'https://natski.netlify.app/ENCORE/ENCORE_GIS.js';

export default class PAS {
	constructor() {
		this.alerts = [];
		this.GIS = new GIS();
	}

	add(data) {
		let key = JSON.stringify(data);

		if (!(data.noRepeat && this.#checkKey(key))) {
			this.alerts.push([
				() => {
					new Promise((resolve) => {
						let element = this.#createElements(data);
						document.body.appendChild(element);
						this.GIS.applyMasks(
							element.getElementsByTagName('GIS'),
						);
						setTimeout(() => {
							resolve(element);
						}, 100);
					}).then((element) => {
						element.classList.add('open');
						if (!data.input) {
							this.#createTimer(
								data.duration ? data.duration : 2000,
								element,
							);
						}
					});
				},
				key,
			]);
			if (this.alerts.length <= 1) {
				this.#loadAlert();
			}
		}
	}

	#checkKey(key) {
		for (const value of this.alerts) {
			if (value[1] == key) return true;
		}
		return false;
	}

	#enter(ev, callback) {
		let element = ev.target.parentNode.parentNode,
			input = ev.target.parentNode.children[0];
		if (SEC.checkExists(callback)) {
			switch (input.type) {
				case 'file':
					callback.func(
						input.files,
						SEC.setFallback(callback.var, null),
					);
					break;
				case 'checkbox':
					callback.func(
						input.checked,
						SEC.setFallback(callback.var, null),
					);
					break;
				default:
					callback.func(
						input.value,
						SEC.setFallback(callback.var, null),
					);
					break;
			}
		}
		element.classList.remove('open');
		setTimeout(() => {
			element.remove();
			this.alerts.splice(0, 1);
			this.#loadAlert();
		}, 400);
	}

	#keyPress(ev, callback) {
		if (ev.key == 'Enter') {
			ev.preventDefault();
			this.#enter(ev, callback);
		}
	}

	#fileInput(event) {
		event.target.parentNode.children[1].innerHTML = 'Files Added';
	}

	#drop(event) {
		event.preventDefault();
		event.target.classList.remove('dropper');
		/*
		event.target.children[1].children[0].fileList = [
			...event.dataTransfer.files,
		];*/
		event.target.children[1].children[1].innerHTML = 'Files Added';
	}

	#dragOver(event) {
		event.preventDefault();
		event.target.classList.add('dropper');
	}
	#dragLeave(event) {
		event.preventDefault();
		event.target.classList.remove('dropper');
	}

	#createTimer(duration, element) {
		setTimeout(() => {
			element.classList.remove('open');
			setTimeout(() => {
				element.remove();
				this.alerts.splice(0, 1);
				this.#loadAlert();
			}, 301);
		}, duration);
	}

	#loadAlert() {
		if (this.alerts.length > 0) {
			this.alerts[0][0]();
		}
	}

	getPrompt(prompt) {
		let button = [
			{
				tag: 'button',
				events: {
					click: {
						callback: this.#enter.bind(this),
						param: SEC.setFallback(
							SEC.checkExists(prompt.callback)
								? ['event', prompt.callback]
								: null,
							'event',
						),
						options: {
							once: true,
							passive: true,
							capture: false,
						},
					},
				},
				children: [
					{
						tag: 'GIS',
						attributes: { name: 'input' },
					},
				],
			},
		];

		switch (prompt.type) {
			case 'text':
				return [
					{
						tag: 'input',
						attributes: {
							type: prompt.type,
							placeholder: SEC.setFallback(
								prompt.placeholder,
								'enter text',
							),
							spellcheck: SEC.setFallback(
								prompt.spellcheck,
								false,
							),
							autocomplete: SEC.setFallback(
								prompt.autocomplete,
								'off',
							),
						},
						events: {
							keydown: {
								callback: this.#keyPress.bind(this),
								param: SEC.setFallback(
									SEC.checkExists(prompt.callback)
										? ['event', prompt.callback]
										: null,
									'event',
								),
								options: {
									once: false,
									passive: false,
									capture: false,
								},
							},
						},
					},
				].concat(button);
			case 'file':
				return [
					{
						tag: 'input',
						events: {
							input: {
								callback: this.#fileInput.bind(this),
								param: 'event',
								options: {
									once: false,
									passive: true,
									capture: false,
								},
							},
						},
						attributes: {
							type: prompt.type,
							accepts: SEC.setFallback(prompt.accepts, null),
							multiple: SEC.setFallback(prompt.multiple, null),
							id: 'PASfile',
						},
					},
					{
						tag: 'label',
						attributes: {
							for: 'PASfile',
						},
						children: [
							{
								tag: 'p',
								innerHTML: 'Select File',
							},
						],
					},
				].concat(button);
			case 'range':
				return [
					{
						tag: 'input',
						attributes: {
							type: prompt.type,
							min: SEC.setFallback(prompt.min, 0),
							max: SEC.setFallback(prompt.max, 100),
							value: SEC.setFallback(prompt.value, 50),
							step: SEC.setFallback(prompt.step, 1),
						},
					},
				].concat(button);
			case 'checkbox':
				return [
					{
						tag: 'input',
						attributes: {
							type: prompt.type,
							checked: SEC.setFallback(prompt.checked, null),
						},
					},
				].concat(button);
		}
	}

	#createElements(data) {
		return SEC.jsonElementify({
			tag: 'div',
			classes: ['PAS-popup'],
			attributes: {
				style: SEC.checkExists(data.color)
					? `--themecol-PAS: ${data.color}`
					: null,
			},
			events:
				SEC.setFallback(
					SEC.checkExists(data.input) ? data.input.type : null,
					null,
				) === 'file'
					? {
							drop: {
								callback: this.#drop.bind(this),
								param: SEC.setFallback(
									SEC.checkExists(prompt.callback)
										? ['event', prompt.callback]
										: null,
									'event',
								),
								options: {
									once: false,
									passive: false,
									capture: false,
								},
							},
							dragover: {
								callback: this.#dragOver.bind(this),
								param: 'event',
								options: {
									once: false,
									passive: false,
									capture: false,
								},
							},
							dragleave: {
								callback: this.#dragLeave.bind(this),
								param: 'event',
								options: {
									once: false,
									passive: false,
									capture: false,
								},
							},
					  }
					: null,
			children: [
				{
					tag: 'div',
					children: [{}]
						.concat(
							SEC.checkExists(data.icon)
								? {
										tag: 'GIS',
										attributes: { name: data.icon },
								  }
								: {},
						)
						.concat(
							SEC.checkExists(data.message) &&
								SEC.checkExists(data.icon)
								? {
										tag: 'span',
								  }
								: {},
						)
						.concat(
							SEC.checkExists(data.message)
								? {
										tag: 'p',
										innerHTML: data.message,
								  }
								: {},
						),
				},
				SEC.checkExists(data.input)
					? {
							tag: 'div',
							children: this.getPrompt(data.input),
					  }
					: {},
			],
		});
	}
}
