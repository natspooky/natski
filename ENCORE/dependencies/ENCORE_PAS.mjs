/*!
 * ENCORE PORTABLE ALERT SYSTEM
 * Author: NATSKI
 * MIT License
 */

import * as ENCORE_SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';

export class PAS {
	constructor() {
		this.alerts = [];
	}

	add(data) {
		this.alerts.push(() => {
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
		});
		if (this.alerts.length <= 1) {
			this.loadAlert();
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
						var: 'self',
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
							placeholder: prompt.placeholder
								? prompt.placeholder
								: 'enter text',
						},
						events: {
							keydown: {
								func: this.keyPress.bind(this),
								var: 'event',
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
							drop: { func: this.drop.bind(this), var: 'event' },
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
							accepts: prompt.accepts ? prompt.accepts : null,
							id: 'PASfile',
						},
					},
				].concat(button);
			case 'range':
				return [
					{
						tag: 'input',
						attributes: {
							type: prompt,
							min: 0,
							max: 100,
							step: 1,
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
