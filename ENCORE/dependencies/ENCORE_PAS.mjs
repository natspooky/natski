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
		const alert = () => {
			new Promise((resolve) => {
				let y = this.createElements(data);
				document.body.appendChild(y);
				setTimeout(() => {
					resolve(y);
				}, 10);
			}).then((element) => {
				element.classList.add('open');
				if (!data.pmt) {
					this.createTimer(data.dur, element);
				}
			});
		};

		this.alerts.push(alert);
		if (this.alerts.length <= 1) {
			this.loadAlert();
		}
	}

	input(self) {
		this.alerts.splice(0, 1);
		this.loadAlert();
		console.log(self.parentNode.children[0].value);
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

	createElements(data) {
		let x = {
			tag: 'div',
			classes: ['PAS-popup'],
			attributes: {
				style: data.col ? `background-color: ${data.col}` : null,
			},
			children: [
				{
					tag: 'div',
					children: [
						{
							tag: 'GIS',
							attributes: { name: data.icn },
						},
						{
							tag: 'span',
						},
						{
							tag: 'p',
							innerHTML: data.txt,
						},
					],
				},
				data.pmt
					? {
							tag: 'div',
							children: [
								{
									tag: 'input',
									attributes: {
										type: data.pmt,
									},
								},
								{
									tag: 'button',
									events: {
										click: {
											func: this.input.bind(this),
											var: 'self',
										},
									},
								},
							],
					  }
					: {},
			],
		};
		console.log(x);
		return ENCORE_SEC.jsonElementify(x);
	}
}
