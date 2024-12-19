/*!
 * ENCORE PORTABLE ALERT SYSTEM
 * Author: NATSKI
 * MIT License
 */

import * as SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';

export class PAS {
	constructor() {
		this.alerts = [];
	}

	add(data) {
		let key = this.generateKey(data);

		if (
			!(
				SEC.setFallback(data.noRepeat, false) &&
				key !==
					SEC.setFallback(
						SEC.checkExists(this.alerts[this.alerts.length - 1])
							? this.alerts[this.alerts.length - 1][1] // make this work for all of the alerts in array
							: false,
						null,
					)
			)
		) {
			this.alerts.push([
				() => {
					new Promise((resolve) => {
						let element = this.createElements(data);
						document.body.appendChild(element);
						setTimeout(() => {
							resolve(element);
						}, 10);
					}).then((element) => {
						element.classList.add('open');
						if (!data.input) {
							this.createTimer(
								SEC.checkExists(data.duration)
									? data.duration
									: 2000,
								element,
							);
						}
					});
				},
				key,
			]);
			if (this.alerts.length <= 1) {
				this.loadAlert();
			}
		}
	}

	enter(ev, callback) {
		let element = ev.target.parentNode.parentNode;
		if (SEC.checkExists(callback)) {
			callback(ev.target.parentNode.children[0].value);
		}
		element.classList.remove('open');
		setTimeout(() => {
			element.remove();
			this.alerts.splice(0, 1);
			this.loadAlert();
		}, 501);
	}

	keyPress(ev, callback) {
		if (ev.key == 'Enter') {
			ev.preventDefault();
			this.enter(ev, callback);
		}
	}

	drop(event) {
		event.preventDefault();
		event.target.classList.remove('dropper');
		event.target.parentNode.children[1].files = [
			...event.dataTransfer.files,
		];
		event.target.parentNode.children[1].value = [
			...event.dataTransfer.files,
		];
		event.target.children[0].innerHTML = [...event.dataTransfer.files];
	}

	dragOver(event) {
		event.preventDefault();
		event.target.classList.add('dropper');
	}
	dragLeave(event) {
		event.preventDefault();
		event.target.classList.remove('dropper');
	}

	createTimer(duration, element) {
		setTimeout(() => {
			element.classList.remove('open');
			setTimeout(() => {
				element.remove();
				this.alerts.splice(0, 1);
				this.loadAlert();
			}, 501);
		}, duration);
	}

	loadAlert() {
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
						func: this.enter.bind(this),
						var: SEC.setFallback(
							SEC.checkExists(prompt.callback)
								? ['event', prompt.callback]
								: null,
							'event',
						),
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
								func: this.keyPress.bind(this),
								var: SEC.setFallback(
									SEC.checkExists(prompt.callback)
										? ['event', prompt.callback]
										: null,
									'event',
								),
							},
						},
					},
				].concat(button);
			case 'file':
				return [
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
					{
						tag: 'input',
						attributes: {
							type: prompt.type,
							accepts: SEC.setFallback(prompt.accepts, null),
							multiple: SEC.setFallback(prompt.multiple, null),
							id: 'PASfile',
						},
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
		}
	}

	generateKey(data) {
		return JSON.stringify(data);
	}

	createElements(data) {
		return SEC.jsonElementify({
			tag: 'div',
			classes: ['PAS-popup'],
			attributes: {
				style: SEC.checkExists(data.color)
					? `background-color: ${data.color}`
					: null,
			},
			events:
				data.prompt === 'file'
					? {
							drop: {
								func: this.drop.bind(this),
								var: SEC.setFallback(
									SEC.checkExists(prompt.callback)
										? ['event', prompt.callback]
										: null,
									'event',
								),
							},
							dragover: {
								func: this.dragOver.bind(this),
								var: 'event',
							},
							dragleave: {
								func: this.dragLeave.bind(this),
								var: 'event',
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
							SEC.checkExists(data.message)
								? [
										{
											tag: 'span',
										},
										{
											tag: 'p',
											innerHTML: data.message,
										},
								  ]
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
