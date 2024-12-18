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
			SEC.setFallback(data.noRepeat, false) &&
			key !== this.alerts[this.alerts.length - 1][1]
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

	enter(self) {
		let element = self.parentNode.parentNode;
		element.classList.remove('open');
		setTimeout(() => {
			element.remove();
			this.alerts.splice(0, 1);
			this.loadAlert();
		}, 501);
		console.log(self.parentNode.children[0].value);
	}

	keyPress(event) {
		if (event.key == 'Enter') {
			event.preventDefault();
			this.enter(event.target);
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
								? ['self', prompt.callback]
								: false,
							'self',
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
						},
						events: {
							keydown: {
								func: this.keyPress.bind(this),
								var: SEC.setFallback(
									SEC.checkExists(prompt.callback)
										? ['event', prompt.callback]
										: false,
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

						events: {
							drop: {
								func: this.drop.bind(this),
								var: SEC.setFallback(
									SEC.checkExists(prompt.callback)
										? ['event', prompt.callback]
										: false,
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
						},
						children: [
							{
								tag: 'p',
								innerHTML: 'Select File',
							},
							{
								tag: 'GIS',
								attributes: { name: 'upload' },
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
		return (
			SEC.setFallback(data.message, 'blank') +
			SEC.setFallback(data.icon, 'blank') +
			SEC.setFallback(data.input, 'blank')
		);
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
