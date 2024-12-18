/*!
 * ENCORE PORTABLE ALERT SYSTEM
 * Author: NATSKI
 * MIT License
 */
/*
import * as ENCORE_SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';

//add cancel functionality
//add block add function
//add callback
export class PAS {
	constructor() {
		this.alerts = [];
	}

	add(data) {
		let key = this.generateKey(data);

		if (key !== this.alerts[[this.alerts.length - 1]][1]) {
			this.alerts.push(
				[
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
									data.duration ? data.duration : 2000,
									element,
								);
							}
						});
					},
				],
				key,
			);
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
			this.alerts[0]();
		}
	}

	getPrompt(prompt) {
		let button = [
			{
				tag: 'button',
				events: {
					click: {
						func: this.enter.bind(this),
						var: ENCORE_SEC.setFallback(
							prompt.callback ? ['self', prompt.callback] : false,
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
							placeholder: ENCORE_SEC.setFallback(
								prompt.placeholder,
								'enter text',
							),
							spellcheck: ENCORE_SEC.setFallback(
								prompt.spellcheck,
								false,
							),
						},
						events: {
							keydown: {
								func: this.keyPress.bind(this),
								var: ENCORE_SEC.setFallback(
									prompt.callback
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
								var: ENCORE_SEC.setFallback(
									prompt.callback
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
							accepts: ENCORE_SEC.setFallback(
								prompt.accepts,
								null,
							),
							multiple: ENCORE_SEC.setFallback(
								prompt.multiple,
								null,
							),
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
							min: ENCORE_SEC.setFallback(prompt.min, 0),
							max: ENCORE_SEC.setFallback(prompt.max, 100),
							value: ENCORE_SEC.setFallback(prompt.value, 50),
							step: ENCORE_SEC.setFallback(prompt.step, 1),
						},
					},
				].concat(button);
		}
	}

	generateKey() {
		return btoa();
	}

	createElements(data) {
		return ENCORE_SEC.jsonElementify({
			tag: 'div',
			classes: ['PAS-popup'],
			attributes: {
				style: data.color ? `background-color: ${data.color}` : null,
			},
			children: [
				{
					tag: 'div',
					children: [
						{
							tag: 'GIS',
							attributes: { name: data.icon },
						},
					].concat(
						data.message
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
				data.input
					? {
							tag: 'div',
							children: this.getPrompt(data.input),
					  }
					: {},
			],
		});
	}
}
*/

/*!
 * ENCORE PORTABLE ALERT SYSTEM
 * Author: NATSKI
 * MIT License
 */

import * as ENCORE_SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';

export class PAS {
	constructor() {
		this.alerts = [];
		this.element;
	}

	add(data) {
		this.alerts.push([
			() => {
				new Promise((resolve) => {
					let element = this.createElements(data);
					document.body.appendChild(element);
					setTimeout(() => {
						resolve(element);
					}, 10);
				}).then((element) => {
					this.element = element;
					this.element.classList.add('open');
					if (!data.input) {
						this.createTimer(data.duration ? data.duration : 1400);
					}
				});
			},
			data.cancellable ? data.cancellable : false,
		]);
		if (this.alerts.length <= 1) {
			this.loadAlert();
		} else {
			if (this.alerts[this.alerts.length - 2][1] === true) {
				this.cancelAlert();
			}
		}
	}

	cancelAlert() {
		Promise.resolve(clearTimeout(this.timer)).then(() => {
			this.closeAlert();
		});
	}

	enter(self) {
		this.closeAlert();
		console.log(self.parentNode.children[0].value);
	}

	closeAlert() {
		this.element.classList.remove('open');
		setTimeout(() => {
			this.element.remove();
			this.alerts.splice(0, 1);
			this.loadAlert();
		}, 501);
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

	createTimer(duration) {
		this.timer = setTimeout(() => {
			this.element.classList.remove('open');
			setTimeout(() => {
				this.element.remove();
				this.alerts.splice(0, 1);
				Promise.resolve(clearTimeout(this.timer)).then(() => {
					this.loadAlert();
				});
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
						var: ENCORE_SEC.setFallback(
							prompt.callback ? ['self', prompt.callback] : false,
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
							placeholder: ENCORE_SEC.setFallback(
								prompt.placeholder,
								'enter text',
							),
							spellcheck: ENCORE_SEC.setFallback(
								prompt.spellcheck,
								false,
							),
						},
						events: {
							keydown: {
								func: this.keyPress.bind(this),
								var: ENCORE_SEC.setFallback(
									prompt.callback
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
								var: ENCORE_SEC.setFallback(
									prompt.callback
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
							accepts: ENCORE_SEC.setFallback(
								prompt.accepts,
								null,
							),
							multiple: ENCORE_SEC.setFallback(
								prompt.multiple,
								null,
							),
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
							min: ENCORE_SEC.setFallback(prompt.min, 0),
							max: ENCORE_SEC.setFallback(prompt.max, 100),
							value: ENCORE_SEC.setFallback(prompt.value, 50),
							step: ENCORE_SEC.setFallback(prompt.step, 1),
						},
					},
				].concat(button);
		}
	}

	createElements(data) {
		return ENCORE_SEC.jsonElementify({
			tag: 'div',
			classes: ['PAS-popup'],
			attributes: {
				style: data.color ? `background-color: ${data.color}` : null,
			},
			children: [
				{
					tag: 'div',
					children: [
						{
							tag: 'GIS',
							attributes: { name: data.icon },
						},
					].concat(
						data.message
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
				data.input
					? {
							tag: 'div',
							children: this.getPrompt(data.input),
					  }
					: {},
			],
		});
	}
}
