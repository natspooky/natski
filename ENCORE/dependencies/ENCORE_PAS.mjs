/*!
 * ENCORE PORTABLE ALERT SYSTEM
 * Author: NATSKI
 * MIT License
 */

import * as ENCORE_SEC from 'https://natski.netlify.app/ENCORE/dependencies/ENCORE_SEC.mjs';

export class PAS {
	constructor() {
		this.alerts = [];
		this.timer = false;
	}

	add(data) {
		this.alerts.push(() =>
			new Promise((resolve) => {
				document.body.appendChild(resolve(this.generateAlert(data)));
			}).then((element) => {
				element.classList.add('open');
				if (!data.pmt) {
					this.createTimer(data.dur, element);
				}
			}),
		);
		this.loadAlert();
	}

	createTimer(duration, element) {
		this.timer = true;
		setTimeout(() => {
			element.classList.remove('open');
			setTimeout(() => {
				element.remove();
				this.timer = false;
				this.loadAlert();
			}, 501);
		}, duration);
	}

	loadAlert() {
		if (this.alerts.length > 0 && !this.timer) {
			this.alerts.shift()();
		}
	}

	generateAlert(data) {
		return ENCORE_SEC.jsonElementify({
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
									tag: data.pmt,
									events: {},
								},
								{
									tag: 'button',
									events: {
										click: {
											func: this.saveValue.bind(this),
											var: 'self',
										},
									},
								},
							],
					  }
					: null,
			],
		});
	}
}
